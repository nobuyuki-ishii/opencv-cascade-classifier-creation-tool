import { resultListStore, selectedIndexStore, selectedBeforeIndexStore, rectListStore, positiveListPathStore } from "../stores";
import { get } from "svelte/store";
import { RESULT } from "../data/const"

// 写真表示を変更する
export function changePicture(cnt: number): void {
  const selectedIndex: string = get(selectedIndexStore);
  const resultList: any = get(resultListStore);

  let newIndex: number = Number(selectedIndex) + cnt;
  if (newIndex < 0) {
    newIndex = resultList.length - 1;
  } else if (newIndex > resultList.length - 1) {
    newIndex = 0;
  }
  console.log("newIndex:" + newIndex);

  selectedBeforeIndexStore.set(selectedIndex);
  selectedIndexStore.set(newIndex);
}

export function getNegativeCount(): number {
  const resultList: [] = get(resultListStore);
  if (resultList == undefined) return 0;
  const negativeList = resultList.filter(result => result["result"] == RESULT.NEGATIVE);
  return negativeList.length;
}

export function getPositiveCount(): number {
  const resultList: [] = get(resultListStore);
  if (resultList == undefined) return 0;
  const positiveList = resultList.filter(result => result["result"] == RESULT.POSITIVE);
  return positiveList.length;
}
