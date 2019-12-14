"ui";
ui.layout(
    <frame background="#515155">
        <vertical align="top" margin="30">
            <vertical>
                <text text="二维码生成" textSize="30sp" textColor="#000000" marginTop="10" gravity="center" />
                <horizontal gravity="center">
                    <text text="文字内容:" textSize="20sp" textColor="#000000" marginTop="20" h="40dp" />
                    <input id="textContent" textSize="20sp" hint="想要输入的文本内容" marginTop="10" w="200dp" />
                </horizontal>
                <horizontal gravity="center">
                    <text text="背景颜色:" textSize="20sp" textColor="#000000" marginTop="20" h="40dp" />
                    <input id="backgroundColor" textSize="20sp" hint="默认白色(十六进制)" marginTop="10" w="200dp" text="000000" />
                </horizontal>
                <horizontal gravity="center">
                    <text text="尺寸大小:" textSize="20sp" textColor="#000000" marginTop="20" h="40dp" />
                    <input id="size" textSize="20sp" hint="尺寸大小（像素）" marginTop="10" w="200dp" text="400" />
                </horizontal>
                <horizontal gravity="center">
                    <text text="边距大小:" textSize="20sp" textColor="#000000" marginTop="20" h="40dp" />
                    <input id="marginSize" textSize="20sp" hint="边距大小（像素）" marginTop="10" w="200dp" text="50" />
                </horizontal>
                <button id="ok" text="确认" w="160dp" h="auto" style="Widget.AppCompat.Button.Colored" layout_gravity="center" marginTop="20dp" />
            </vertical>
            <img id="rounded_img" gravity="center" padding="10" src="http://www.autojs.org/assets/uploads/profile/1-profileavatar.jpeg" w="200" h="200" radius="20dp" scaleType="fitXY" />
        </vertical>
    </frame>
);
var aad;
ui.ok.click(function () {
    threads.start(function () {
        if (ui.textContent.text().length == 0 || ui.backgroundColor.text().length == 0 || ui.size.text().length == 0 || ui.marginSize.text().length == 0) {
            //只要有一个填的空是空的话
            toast("生成失败，请填写所有需要填写的信息。");
        } else {
            ui.run(() => {
                aad = "http://apis.juhe.cn/qrcode/api?key=684e3d257f6034ebdfd80a2bbeddeb18&type=2&fgcolor=" + ui.backgroundColor.text() + "&w=" + ui.size.text() + "&m=" + ui.marginSize.text() + "&text=" + ui.textContent.text();
                ui.rounded_img.setSource(aad);
            });
        }
    });
});
ui.ok.on("long_click", () => {
    ui.num.setText("");
});
ui.rounded_img.on("click", () => {
    threads.start(function () {
        let name = (new Date).getTime();
        if (aad) {
            files.writeBytes("/sdcard/" + name + ".jpg", http.get(aad).body.bytes());
            media.scanFile("/sdcard/" + name + ".jpg");
            toast("保存成功!\n/sdcard/" + name + ".jpg");
        }
    });
}); 