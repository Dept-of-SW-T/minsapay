import { authentication } from "../firebase";
//import cryptoJS from "crypto-js";
import { getCookie, removeCookie, setCookie } from "./cookies";
import {
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { EmailAuthProvider } from "firebase/auth/cordova";

/*  1. student id 제외하고는 숫자로 시작하면 안된다
    2. team id는 @ 기호를 포함하면 안된다.  -> kwagibu@kiosk
    student id = start with number, kiosk id = team id  + @kiosk, CPU id = team id + @CPU
    currentUser: {
        userType --> one of "buyer", "seller", "CPU", "kiosk" // 앞으로 admin(금정), kwagibu(시스템 관리자) 추가하면 좋을 듯
        userID
        username
        { : only when userType === "seller"
            linkedTeamID
            linkedTeamName
        }
    }
*/

const loginUtils = {
  error: "", // auth 함수 처리 과정중의 모든 error들을 다 가져온다 --> if(auth.함수) { 에러 처리 코드 } // error를 초기화하고 함수를 돌리거나 함수 자체로 true false를 return하도록

  getLoginType() {
    return getCookie("user_type");
  },
  getCurrentUser() {
    return JSON.parse(
      sessionStorage.getItem(
        "firebase:authUser:AIzaSyCVstIqjEOq3xYlom7sMy4QQo157mjwvb4:[DEFAULT]",
      ),
    );
  },
  isLoggedIn() {
    return this.getCurrentUser() !== null;
  },
  getUserClass() {
    const sessionValue = this.getCurrentUser().email;
    console.log(typeof sessionValue);
    return sessionValue.substring(
      sessionValue.indexOf("@") + 1,
      sessionValue.indexOf("."),
    );
  },
  getUserID() {
    const sessionValue = this.getCurrentUser().email;
    return sessionValue.substring(0, sessionValue.indexOf("@"));
  },
  signOut() {
    return new Promise((resolve) => {
      this.error = ""; // auth 객체 초기화
      signOut(authentication).then(() => {
        removeCookie("user_type"); // 로그아웃 시 cookie 삭제
        resolve();
      });
    });
  },
  changePassword(currentPassword, newPassword) {
    this.error = "";
    return new Promise((resolve, reject) => {
      const user = authentication.currentUser;
      const cred = EmailAuthProvider.credential(user.email, currentPassword);
      reauthenticateWithCredential(user, cred)
        .then(() => updatePassword(user, newPassword))
        .then(() => {
          resolve();
        })
        .catch((e) => {
          switch (e.message) {
            case "Firebase: Error (auth/invalid-credential).":
              this.error = "현재 비밀번호가 잘못되었습니다.";
              break;
            case "Firebase: Password should be at least 6 characters (auth/weak-password).":
              this.error = "비밀번호가 최소 6자리이어야 합니다.";
              break;
            default:
              this.error = e.message;
              break;
          }
          reject();
        });
    });
  },
  async developerSignIn(password) {
    await this.signOut();
    this.error = "";
    try {
      await signInWithEmailAndPassword(
        authentication,
        "admin@developer.com",
        password,
      );
      setCookie("user_type", "developer");
    } catch (e) {
      if (e instanceof FirebaseError) {
        this.error = e.message;
        return false;
      }
    }
    return true;
  },
  async signIn(userID, password) {
    // 성공적인 로그인 시 true를 그게 아닐 시 false를 return한다.
    await this.signOut();
    this.error = "";
    function onlyDigits(userID) {
      let result = true;
      for (let i = 0; i < userID.length; i++) {
        result = result && 0 <= userID[i] && userID[i] <= 9; //check if every character is a digit
      }
      return result;
    }
    if (onlyDigits(userID)) {
      try {
        await signInWithEmailAndPassword(
          authentication,
          userID.concat("@student.com"),
          password,
        );
        setCookie("user_type", "buyer");
      } catch (e) {
        if (e instanceof FirebaseError) {
          this.error = e.message;
          return false;
        }
      }
    } else {
      // 부스 로그인
      if (!userID.includes("@")) {
        // 아이디 입력에 @가 없으면 error return
        this.error = "부적절한 아이디입니다.";
        return false;
      }
      const userType = userID.substring(userID.indexOf("@") + 1, userID.length); // @ 뒤의 usertype를 그대로 잘라내기
      if (
        userType !== "CPU" &&
        userType !== "kiosk" &&
        userType !== "seller" &&
        userType !== "moderator"
      ) {
        this.error = "부적절한 아이디입니다.";
        return false;
      }
      userID = userID.substring(0, userID.indexOf("@")); // @ 이전의 id를 저장
      if (userType === "seller") {
        try {
          await signInWithEmailAndPassword(
            authentication,
            userID.concat("@student.com"),
            password,
          );
          setCookie("user_type", "seller");
        } catch (e) {
          if (e instanceof FirebaseError) {
            this.error = e.message;
            return false;
          }
        }
      } else if (userType === "moderator") {
        try {
          await signInWithEmailAndPassword(
            authentication,
            "admin@moderator.com",
            password,
          );
          setCookie("user_type", "moderator");
        } catch (e) {
          if (e instanceof FirebaseError) {
            this.error = e.message;
            return false;
          }
        }
      } else {
        try {
          await signInWithEmailAndPassword(
            authentication,
            userID.concat("@team.com"),
            password,
          );
          setCookie("user_type", userType);
        } catch (e) {
          if (e instanceof FirebaseError) {
            this.error = e.message;
            return false;
          }
        }
      }
    }
    return true;
  },
};

export { loginUtils };
