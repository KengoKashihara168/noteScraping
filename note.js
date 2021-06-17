// noteへログイン
function loginNote() {
    let url = "https://note.com/api/v1/sessions/sign_in";

    let userId = getNoteID();
    let password = getNotePassword();
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
function getDashboard(headers, page) {
    let url = "https://note.com/api/v1/stats/pv?filter=all&page=" + page + "&sort=pv";
    let get_options = {
        method: "get",
        headers: headers,
        followRedirects: true,
    };
    // ダッシュボードページを取得
    response = UrlFetchApp.fetch(url, get_options);
    return response;
}