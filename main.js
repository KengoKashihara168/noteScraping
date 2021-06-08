function myFunction() {
  let url = "https://www.google.com/";
  let parser = getParser(url);
  let param = getParameter(parser,"title")

  console.log(param);
}

// Parserオブジェクトの取得
// <param name="url">HTMLを取得するURL</param>
function getParser(url)
{
  let html = UrlFetchApp.fetch(url);
  let parser = Parser.data(html.getContentText());
  return parser;
}

// HTMLの要素を取得
// <param name="parser">Parserオブジェクト</param>
// <param name="from">取得するタグ</param>
function getParameter(parser, tag)
{
  let from = "<" + tag + ">";
  let to = "</" + tag + ">";
  let param = parser.from(from).to(to).build();
  return param;
}
