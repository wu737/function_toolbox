"ui";
ui.layout(
    <frame background="#515155">
        <vertical align="top" margin="30">
            <text textSize="26sp" textStyle="bold">在下面输入网址：</text>
            <linear>
                <input id="num" layout_weight="1" bg="#ffffff" h="45" paddingLeft="10sp" maxLines="1" hint="输入网址" alpha="0.5" />
                <button h="55" w="70" id="ok" text="生成" />
            </linear>
            <linear>
                <text id="xkh" h="30" w="auto" textSize="18sp" />
            </linear>
            <linear>
                <horizontal>
                    <text id="xb" h="30" w="auto" textSize="18sp" />
                </horizontal>
            </linear>
        </vertical>
    </frame>
);
ui.ok.click(function () {
    threads.start(function () {
        let sd = ui.num.text();
        if (sd) {
            var sum = dwz(sd);
            if (sum) {
                ui.run(() => {
                    ui.xb.setText(sum);
                });
            }
        }
    });
});
ui.ok.on("long_click", () => {
    ui.num.setText("");
});

ui.xb.click(function () {
    let xbj = ui.xb.text();
    if (xbj) {
        setClip(xbj);
        toast("复制成功");
    }
});
function dwz(url) {
    ui.run(() => {
        ui.xb.setText("");
    });
    let html = http.get("http://api.c7.gg/api.php?url=" + url + "&apikey=F19REDUlfJrNUbiS1g@ddd").body.string();
    return html;
}