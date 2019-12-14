"ui";
var 背景颜色 = "#ffffff"
var 字号 = "16"
ui.layout(
    <frame id="bg" bg="#ffffff">
        <vertical padding="7" bg="#708090" layout_weight="1">
            <horizontal>
                <img id="exit" src="file://./res/ic_keyboard_backspace_black_48dp.png" w="40" h="40" gravity="center" />
                <text text="功能建议 OR 问题反馈" textColor="#333333" textSize="25sp" typeface="serif" gravity="top|center" w="*" textStyle="bold" />
            </horizontal>
            <card w="*" marginTop="20" h="auto" cardCornerRadius="5dp" cardBackgroundColor="#b0c4de"
                cardElevation="15dp" gravity="bottom" foreground="?selectableItemBackground">
                <vertical>
                    <text textSize="20sp" textStyle="bold" gravity="left">问题</text>
                    <vertical>
                        <text id="t1" size="{{字号}}sp" color="#007fff" marginTop="5" paddingLeft="10" />
                        <input id="ID" w="*" marginLeft="10" marginRight="10" singleLine="true" hint="标题" textSize="{{字号*1.5}}sp" />
                    </vertical>
                    <vertical>
                        <text id="t2" size="{{字号}}sp" color="#007fff" paddingLeft="10" />
                        <input id="Password" w="*" maxLines="5" marginLeft="10" marginRight="10" hint="内容" textSize="{{字号*1.5}}sp" />
                    </vertical>
                </vertical>
            </card>
            <button id="Login" style="Widget.AppCompat.Button.Colored" h="180px" size="{{字号*2}}sp" marginTop="10" marginRight="30" marginLeft="30">发送</button>
        </vertical>
    </frame>
);
ui.ID.on("touch", () => {
    ui.t1.setText("标题")
    ui.ID.setHint("")
    if (ui.Password.getText() == "") {
        ui.t2.setText("")
        ui.Password.setHint("内容")
    }
});

ui.Password.on("touch", () => {
    ui.t2.setText("内容")
    ui.Password.setHint("")
    if (ui.ID.getText() == "") {
        ui.t1.setText("")
        ui.ID.setHint("标题")
    }
});
ui.Login.on("click", () => {
    if (ui.ID.getText() != "") {
        if (ui.Password.getText() != "") {
            sc_send(ui.ID.text(), ui.Password.text())
        } else {
            ui.Password.setError("请输入详细内容描述")
        }
    } else {
        ui.ID.setError("请输入标题")
    }
});
ui.bg.on("touch", () => {
    if (ui.Password.getText() == "") {
        ui.t2.setText("")
        ui.Password.setHint("内容")
    }
    if (ui.ID.getText() == "") {
        ui.t1.setText("")
        ui.ID.setHint("标题")
    }
});
ui.exit.on("click", () => {
    ui.finish();
});
function sc_send(text, desp) {
    let key = "SCU47059T2b9500c63e4d90d57c008cedbc46d12f5c9759c03578e";
    http.post("https://sc.ftqq.com/" + key + ".send", {
        'text': "多功能工具箱：" + text,
        'desp': desp
    }, {
        headers: {
            'header': 'Content-type: application/x-www-form-urlencoded',
        }
    }, function (res) {
        if (res.body.json().errmsg == "success") {
            dialogs.alert("提示", "开发者已经收到，在这里感谢您的反馈，因为有您，我们会越来越好。\n\n祝您生活愉快🌹🌹");
        }
    });
}
