"ui";
ui.layout(
    <frame>
        <vertical>
            <horizontal h="45">
                <input id="input" hint="搜索图片" layout_weight="1" textSize="16sp" marginLeft="16" singleLine="true" />
                <button id="search" text="搜索" w="70" h="48" margin="0 0 10 5" />
            </horizontal>
            <list id="list" layout_weight="1" background="#ff555555">
                <img id="image" src="{{this}}" w="*" h="*" margin="5 5 5 5" tint="#00ffffff" />
            </list>
            <horizontal h="40" gravity="center" bg="#ffffff">
                <button id="last" text="上一页" textSize="18sp" layout_weight="1" style="Widget.AppCompat.Button.Borderless.Colored" />
                <button id="rand" text="随机" layout_weight="1" textSize="18sp" style="Widget.AppCompat.Button.Borderless.Colored" />
                <button id="next" text="下一页" layout_weight="1" textSize="18sp" style="Widget.AppCompat.Button.Borderless.Colored" />
            </horizontal>
        </vertical>
    </frame>
);
let word = "汽车";
var top = 0;
loadimg(word, top++);
ui.next.click(() => {
    loadimg(word, top++);
});

ui.rand.on("click", function () {
    top = random(0, parseInt(listNum / 30));
    loadimg(word, top++);
});
ui.last.click(() => {
    if (top < 2) {
        return;
    }
    top--;
    loadimg(word, top - 1);
});
ui.search.on("click", function () {
    var text = ui.input.text();
    if (text.length == 0) {
        return;
    }
    word = text;
    top = 0;
    loadimg(word, top++);
});

ui.list.on("item_click", function (img3) {
    menu(img3);
});


function loadimg(word, num) {
    newimgs = []
    threads.start(function () {
        newimgs1 = getimages(word, num++);
        for (i in newimgs1) {
            newimgs.push(newimgs1[i]);
        }
    });
    ui.list.setDataSource(newimgs);
}

function getimages(word, num) {
    pn = num * 30;
    url = "https://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fr=&sf=1&fmq=1526269427171_R&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=" + word + "&pn=" + pn;
    htmltext = http.get(url).body.string();
    thumbzhz = /app.setData\('imgData',.+}/g;
    htmltext = htmltext.match(thumbzhz);
    if (htmltext == null) {
        toast("没有图了");
        top--;
        return null;
    }
    imgstr = htmltext[0].substr("app.setData('imgData',".length, htmltext[0].length);
    eval(" var imgjson = [" + imgstr + '][0];');
    len = imgjson.data.length;
    listNum = imgjson.listNum;
    images = [];
    for (i = 0; i < len - 1; i++) {
        images[i] = imgjson.data[i].objURL;
    }
    return images;
}

function menu(url1) {
    let a = ["下载", "取消"];
    let img_path = "/sdcard/Download/";
    dialogs.select(null, a, function (i) {
        switch (i) {
            case 0:
                name = url1.replace(/\//g, "_");
                dirlist = files.listDir(img_path);
                let j;
                for (j = 0; j < dirlist.length; j++) {
                    if (dirlist[j] == name) {
                        break;
                    }
                }
                if (j == dirlist.length) {
                    threads.start(function () {
                        files.writeBytes(img_path + name, http.get(url1).body.bytes());
                        toast("已下载到" + img_path);
                    });
                } else {
                    toast("图片已存在")
                }
                break;
        }
    });
}