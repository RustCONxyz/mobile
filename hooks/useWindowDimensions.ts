import { Dimensions, StatusBar } from "react-native";

export default function useWindowDimensions() {

    const { width, height } = Dimensions.get("window");

    return { width, height, statusbarHeight: StatusBar.currentHeight };

}
