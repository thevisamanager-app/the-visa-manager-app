import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

// Design based on 360dp width (common Android)
const BASE_WIDTH = 360;

export function rs(value) {
  return (width / BASE_WIDTH) * value;
}
