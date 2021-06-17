// Parserオブジェクトの取得
function getParser(response) {
    let parser = Parser.data(response.getContentText());
    return parser;
}

// HTMLの要素を取得
function getParameter(parser, tag) {
    let from = "<" + tag + ">";
    let to = "</" + tag + ">";
    let param = parser.from(from).to(to).build();
    return param;
}