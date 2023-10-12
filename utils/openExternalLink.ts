import { Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";

export default async function openExternalLink(url: string) {

    if (Platform.OS === "web") {

        window.open(url, "_blank");

    } else {

        await WebBrowser.openBrowserAsync(url);

    }

}
