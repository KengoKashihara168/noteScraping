function myFunction() {
  // noteへログイン
  noteInitialize();

  // ユーザデータの取得
  let userData = getUserData();

  // シートに書き込み
  writeUserData(userData);

  // 日付を取得
  console.log(getLastCalculateAt());

  // 記事の情報を取得
  let stats = getStats();

  console.log(stats);
}
