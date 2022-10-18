// JSONライブラリを使って、json文字列をJSデータに、JSデータをjson文字列にしていきます。
// JSONについては、Project4で詳しく学習します。

// json文字列
const jsonString = `[{"age":4,"money":40,"time":344,"purchases":["card","pizza","burger"]}]`;

// json文字列をオブジェクトに変換
let jsonDecoded = JSON.parse(jsonString);

console.log(jsonDecoded);
console.log(jsonDecoded[0]);

// ユーザーにjson文字列を要求し、それをデコードします。
// "[{"age":4,"money":40,"time":344,"purchases":["card","pizza","burger"]}]" を貼り付けてください。
let userJsonString = prompt("Jsonを貼り付けてください。");
let userJsonDecoded = JSON.parse(jsonString);

console.log("Logging user string parsed into JavaScript data.");
console.log(jsonDecoded);
console.log(jsonDecoded[0]);

// 実際のプロジェクトでは、ユーザーデータの検証は必ず行ってください。データの検証については、上級コースのソフトウェアテストコースを参照してください。正しいjson形式が入力されていなかったり、データが不足していたり、データに誤りがあったりした場合はどうなるか考えてみましょう。

// オブジェクトをjson文字列に変換することができます。これは保存されたデータを出力するのに便利です。
let jsonEncoded = JSON.stringify(userJsonDecoded);

// Json.stringify()を使ってオブジェクトが文字列に変換されましたが、そのままではユーザーがゲームを再開したいとき、Json文字列を入力しなければいけません。
// そこでlocalStrageを使ってユーザーのブラウザ上にデータを保存してみましょう。

// localStorageとはJavaScriptを使って、クライアント側にデータを保存する仕組みです。保存容量は5MB～10MB(ブラウザによる）で、半永久的にデータを保持することができます。

// localStorageのドキュメンテーションを確認しましょう
// https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage

// LocalStorageにデータを保存する時は、setItem()メソッドを使用します。
// キーと値のセットの組み合わせで保存し、形式は文字列のみです。
localStorage.setItem("mytext", jsonEncoded);

// LocalStorageに保存したデータを取得したい場合は、getItem()を使用します。

let myLocalStrage = localStorage.getItem("mytext");
console.log(myLocalStrage);

// 保存したデータを削除するときはremoveItem()を使います。
localStorage.removeItem(myLocalStrage);

// localStrageを試してみましょう。
// 呼び出しボタン
document.getElementById("sampleload").onclick = function () {
  if (localStorage.getItem("saveData") === null) {
    alert("保存されていません。");
    return false;
  }
  let text = localStorage.getItem("saveData");
  document.getElementById("sampletext").value = text;
  alert("呼び出しました。");
};

// 保存ボタン
document.getElementById("samplesave").onclick = function () {
  let text = document.getElementById("sampletext");
  if (!text.value) {
    alert("入力されていません。");
    return false;
  }
  localStorage.setItem("saveData", text.value);
  alert("保存しました。");
  text.value = "";
};

//削除ボタン
document.getElementById("sampledelete").onclick = function () {
  let text = document.getElementById("sampletext");
  if (localStorage.getItem("saveData") === null) {
    alert("保存されていません。");
    return false;
  }
  localStorage.removeItem("saveData");
  alert("削除しました。");
  text.value = "";
};
