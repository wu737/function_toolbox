"ui";
ui.layout(
    <frame>
        <list id="List" orientation="vertical" bg="#eeeeee" padding="5">
            <linear orientation="horizontal" gravity="left" margin="10 5 10 5" padding="5">
                <text text="{{this.title}}" />
            </linear>
        </list>
    </frame>
);
var txt = [];
lishi();
ui.run(function () {
    ui.List.setDataSource(txt);
});
function lishi() {
    threads.start(function () {
        let now = new Date();
        let res = http.get("https://api.avatardata.cn/HistoryToday/LookUp?key=f7b28a4506af42b297a7925bfb0d9b89&yue=" + (now.getMonth() + 1) + "&ri=" + now.getDate() + "&type=1&page=1&rows=40").body.json();
        return Handle(res);
    })
};
function Handle(str) {
    var json = str;
    for (let i = 0; i < json.result.length; i++) {
        txt.push({
            title: json.result[i].year + "-" + json.result[i].month + "-" + json.result[i].day + "      " + json.result[i].title
        });
    }
}
