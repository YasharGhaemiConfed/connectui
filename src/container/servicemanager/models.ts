interface NumberArray {
  [index: number]: number;
}
export interface ServiceListModel {
  [index: number]: NumberArray;
}

export interface ResultResponse {
  score: number;
  set: number[][];
}
