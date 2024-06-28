export type RegUserInfo = Required<
  Record<
    "username" | "password" | "email" | "emailCode" | "captchaCode",
    string
  >
>;

export default RegUserInfo


