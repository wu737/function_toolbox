"ui";
ui.layout(
    <ScrollView>
        <vertical>
            <button id="open" text="到浏览器打开" />
            <webview id="web" margin="10 10 10 10" />
        </vertical>
    </ScrollView>
);
var url = "http://kuaishou.iiilab.com/";
ui.web.loadUrl(url);
ui.open.click(() => {
    threads.start(function () {
        app.openUrl(url);
    });
});