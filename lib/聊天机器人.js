"ui";
var 对话 = [{ 左宽: "0dp", 右宽: "16dp", 对齐: "left", 头像: "http://cdn.duitang.com/uploads/item/201504/03/20150403H3451_hmCvr.thumb.700_0.jpeg", 信息: "嗨，你好呀", 图1: "50dp", 图2: "0dp" }];

ui.layout(
    <linear orientation="vertical" gravity="top|center">
        <linear orientation="horizontal" w="*" bg="#a3a1a1" gravity="center">
        </linear>
        <linear layout_weight="1" w="*">
            <list id="List" orientation="vertical" w="*" h="*" bg="#eeeeee" padding="5">
                <linear orientation="horizontal" h="auto" w="*" gravity="top|center" margin="0 5 22 5" padding="5">
                    <linear w="50" h="50">
                        <img w="{{this.图1}}" h="{{this.图1}}" scaleType="fitXY" circle="true" src="{{this.头像}}" />
                    </linear>
                    <linear layout_weight="1" gravity="{{this.对齐}}" margin="10" paddingLeft="{{this.左宽}}" paddingRight="{{this.右宽}}">
                        <text text="{{this.信息}}" textSize="19sp" w="auto" textColor="#555555" padding="5" bg="#dbcbb8" />
                    </linear>
                    <linear w="50" h="50">
                        <img w="{{this.图2}}" h="{{this.图2}}" scaleType="fitXY" circle="true" src="{{this.头像}}" />
                    </linear>
                </linear>
            </list>
        </linear>
        <linear orientation="horizontal" h="auto" w="*">
            <input id="内容" h="auto" layout_weight="20" />
            <button id="发送" text="发送" h="50" layout_weight="1" gravity="center" style="Widget.AppCompat.Button.Colored" />
        </linear>
    </linear>
);
ui.List.setDataSource(对话);
ui.发送.on("click", () => {
    var str = ui.内容.text();
    if (str.length > 0) {
        我(str);
        机器人(str);
        ui.内容.setText("");
        ui.List.setDataSource(对话);
    } else { toast("你还没有输入内容呢"); }
});

ui.List.on("item_click", function (item, pos) {
    let a = ["复制", "取消"];
    dialogs.select(null, a, function (i) {
        switch (i) {
            case 0:
                toast("已复制到剪贴板"); setClip(item.信息); break;
        }
    });
});

function 机器(说) {
    对话.push({
        左宽: "0dp",
        右宽: "16dp",
        对齐: "left",
        头像: "http://cdn.duitang.com/uploads/item/201504/03/20150403H3451_hmCvr.thumb.700_0.jpeg",
        信息: 说,
        图1: "50dp",
        图2: "0dp"
    });
}

function 我(说) {
    对话.push({
        左宽: "16dp",
        右宽: "0dp",
        对齐: "right",
        头像: "http://q4.qlogo.cn/g?b=qq&nk=1641763174&s=140",
        信息: 说,
        图1: "0dp",
        图2: "50dp"
    });
}

function 机器人(输入) {
    threads.start(function () {
        var 链接 = "http://www.tuling123.com/openapi/api";
        var 获取 = http.post(链接, {
            "key": "f48dd9f7a5284994bddcc546ae66cbd4",
            "info": 输入,
            "userid": device.getIMEI()
        });
        var 源码 = 获取.body.string();
        eval("b=" + 源码);
        机器(b.text);
        ui.run(() => {
            ui.List.scrollToPosition(ui.List.adapter.itemCount - 1);
        });
    });
}