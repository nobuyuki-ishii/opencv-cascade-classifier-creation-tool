import { writable, get } from "svelte/store";
import { browser } from "$app/environment";

// import直後かどうか
//export const isInitalizeStore: any = writable(false);
// importのtextareaに入力したファイルのリスト
export const inputFilePathStore: any = writable();
// ファイルパスと判定結果のリスト
// filePath:ファイルパス
// result:判定（’’ or 'p' or 'n'）
// fileName:ファイル名
// rectList:positiveの四角情報
export const resultListStore: any = writable();
// 選択前の写真
export const selectedBeforeIndexStore: any = writable();
// 選択中の写真
export const selectedIndexStore: any = writable();
// 描画した四角のリスト
export const rectListStore: any = writable();
// 写真を変更したか
export const isPictureChangeStore: any = writable();
// positive listのパス
export const positiveListPathStore: any = writable("");
// negative listのパス
export const negativeListPathStore: any = writable("");
// 表示モード true: only judged, false: all
//export const isDisplayOnlyStore: any = writable(true);

export function savePositiveListPath(): void {
  if (browser) {
    localStorage.setItem("positiveListPathStore", get(positiveListPathStore));
  }
}

export function saveNegativeListPath(): void {
  if (browser) {
    localStorage.setItem("negativeListPathStore", get(positiveListPathStore));
  }
}

export function saveSelectedIndexStore(): void {
  if (browser) {
    localStorage.setItem("selectedIndexStore", get(selectedIndexStore));
  }
}

export function saveResultListStore(): void {
  if (browser) {
    localStorage.setItem("resultListStore", JSON.stringify(get(resultListStore)));
  }
}

export function storeAllClear(): void {
  if (browser) {
    positiveListPathStore.set("");
    negativeListPathStore.set("");
    selectedIndexStore.set("");
    resultListStore.set(undefined);
    localStorage.clear();
  }
}

// localStorageから値を初期化
if (browser) {
  positiveListPathStore.set(getItemFromLocalStorage("positiveListPathStore"));
  negativeListPathStore.set(getItemFromLocalStorage("negativeListPathStore"));

  const resultListStoreTmp = getItemFromLocalStorage("resultListStore");
  if (resultListStoreTmp != "") {
    console.log(resultListStoreTmp);
    resultListStore.set(JSON.parse(resultListStoreTmp));
  }

  selectedIndexStore.set(getItemFromLocalStorage("selectedIndexStore"));
}

// localStorageを取得。値がない場合、空文字を返す
function getItemFromLocalStorage(key: string): string {
  let val: any;
  if (browser) {
    val = localStorage.getItem(key);
    if (val == null) {
      val = "";
    }
  }
  return val;
}