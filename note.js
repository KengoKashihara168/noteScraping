let userData;
let headers;
let dateTime;

// noteの初期化
function noteInitialize() {
    // noteにログインしてユーザーデータとCookiesを取得
    let loginData = loginNote();
    userData = ConvertJsonToObject(loginData);
    headers = getHeaders(loginData);
}

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

    // ログインリクエスト
    return UrlFetchApp.fetch(url, post_option);
}

// ユーザー情報をシートに書き出す
function writeUserData() {
    setCreatorName(userData["nickname"]);            // クリエイター名
    setNoteID(userData["urlname"]);                  // noteID
    setNoteCount(userData["note_count"]);            // 投稿した記事数
    setFollowingCount(userData["following_count"]);  // フォロー数
    setFollowerCount(userData["follower_count"]);    // フォロワー数
}

// Cookiesからヘッダー情報の取得
function getHeaders(response) {
    var cookies = response.getHeaders()["Set-Cookie"];
    var headers = { Cookie: cookies };

    return headers;
}

// ダッシュボードのページ情報を取得
function getDashboard(page) {
    let url = "https://note.com/api/v1/stats/pv?filter=all&page=" + page + "&sort=pv";
    let get_options = {
        method: "get",
        headers: headers,
        followRedirects: true,
    };
    // ダッシュボードページを取得
    let response = UrlFetchApp.fetch(url, get_options);
    let noteData = ConvertJsonToObject(response);
    return noteData;
}

// 日付と時刻を取得
function getLastCalculateAt() {
    if (!dateTime) {
        console.log("日付を取得");
        let data = getDashboard(1);
        setDateTime(data["last_calculate_at"]);
    }
    return dateTime;
}

// 全記事のステータスを取得
function getStats() {
    let noteCount = userData["note_count"];
    let stats = new Array();

    // ダッシュボードの全ページから取得
    for (let i = 1; noteCount > 0; i++){
        let dashboard = getDashboard(i);
        stats = stats.concat(dashboard["note_stats"]);
        noteCount -= dashboard["note_stats"].length;
    }

    return stats;
}

// 日付と時刻を保存
function setDateTime(lastCalculateAt) {
    if (dateTime != lastCalculateAt) {
        dateTime = lastCalculateAt;
    }
}