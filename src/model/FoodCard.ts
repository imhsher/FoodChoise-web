import UserInfo from "./UserInfo";
import SchoolInfo from "./SchoolInfo";

export default interface FoodCard {
  title: string;
  description: string;
  cover?: string;
  userInfo?: UserInfo;
  schoolInfo?: SchoolInfo;
  locationInfo?: any;
  shareState: number;
  deleted: number;
  cardId: number;
  valueOf(): FoodCard;

}
