import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "../firebase";

const logger = {
  logDocRef: doc(database, "Admin", "log"),

  async log(args) {
    const logSnapshot = await getDoc(this.logDocRef);
    const log = logSnapshot.data().log;
    const time = new Date();
    const receptionTime = `${String(time.getHours()).padStart(2, "0")}:${String(time.getMinutes()).padStart(2, "0")}:${String(time.getSeconds()).padStart(2, "0")}`;
    args["time"] = receptionTime;
    log.push(args);
    await setDoc(this.logDocRef, { log: log });
  },
};

export { logger };
