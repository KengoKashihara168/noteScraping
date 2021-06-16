// スプレッドシートのURL
let spreadsheetURL = "https://docs.google.com/spreadsheets/d/12uaWZuVLM6RCZkD5aQ_k_UyXLImTn5fo_3RtkeJ6eF8/edit#gid=0";
// スプレッドシート
let spreadsheet = SpreadsheetApp.openByUrl(spreadsheetURL);
// シート
let sheet = spreadsheet.getSheetByName("ユーザー情報");
// noteのユーザーID
let userId = sheet.getRange("C2").getValue();
// noteのパスワード
let password = sheet.getRange("C3").getValue();

function myFunction() {
  // let parser = getParser(url);
  // let param = getParameter(parser, "title");

  let response = loginNote()
  console.log(response.getContentText());

  // ヘッダー情報の取得
  let headers = getHeaders(response);
  // ダッシュボード情報の取得
  let dashboard = getDashboard(headers);
  console.log(dashboard.getContentText());
}

// noteへログイン
function loginNote() {
  let url = "https://note.com/api/v1/sessions/sign_in";

  // ログイン情報
  let payload = {
    follow: null,
    likable_id: null,
    likables: null,
    login: userId,
    magazine_follow: null,
    password: password,
    redirect_path: "/sitesettings/stats",
  };

  let post_option = {
    "method": "post",
    "payload": payload
  };

  let response = UrlFetchApp.fetch(url, post_option);
  return response;
}

// Cookiesからヘッダー情報の取得
// <param name="response">HTTPリクエストのレスポンス</param >
function getHeaders(response) {
  var cookies = response.getHeaders()["Set-Cookie"];
  var headers = { Cookie: cookies };

  return headers;
}

// ダッシュボードのページ情報を取得
// <param name="headers">Cookiesから取得したヘッダー情報</param >
function getDashboard(headers) {
  url = "https://note.com/api/v1/stats/pv?filter=all&page=1&sort=pv";
  var get_options = {
    method: "get",
    headers: headers,
    followRedirects: true,
  };
  // ダッシュボードページを取得
  response = UrlFetchApp.fetch(url, get_options);
  return response;
}

// Parserオブジェクトの取得
// <param name="url">HTMLを取得するURL</param>
function getParser(url) {
  let html = UrlFetchApp.fetch(url);
  let parser = Parser.data(html.getContentText());
  return parser;
}

// HTMLの要素を取得
// <param name="parser">Parserオブジェクト</param>
// <param name="from">取得するタグ</param>
function getParameter(parser, tag) {
  let from = "<" + tag + ">";
  let to = "</" + tag + ">";
  let param = parser.from(from).to(to).build();
  return param;
}
