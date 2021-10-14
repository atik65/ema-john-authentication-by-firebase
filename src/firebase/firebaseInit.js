import { initializeApp } from "firebase/app";
import firebaseConfig from "./firbase.config";

const initializeAuthentication = () => {
  initializeApp(firebaseConfig);
};

export default initializeAuthentication;
