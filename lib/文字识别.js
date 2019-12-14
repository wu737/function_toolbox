"ui";
ui.layout(
    <frame>
        <vertical align="top" margin="0" bg="#ff555555">
            <text id="text_test" textSize="12sp" />
            <linear>
                <button id="awz" layout_weight="1" h="45" hint="选择图片" />
                <button h="45" w="60" id="ok" text="识别" />
                <button h="45" w="60" id="copy" text="复制" />
            </linear>
            <input id="text" gravity="left" size="16" bg="#ffffff" w="358" h="566" margin="5 1 5 1" />
        </vertical>
    </frame>
);

ui.awz.click(() => {
    startChooseFile("image/*");
});
ui.copy.click(() => {
    let xbj = ui.text.text();
    if (xbj) {
        setClip(xbj);
        toast("复制成功");
    }
});

ui.ok.click(() => {
    threads.start(function () {
        let ert = ui.text_test.text();
        if (ert) {
            let wsx = Text_Orc(ui.text_test.text());
            if (wsx) {
                ui.run(() => {
                    ui.text.setText(wsx);
                });
            }
        } else { toast("请先选择图片"); }
    });
});

function startChooseFile(mimeType, callback) {
    var i = new android.content.Intent(android.content.Intent.ACTION_GET_CONTENT);
    i.setType(mimeType);
    ResultIntent.startActivityForResult(i, function (resultCode, data) {
        if (resultCode != activity.RESULT_OK) return;
        var f = URIUtils_uriToFile(data.getData());
        ui.run(() => {
            ui.text_test.setText(f);
        });
    });
} 

function Text_Orc(picpath) {
    var 链接 = "http://pic.sogou.com/pic/upload_pic.jsp";
    var 获取 = http.postMultipart(链接, {
        "file": open(picpath),
    });
    var 返回 = 获取.body.string();
    获取 = http.get("http://pic.sogou.com/pic/ocr/ocrOnline.jsp?query=" + 返回);
    数据 = 获取.body.string();
    const json = JSON.parse(数据);
    处理 = json.result.map(val => val.content);
    处理 = 处理.join('\n');
    return 处理;
}
var ResultIntent = {
    intentCallback: {},
    init: function() {
        activity.getEventEmitter().on("activity_result", (requestCode, resultCode, data) => {
            this.onActivityResult(requestCode, resultCode, data);
        });
    },
    startActivityForResult: function(intent, callback) {
        var i;
        for (i = 0; i < 65536; i++) {
            if (!(i in this.intentCallback)) break;
        }
        if (i >= 65536) {
            toast("启动Intent失败：同时请求的Intent过多");
            return;
        }
        this.intentCallback[i] = callback;
        activity.startActivityForResult(intent, i);
    },
    onActivityResult: function(requestCode, resultCode, data) {
        var cb = this.intentCallback[requestCode];
        if (!cb) return;
        delete this.intentCallback[requestCode];
        cb(resultCode, data);
    }
};
ResultIntent.init();
function URIUtils_uriToFile(uri) { //Source : https://www.cnblogs.com/panhouye/archive/2017/04/23/6751710.html
    var r = null,
        cursor, column_index, selection = null,
        selectionArgs = null,
        isKitKat = android.os.Build.VERSION.SDK_INT >= 19,
        docs;
    if (uri.getScheme().equalsIgnoreCase("content")) {
        if (isKitKat && android.provider.DocumentsContract.isDocumentUri(activity, uri)) {
            if (String(uri.getAuthority()) == "com.android.externalstorage.documents") {
                docs = String(android.provider.DocumentsContract.getDocumentId(uri)).split(":");
                if (docs[0] == "primary") {
                    return android.os.Environment.getExternalStorageDirectory() + "/" + docs[1];
                }
            } else if (String(uri.getAuthority()) == "com.android.providers.downloads.documents") {
                uri = android.content.ContentUris.withAppendedId(
                    android.net.Uri.parse("content://downloads/public_downloads"),
                    parseInt(android.provider.DocumentsContract.getDocumentId(uri))
                );
            } else if (String(uri.getAuthority()) == "com.android.providers.media.documents") {
                docs = String(android.provider.DocumentsContract.getDocumentId(uri)).split(":");
                if (docs[0] == "image") {
                    uri = android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
                } else if (docs[0] == "video") {
                    uri = android.provider.MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
                } else if (docs[0] == "audio") {
                    uri = android.provider.MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
                }
                selection = "_id=?";
                selectionArgs = [docs[1]];
            }
        }
        try {
            cursor = activity.getContentResolver().query(uri, ["_data"], selection, selectionArgs, null);
            if (cursor && cursor.moveToFirst()) {
                r = String(cursor.getString(cursor.getColumnIndexOrThrow("_data")));
            }
        } catch (e) {
            log(e)
        }
        if (cursor) cursor.close();
        return r;
    } else if (uri.getScheme().equalsIgnoreCase("file")) {
        return String(uri.getPath());
    }
    return null;
}