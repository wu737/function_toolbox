"ui";
ui.layout(
    <frame background="#ff555555">
        <ScrollView>
            <vertical align="top" margin="1">
                <webview w="359" h="260" size="6" id="webview" margin="0 0 1 0" />
                <input id="text" w="359" h="0" size="10" bg="#ffffff" margin="0 1 1 0" hint="网页代码区" />
                <linear>
                    <input id="awz" w="242" h="55" size='8' hint="vip视频网址。" bg="#ffcccccc" />
                    <button h="55" w="60" id="azt" text="粘贴" />
                    <button h="55" w="60" id="aok" text="解析" />
                </linear>
                <linear>
                    <button h="55" w="140" id="adk" text="浏览器打开" />
                    <button h="55" w="120" id="afz" text="复制网址" />
                </linear>
                <text text="一个接口不行,就试试其他的接口" />
                <grid id="xz" spanCount="4" h="*">
                    <text text="{{name}}" bg="#ffcccccc" margin="1 1" />
                </grid>
                <text id="url" />
                <text text="1.由于解析的网站有广告，会严重影响观看体验，所以建议用via，米虾等带有视频嗅探的浏览器，这样还可以用下载工具把视频下载下来。" textSize="17sp" margin="10 1 1 10" />
                <text text="2.无广告接口，可以直接解析出视频播放地址（M3U8文件），在本软件体验效果极差，请用浏览器打开，然后观看或者下载" textSize="17sp" margin="10 1 1 10" />
                <text text="本脚本由  。0  提供" margin="10 0 0 10" />
            </vertical>
        </ScrollView>
    </frame>
);
const apis = [{ name: "金桥解析", url: "http://jqaaa.com/jx.php?url=" }, { name: "思古解析", url: "http://api.bbbbbb.me/jx/v.php?url=" }, { name: "思古解霸", url: "http://api.bbbbbb.me/jx/?url=" }, { name: "百域解析", url: "http://app.baiyug.cn:2019/vip/?url=" }, { name: "猫云(xxx)", url: "https://jx.maoyun.tv/index.php?id=" }, { name: "搜你妹", url: "http://www.sonimei.cn/?url=" }, { name: "噗噗电影", url: "http://pupudy.com/play?make=url&id=" }, { name: "酷绘", url: "http://appapi.svipv.kuuhui.com/svipjx/liulanqichajian/browserplugin/qhjx/qhjx.php?id=" }, { name: "旋风解析", url: "http://api.xfsub.com/index.php?url=" }, { name: "石头解析", url: "https://jiexi.071811.cc/jx.php?url=" }, { name: "VIP看看", url: "http://q.z.vip.totv.72du.com/?url=" }, { name: "ODFLV", url: "http://aikan-tv.com/?url=" }, { name: "163人", url: "http://jx.api.163ren.com/vod.php?url=" }, { name: "CKFLV", url: "http://www.0335haibo.com/tong.php?url=" }, { name: "无名小站2", url: "http://www.wmxz.wang/video.php?url=" }, { name: "眼睛会下雨", url: "http://www.vipjiexi.com/yun.php?url=" }, { name: "1008影视", url: "http://api.1008net.com/v.php?url=" }, { name: "人人发布", url: "http://v.renrenfabu.com/jiexi.php?url=" }, { name: "无广告接口1", url: "http://59uv.com/?url=" }, { name: "无广告接口2", url: "http://69p.top/?url=" }, { name: "无广告接口3", url: "http://74t.top/?url=" }, { name: "无广告接口4", url: "http://mimijiexi.top/?url=" }, { name: "无广告接口5", url: "http://55jx.top/?url=" }, { name: "无广告接口6", url: "http://playx.top/?url=" }, { name: "无广告接口7", url: "http://nitian9.com/?url=" }, { name: "无广告接口8", url: "http://19g.top/?url=" }, { name: "无广告接口9", url: "http://607p.com/?url=" }, { name: "无广告接口10", url: "http://52088.online/?url=" }, { name: "无广告接口11", url: "http://bofang.online/?url=" }, { name: "无广告接口12", url: "http://play1.online/?url=" }, { name: "无广告接口13", url: "http://ckplay.online/?url=" }, { name: "无广告接口14", url: "http://api.baiyug.vip/?url=" }, { name: "无广告接口15", url: "http://880kan.com/?url=" }, { name: "无广告接口16", url: "https://www.kkflv.com/?url=" }];
var apis2 = [];

ui.awz.text("http://m.iqiyi.com/v_19rr8u75c0.html");
let jx = "http://q.z.vip.totv.72du.com/?url=";
ui.aok.click(() => {
    threads.start(function () {
        let str = ui.awz.text();
        if (str) {
            ui.run(function () {
                ui.webview.loadUrl(jx + ui.awz.text());
            });
            str = http.get(jx + ui.awz.text()).body.string();
            ui.run(function () {
                ui.text.text(str);
            });
        }
    });
});

ui.afz.click(() => {
    threads.start(function () {
        setClip(jx + ui.awz.text());
    });
});

ui.azt.click(() => {
    ui.awz.text(getClip());
});
ui.adk.click(() => {
    threads.start(function () {
        app.openUrl(jx + ui.awz.text());
    });
});

ui.xz.on("item_click", function (j, item, itemView, listView) {
    for (i = 0; i < apis.length; i++) {
        if (i == item) {
            apis2[i].name = "●" + apis[i].name;
        } else {
            apis2[i].name = "○" + apis[i].name;
        }
    }
    ui.xz.setDataSource(apis2);

    jx = j.url;
    ui.url.text(jx);
});

for (i = 0; i < apis.length; i++) {
    apis2[i] = {
        name: apis[i].name,
        url: apis[i].url
    };
    apis2[i].name = "○" + apis[i].name;
}
ui.xz.setDataSource(apis2);