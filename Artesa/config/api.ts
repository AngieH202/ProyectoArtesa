import { Platform } from "react-native";
//para web o utilizar en la computadora
const LOCALHOST = "localhost:5144";

//para emulador android
const EMULATOR_HOST = "10.0.2.2:5144";

//dispositivo fisico (expo go) utilizando la ip de la computadora
const DEVICE_HOST = "192.168.1.34:5144";

export const BASE_URL =
  Platform.OS === "android" || "ios"
    ? (__DEV__ ? `http://${EMULATOR_HOST}` : `http://${DEVICE_HOST}`)
    : `http://${LOCALHOST}`;

