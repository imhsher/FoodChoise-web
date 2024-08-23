export interface ClassInfo {
  name: string;
}

export interface Label {
  name: string;
}

export default interface FoodInfo {
  foodId: number;
  cardId: number;
  name: string;
  description: string;
  price: number;
  dicPrice: number;
  cover: string;
  deleted: number;
  classInfo: ClassInfo;
  labels: Label[];
}
