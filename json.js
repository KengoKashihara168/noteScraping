function ConvertJsonToObject(json) {
    let obj = JSON.parse(json);

    return obj["data"];
}