/*
 * @Author: 白酒煮饭 
 * @Date: 2018-11-15 22:56:19 
 * @Last Modified by: QQ:  1641763174
 * @Last Modified time: 2019-12-14 14:46:19
 */
"ui";

const versionCode = 1;
const Spiccode = "v0.29.3";

const share = "多功能工具箱:\n" +
    "一款方便快捷的轻应用APP，内有多种小功能，欢迎下载使用!\n" +
    "欢迎加入多功能工具箱官方群，群号码：984523553。";
const QAQ = "1.这个软件支持哪些手机？\n答：一般安卓系统7.0以上的都支持，但也有可能存在个别手机的兼容问题，如在使用过程中发现有问题，请及时反馈。\n2.苹果手机可以用吗？\n答：不可以。\n";
const INFO = "本软件是一款免费开源的的项目！\n如果你从任何地方购买的，那么您很可能上当了。\n此软件中使用到的某些功能模块，是在Auto.js群中收集的，由本人稍加修改适配。";
const releaseNotes = "多功能工具箱，是一款免费开源的的项目，您的捐赠将促进软件持续更新，金额不限，您的支持对独立软件开发者很重要，请帮忙多多宣传。";
const F_List = [{
    id: "文字翻译",
    text: "",
    code: "文字翻译",
    bg: "#808080"
}, {
    id: "文字识别",
    text: "",
    code: "文字识别",
    bg: "#808080"
}, {
    id: "成语词典",
    text: "",
    code: "成语词典",
    bg: "#808080"
}, {
    id: "号码归属地查询",
    text: "",
    code: "号码归属地查询",
    bg: "#808080"
}, {
    id: "IP地址查询",
    text: "",
    code: "IP地址查询",
    bg: "#808080"
}, {
    id: "身份证查询",
    text: "",
    code: "身份证查询",
    bg: "#808080"
}, {
    id: "聊天机器人",
    text: "",
    code: "聊天机器人",
    bg: "#808080"
}, {
    id: "密码生成器",
    text: "",
    code: "密码生成器",
    bg: "#808080"
}, {
    id: "网页源码浏览",
    text: "",
    code: "网页源码浏览",
    bg: "#808080"
}, {
    id: "调色板2.0",
    text: "",
    code: "调色板2.0",
    bg: "#808080"
}, {
    id: "每日一句(英文励志)",
    text: "",
    code: "每日一句(英文励志)",
    bg: "#808080"
}, {
    id: "短网址生成",
    text: "",
    code: "短网址生成",
    bg: "#808080"
}, {
    id: "二维码生成",
    text: "",
    code: "二维码生成",
    bg: "#808080"
}, {
    id: "二维码识别",
    text: "",
    code: "二维码识别",
    bg: "#808080"
}, {
    id: "图片转链接",
    text: "",
    code: "图片转链接",
    bg: "#808080"
}, {
    id: "音乐下载",
    text: "",
    code: "音乐下载",
    bg: "#808080"
}, {
    id: "一键AES加/解密",
    text: "",
    code: "一键AES加解密",
    bg: "#808080"
}, {
    id: "脚本一键BASE64",
    text: "",
    code: "脚本一键BASE64",
    bg: "#808080"
}, {
    id: "进制计算器",
    text: "",
    code: "进制计算器",
    bg: "#808080"
}, {
    id: "vip视频解析2.0",
    text: "",
    code: "vip视频解析2.0",
    bg: "#808080"
}, {
    id: "历史上的今天",
    text: "",
    code: "历史上的今天",
    bg: "#808080"
}, {
    id: "百度搜图",
    text: "",
    code: "百度搜图",
    bg: "#808080"
}, {
    id: "视频搜索",
    text: "",
    code: "视频搜索",
    bg: "#808080"
}, {
    id: "网页翻译器",
    text: "",
    code: "网页翻译器",
    bg: "#808080"
}, {
    id: "BASE64加解密",
    text: "",
    code: "BASE64加解密",
    bg: "#808080"
}, {
    id: "时间截转换",
    text: "",
    code: "时间截转换",
    bg: "#808080"
}, {
    id: "倒数日",
    text: "",
    code: "倒数日",
    bg: "#808080"
}, {
    id: "亲戚关系",
    text: "",
    code: "亲戚关系",
    bg: "#808080"
}];

ui.statusBarColor("#a3a1a1");
ui.layout(
    <drawer id="drawer" bg="#dcdcdc">
        <vertical>
            <appbar w="*" bg="#a3a1a1">
                <toolbar id="toolbar" title="多功能工具箱 {{Spiccode}}" />
            </appbar>
            <viewpager id="viewpager" layout_weight="1">
                <frame>
                    <grid id="list" spanCount="2" h="*" fastScrollEnabled="true" scrollbars="vertical" scrollbarStyle="outsideInset">
                        <vertical>
                            <card w="*" h="auto" margin="10 5 10 5" gravity="center" cardCornerRadius="5dp" cardBackgroundColor="{{this.bg}}"
                                layout_gravity="center" foreground="?selectableItemBackground">
                                <vertical>
                                    <text text="{{this.id}}" layout_gravity="left" textSize="18" padding="5 5 5 0" textColor="#ffffff" bg="?selectableItemBackgroundBorderless" />
                                    {/* <text text="{{this.text}}" layout_gravity="left" padding="5 5 5 5" textSize="16" textColor="#000000" w="auto" /> */}
                                </vertical>
                            </card>

                        </vertical>
                    </grid>
                </frame>
                <frame>
                    <vertical layout_weight="1">
                        <linear orientation="vertical" >
                            <img id="me" src="http://qlogo1.store.qq.com/qzone/1641763174/1641763174/100"
                                w="100" h="100" radius="20dp" marginTop="15" scaleType="fitXY" layout_gravity="center" />
                            <text text="多功能工具箱 {{Spiccode}}" textStyle="bold" textColor="black" textSize="16sp" marginTop="16" gravity="center" />
                        </linear>
                        <vertical marginTop="15">

                            <horizontal margin="5 15 0 0" bg="#ffffff">
                                <img src="file://./res/ic_card_giftcard_black_48dp.png" w="35" h="35" />
                                <text text="友情赞助" id="zanzhu" textSize="25dp" w="*" bg="?attr/selectableItemBackground" clickable="true" />
                            </horizontal>

                            <horizontal margin="5 2 0 0" bg="#ffffff">
                                <img src="file://./res/ic_touch_app_black_48dp.png" w="35" h="35" />
                                <text text="官方交流群" id="qun" textSize="25dp" w="*" bg="?attr/selectableItemBackground" clickable="true" />
                            </horizontal>

                            <horizontal margin="5 15 0 0" bg="#ffffff">
                                <img src="file://./res/ic_help_outline_black_48dp.png" w="35" h="35" />
                                <text text="使用帮助" id="help" textSize="25dp" w="*" bg="?attr/selectableItemBackground" clickable="true" />
                            </horizontal>

                            <horizontal margin="5 2 0 0" bg="#ffffff">
                                <img src="file://./res/ic_share_black_48dp.png" w="35" h="35" />
                                <text text="分享软件" id="fen" textSize="25dp" w="*" bg="?attr/selectableItemBackground" clickable="true" />
                            </horizontal>

                            <horizontal margin="5 2 0 0" bg="#ffffff">
                                <img src="file://./res/ic_message_black_48dp.png" w="35" h="35" />
                                <text text="意见反馈" id="jianyi" textSize="25dp" w="*" bg="?attr/selectableItemBackground" clickable="true" />
                            </horizontal>

                            <horizontal margin="5 2 0 0" bg="#ffffff">
                                <img src="file://./res/ic_refresh_black_48dp.png" w="35" h="35" />
                                <text text="检测更新" id="up" textSize="25dp" w="*" bg="?attr/selectableItemBackground" clickable="true" />
                            </horizontal>

                            <horizontal margin="5 2 0 0" bg="#ffffff">
                                <img src="file://./res/ic_info_outline_black_48dp.png" w="35" h="35" />
                                <text text="关于软件" id="info" textSize="25dp" w="*" bg="?attr/selectableItemBackground" clickable="true" />
                            </horizontal>

                            <horizontal margin="5 15 0 0" bg="#ffffff">
                                <img src="file://./res/ic_exit_to_app_black_48dp.png" w="35" h="35" />
                                <text text="退出软件" id="exit" textSize="25dp" w="*" bg="?attr/selectableItemBackground" clickable="true" />
                            </horizontal>
                        </vertical>
                    </vertical>
                </frame>
            </viewpager>
            <appbar h="50" w="*" bg="#a3a1a1">
                <tabs id="tabs" />
            </appbar>
        </vertical>
    </drawer>
);
activity.setSupportActionBar(ui.toolbar);
ui.viewpager.setTitles(["功能", "我的"]);
ui.tabs.setupWithViewPager(ui.viewpager);
ui.list.setDataSource(F_List);

ui.list.on("item_click", function (name) {
    let code = "./lib/" + name.code + ".js";
    engines.execScriptFile(code);
});
ui.me.click(() => {
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "mqqapi://card/show_pslcard?&uin=1641763174"
    });
});
ui.zanzhu.click(() => {
    dialogs.build({
        title: "请选择打赏的方式",
        content: releaseNotes,
        neutral: "取消",
        negative: "支付宝",
        positive: "微信",
        cancelable: false
    })
        .on("negative", () => {
            alipay("fkx06321tasf2kjzl3dki78");
        })
        .on("positive", () => {
            QuoteCode("weixin");
        })
        .show();
});

ui.qun.click(() => {
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "mqqapi://card/show_pslcard?card_type=group&uin=984523553",
        packageName: "com.tencent.mobileqq",
    });
});

ui.help.click(() => {
    dialogs.build({
        title: "常见问题QAQ",
        content: QAQ,
        positive: "我知道了",
        cancelable: false
    })
        .show();
});

ui.jianyi.click(() => {
    engines.execScriptFile("./lib/wenti.js");
});
ui.fen.click(() => {
    dialogs.build({
        title: "是否分享给好友？",
        content: null,
        positive: "确定",
        negative: "取消",
        cancelable: false
    })
        .on("positive", () => {
            app.startActivity({
                action: "android.intent.action.SEND",
                type: "text/*",
                extras: {
                    "android.intent.extra.TEXT": share
                },
                packageName: "com.tencent.mobileqq",
                className: "com.tencent.mobileqq.activity.JumpActivity"
            });
        })
        .show();
});
ui.up.click(() => {
    app.openUrl("https://www.lanzous.com/b309093");
});
ui.up.on("long_click", () => {
    app.openUrl("https://www.lanzous.com/b309093");
});
ui.info.click(() => {
    dialogs.build({
        title: "关于工具箱" + Spiccode,
        content: INFO,
        positive: "我知道了",
        cancelable: false
    })
        .show();
});

ui.exit.click(() => {
    dialogs.confirm("提示", "您真的要退出吗？", (a) => {
        if (a) {
            ui.finish();
        }
    });
});

