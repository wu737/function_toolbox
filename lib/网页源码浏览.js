"ui";
ui.layout(
    <vertical align="top" margin="0" bg="#ff555555">
        <linear>
            <input id="awz" w="302" bg="#ffffff" h="45" hint="输入网址。">http://www.autojs.org</input>
            <button h="55" w="60" id="aok" text="浏览" />
        </linear>
        <input id="text" gravity="left" size="10" bg="#ffffff" w="358" h="566" margin="0 1" hint="网页代码区" />
    </vertical>
);
atext0 = 0;
ui.aok.click(() => {
    if (atext0 != 2) {
        atext0 = 2;
        url = ui.awz.text();
        awy(url);
        downloadId = setInterval(() => {
            if (atext0 == 1) {
                atext0 = 0;
                ui.text.text(atext);
                clearInterval(downloadId);
                return;
            }
        }, 10);
    } else {
        ui.text.text("上次获取还没结束，要等待");
    }
});

function awy(url) {
    threads.start(function () {
        try {
            var res = http.get(url);
            if (res.statusCode == 200) {
                atext = (res.body.string());
            } else {
                atext = ("请求失败:" + res.statusMessage);
            }
        } catch (e) {
            log(e)
            atext = "请求不到";
        }
        atext0 = 1;
    });
}