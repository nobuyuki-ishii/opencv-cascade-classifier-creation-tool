<script lang="ts">
</script>

<div>
  <h4>概要</h4>
  <p>このアプリケーションはOpenCVで画像認識をする際にカスケード型分類機に読み込ませる学習データを作成するツールです。</p>
  <h4>1.準備</h4>
  <p>読み込む画像ファイルを用意してください。インターネット上に画像ファイルを配置した場合はwebアプリケーションから利用できます。PCに画像ファイルを用意した場合は、アプリケーションをダウンロードして、ローカル実行してください。画像ファイルが用意できたら、画像ファイルのパスを改行区切りにしたテキストを作成してください。</p>
  <h4>2.画像ファイルの読み込み</h4>
  <p>「Import」画面へ移動し、1で作成したテキストエリアにファイルパスを貼り付け「Read」ボタンを押下します。このアプリケーションのデータはwebブラウザに保存されます。データをクリアしたい場合は「Data Clear」ボタンを押下してください。</p>
  <h4>3.画像ファイルの判定</h4>
  <p>「Home」画面へ移動すると、画像ファイルが表示されています。写真の中に判定させたい対象物がある場合は、対象物をマウスオーバーして四角で囲み「Positive」ボタンを押下します。写真の中に判定させたい対象物がない場合は「Negative」ボタンを押下し、読み込んだ画像ファイルをすべて判定してください。</p>
  <h4>4.Positiveファイル、Negativeファイルの作成</h4>
  <p>「Positive List」画面へ移動し、「Download」ボタンを押下すると、Positive Listファイルがダウンロードされます。ファイルパスを指定した場合は、「Positive List File Path」にパスを入力してください。Negative Listファイルも同様に「Negative List」画面から作成してください。</p>
  <h4>5.vectorファイル、カスケード分類機ファイル作成</h4>
  <p>「Command」画面へ移動し、vectorファイルとカスケード分類機ファイルを作成のためのコマンドをコピーできます。これらを参考にカスケード分類機ファイルを作成してください。</p>
  <h4>以上</h4>
</div>

<style>
  div {
    margin: 10px;
  }
</style>