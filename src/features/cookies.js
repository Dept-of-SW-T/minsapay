import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = async (name, value, options) => {
  // cookie를 set하는 함수 --> options는 아직 안 사용함
  return await cookies.set(name, value, { maxAge: 40000, ...options });
};

export const getCookie = async (name) => {
  // cookie를 가져오는 함수
  return await cookies.get(name);
};

export const removeCookie = async (name) => {
  // cookie를 제거하는 함수
  await cookies.remove(name);
};
