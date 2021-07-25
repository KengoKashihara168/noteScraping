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
  let status = getStatus();

  // 記事の情報をシートに追加
  for (let i = 0; i < status.length; i++)
  {
    let articleData   = ExtractArticleData(status[i]);
    let articleValues = ExtractArticleValues(status[i]);

    insertDataSheet("記事一覧", articleData);
    insertDataSheet("2021年07月更新記録", articleValues);
  }
}
