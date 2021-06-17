function myFunction() {
  // noteへログイン
  let response = loginNote()
  console.log(response.getContentText());

  // ヘッダー情報の取得
  let headers = getHeaders(response);
  // ダッシュボード情報の取得
  let dashboard = getDashboard(headers,2);
  console.log(dashboard.getContentText());

  let obj = ConvertJsonToObject(dashboard);
  console.log(obj["start_date_str"]);
}
