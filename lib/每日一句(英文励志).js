"ui";
ui.layout(
    <frame>
        <vertical padding="16" bg="#aa280800">
            <text id="te" textSize="18sp" h="200" bg="#FFD2D9FF" />
            <horizontal gravity="center">
                <button id="copy" text="复制" w="auto" />
            </horizontal>
        </vertical>
    </frame>
);
var array = [];

一句();
ui.copy.on("click", () => {
    let tex = ui.te.text();
    if (tex) {
        toast("已经复制!!!");
        setClip(tex);
    }
});
function 一句() {
    threads.start(function () {
        array = [];
        let res = http.get("http://open.iciba.com/dsapi/");
        let html = res.body.json();

        log(html)
        array.push(html.content + "\n" + html.note + "\n");
        ui.post(function () {
            ui.te.setText(array.toString());
        });
    });
}