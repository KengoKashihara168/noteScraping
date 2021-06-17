function myFunction() {
  // noteへログイン
  loginNote();

  // シートに書き込み
  writeUserData();

  // 記事の情報を取得
  let stats = getStats();

  console.log(stats);
}
