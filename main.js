function myFunction() {
  // noteへログイン
  noteInitialize();

  // シートに書き込み
  writeUserData();

  // 日付を取得
  console.log(getLastCalculateAt());

  // 記事の情報を取得
  let stats = getStats();

  console.log(stats);
}
