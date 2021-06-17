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