"ui";
ui.layout(
    <vertical>
        <frame>
            <vertical bg="#009688">
                <horizontal h="45">
                    <input id="search_input" layout_weight="1" hint="搜索视频" textSize="16sp" marginLeft="16" />
                    <button id="search_button" text="搜索" textSize="20sp" w="100" h="50" margin="-5 0 0 -80" style="Widget.AppCompat.Button.Borderless.Colored" />
                </horizontal>
                <frame>
                    <list id="list">
                        <horizontal>
                            <linear bg="?selectableItemBackground" w="1000">
                                <img src="{{icon}}" h="50" w="50" tint="#000000" />
                                <text text="{{name}}" textSize="15sp" h="40" w="*" textColor="#000000" margin="10 10" />
                            </linear>
                        </horizontal>
                    </list>
                </frame>
            </vertical>
        </frame>
    </vertical>
);
var search_list = [];
ui.list.on("item_click", function (athis) {
    if (athis.url == null && athis.name == "返回") {
        ui.list.setDataSource(search_list);
        return;
    }
    if (athis.url.indexOf("http://www.okzy.me/") == -1) {
        app.openUrl(athis.url);
        return;
    }
    let video_list = [{
        icon: "@drawable/ic_keyboard_backspace_black_48dp",
        name: "返回",
        url: null
    }];
    threads.start(function () {
        let temp_arr = videoDetails(athis.url);
        for (i in temp_arr) {
            video_list.push({
                icon: "@drawable/ic_send_black_48dp",
                name: temp_arr[i].name,
                url: temp_arr[i].url
            });
        }
    }).join();
    ui.list.setDataSource(video_list);
});

ui.search_button.on("click", function () {
    search(ui.search_input.text());
})

function videoDetails(url) {
    html = http.get(url).body.string();
    while (html.length < 2000) {
        sleep(1000);
        html = http.get(url).body.string();
    }
    zhez1 = /checked=\"\" \/>[^$]*.http[^<]*/g //链接和名称
    html = html.match(zhez1);
    result = [];
    for (i in html) {
        temp_arr = html[i].split('$');
        result.push({
            name: temp_arr[0].substr("/checked=\"\" \/>".length - 1),
            url: temp_arr[1]
        });
    }
    return result;
}

function searchVideo(word) {
    url = "http://www.okzy.me/index.php?m=vod-search&wd=" + word;
    html = http.get(url).body.string();
    while (html.length < 3000) {
        sleep(200);
        html = http.get(url).body.string();
    }
    zhez1 = /class=\"xing_vb4\"><a href=[^<]*<\/a><\/span>/g //链接和名称
    html = html.match(zhez1);
    zhez2 = /[^"]*(?=.html)/g //链接
    zhez3 = /[^>]*(?=<\/a>)/g //名称
    result = [];

    for (i in html)
        result.push({
            name: html[i].match(zhez3)[0],
            url: "http://www.okzy.me/" + html[i].match(zhez2)[0] + ".html"
        });
    return result;
}
function search(word) {
    threads.start(function() {
        let temp_arr = searchVideo(word);
        len = search_list.length;
        for (i = 0; i < len; i++) {
            search_list.pop();
        }
        if (temp_arr.length == 0) {
            toast("未找到该视频");
        }
        for (i in temp_arr) {
            search_list.push({
                icon: "@drawable/ic_play_circle_filled_white_black_48dp",
                name: temp_arr[i].name,
                url: temp_arr[i].url
            });
        }
    });
    ui.list.setDataSource(search_list);

}