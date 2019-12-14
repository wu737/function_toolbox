"ui";
ui.layout(
    <vertical>
        <horizontal>
            <input id="music_search_input" hint="搜索音乐" layout_weight="1" textSize="16sp" marginLeft="16" />
            <button id="music_search_button" text="搜索" textSize="20sp" w="100" h="50" margin="-5 0 0 -80" style="Widget.AppCompat.Button.Borderless.Colored" />
            <spinner id="music_sp1" textSize="20sp" h="50" entries="QQ|网易|酷狗|百度|虾米" />
        </horizontal>
        <frame>
            <list id="music_list">
                <horizontal>
                    <linear bg="?selectableItemBackground" w="1000">
                        <img src="{{pic}}" h="50" w="50" />
                        <vertical h="50">
                            <text text="{{name}}" textSize="15sp" textColor="#000000" h="20" w="*" margin="10 0 5 10" />
                            <text text="{{artist}}" textSize="10sp" h="20" w="*" margin="0 0 0 10" />
                        </vertical>
                    </linear>
                </horizontal>
            </list>
        </frame>
    </vertical>
);
const music_source = ["tencent","netease","kugou","baidu","xiami"];
var music_list = [];

threads.start(function () {
    netease_hot();
});

ui.music_list.setDataSource(music_list);

ui.music_search_button.on("click", function () {
    music_flag1 = false;
    music_page = 1;
    threads.start(function () {
        var len = music_list.length;
        for (let i = 0; i < len; i++) {
            music_list.pop();
        }
        var i = ui.music_sp1.getSelectedItemPosition();
        // toast(music_source[i]);
        getMusic(ui.music_search_input.text(), music_source[i], music_page, 20);
    });
});

ui.music_list.on("item_click", function (m) {
    if (m.id == 0) {
        threads.start(function () {
            getMusic(ui.music_search_input.text(), m.source, ++music_page, 10);
        });
    } else {
        threads.start(function () {
            let music_d;
            if (music_flag1) {
                music_d = download_music(m.id, "netease");
            } else {
                music_d = download_music(m.id, m.source);
            }
            download(m.name + " - " + m.artist, music_d.url)
        });
    }
});

function netease_hot() {
    url = "https://y.xuelg.com/api.php?callback=jQuery111305475340320325446_1529241763034&types=playlist&id=3778678";
    hot = http.get(url).body.string();
    hot = hot.match(/"tracks":.*/g)[0];
    eval("hot = " + hot.substr(9).replace(/,"trackIds".*/g, ""));
    for (i in hot) {
        music_list.push({
            id: hot[i].id,
            name: hot[i].name,
            artist: hot[i].ar[0].name,
            pic: hot[i].al.picUrl
        });

    }
    return hot;
}

function getMusic(word, source, page, num) {
    if (!word) {
        return;
    }
    url = "https://y.xuelg.com/api.php?callback=jQuery111305475340320325446_1529241763041&types=search&count=" + num + "&source=" + source + "&pages=" + page + "&name=" + word;
    let m = http.get(url).body.string();
    eval("m = " + m.substr(m.indexOf('(')));
    music_list.pop();
    if (m.length == 0) {
        toast("没有更多了");
    }
    for (i in m) {
        url = "https://y.xuelg.com/api.php?callback=jQuery111306503234710876828_1529243003818&types=" + "pic" + "&id=" + m[i].pic_id + "&source=" + m[i].source;
        mstr = http.get(url).body.string();
        eval(mstr = mstr.substr(mstr.indexOf('(')));
        mstr = mstr.replace(/\\/g, "");
        m[i]["pic"] = mstr.match(/http[^"]*/g)[0];
        music_list.push(m[i]);
    }
    music_list.push({
        name: "                              加载更多",
        pic: "#ffffff",
        artist: "",
        id: "0"
    });
    return m;
}
function download_music(id, source) {
    url = "https://y.xuelg.com/api.php?callback=jQuery111306503234710876828_1529243003818&types=" + "url" + "&id=" + id + "&source=" + source;
    mstr = http.get(url).body.string();
    eval(mstr = mstr.substr(mstr.indexOf('(')));
    mstr = mstr.replace(/\\/g, "");
    m = [];
    try {
        m["url"] = mstr.match(/url\":\"[^"]*/g)[0].match(/http.*/g)[0];
        m["size"] = mstr.match(/size\":[^,]*/g)[0].match(/\d.*/g)[0];
        m["br"] = mstr.match(/br\":[^}]*/g)[0].match(/\d.*/g)[0];
    } catch (e) {
        log(e)
    }
    return m;
}
