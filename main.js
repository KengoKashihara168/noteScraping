function myFunction() {
  // let parser = getParser(url);
  // let param = getParameter(parser, "title");

  let response = loginNote("KengoKashihara1998+comic@gmail.com", "Rakko3150K61")
  console.log(response.getContentText());

  // ヘッダー情報の取得
  var headers = getHeaders(response);
}

// noteへログイン
// <param name="id">ID（メールアドレス）</param>
// <param name="password">パスワード</param>
function loginNote(id, password) {
  let url = "https://note.com/api/v1/sessions/sign_in";

  // ログイン情報
  let payload = {
    follow: null,
    likable_id: null,
    likables: null,
    login: id,
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
// <param name="id">HTTPリクエストのレスポンス</param >
function getHeaders(response) {
  var cookies = response.getHeaders()["Set-Cookie"];
  var headers = { Cookie: cookies };

  return headers;
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
