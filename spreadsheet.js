// スプレッドシートのURL
let spreadsheetURL = "https://docs.google.com/spreadsheets/d/12uaWZuVLM6RCZkD5aQ_k_UyXLImTn5fo_3RtkeJ6eF8/edit#gid=0";
// スプレッドシート
let spreadsheet = SpreadsheetApp.openByUrl(spreadsheetURL);

// noteのIDをシートから取得
function getNoteID() {
    // シート
    let sheet = spreadsheet.getSheetByName("ユーザー情報");
    // noteのユーザーID
    let userId = sheet.getRange("C2").getValue();

    return userId;
}

// noteのパスワードをシートから取得
function getNotePassword() {
    // シート
    let sheet = spreadsheet.getSheetByName("ユーザー情報");
    // noteのパスワード
    let password = sheet.getRange("C4").getValue();

    return password;
}

// ユーザー情報をシートに書き出す
function writeUserData(userData) {
    setCreatorName(userData["nickname"]);            // クリエイター名
    setNoteID(userData["urlname"]);                  // noteID
    setNoteCount(userData["note_count"]);            // 投稿した記事数
    setFollowingCount(userData["following_count"]);  // フォロー数
    setFollowerCount(userData["follower_count"]);    // フォロワー数
}

// シートに値を記入
function setSheet(value, sheetName, row, column = 0) {
    // シート
    let sheet = spreadsheet.getSheetByName(sheetName);
    let range;
    // 入力するセルの取得
    if (column == 0) {
        range = sheet.getRange(row);
    } else {
        range = sheet.getRange(row,column);
    }
    range.setValue(value);
}

// ユーザー情報のシートにクリエイター名を入力
function setCreatorName(name) {
    setSheet(name, "ユーザー情報", "C7");
}

// ユーザー情報のシートにnoteIDを入力
function setNoteID(noteID) {
    setSheet(noteID, "ユーザー情報", "C8");
}

// ユーザー情報のシートに投稿した記事数を入力
function setNoteCount(count) {
    setSheet(count, "ユーザー情報", "C9");
}

// ユーザー情報のシートに投稿した記事数を入力
function setFollowingCount(count) {
    setSheet(count, "ユーザー情報", "C10");
}

// ユーザー情報のシートに投稿した記事数を入力
function setFollowerCount(count) {
    setSheet(count, "ユーザー情報", "C11");
}