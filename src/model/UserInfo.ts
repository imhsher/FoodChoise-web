// 定义用户信息的接口
import SchoolInfo from "./SchoolInfo";
export default interface UserInfo {
  nickname: string | undefined;
  headPic: string | undefined;
  gender: number | undefined;
  schoolId?: number;
  schoolInfo?: SchoolInfo;
  userId: number;
  name: string;
  phone: string | undefined;
  personalityTags: string | undefined;
}
