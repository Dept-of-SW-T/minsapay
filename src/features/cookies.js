import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, options) => {
  // cookie를 set하는 함수 --> options는 아직 안 사용함
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name) => {
  // cookie를 가져오는 함수
  return cookies.get(name);
};

export const removeCookie = (name) => {
  // cookie를 제거하는 함수
  cookies.remove(name);
};
