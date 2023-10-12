import type React from "react";
import { Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Link } from "./Themed";

export default function ExternalLink(props: React.ComponentProps<typeof Link>) {

    return (
        <Link hrefAttrs={{ target: "_blank" }} {...props} onPress={e => {

            if (Platform.OS !== "web") {

                e.preventDefault();

                WebBrowser.openBrowserAsync(props.href as string);

            }

        }} />
    )

}
