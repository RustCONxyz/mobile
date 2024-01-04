import type React from "react";
import { Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Link } from "@/components/Themed";

export default function ExternalLink(props: Omit<React.ComponentProps<typeof Link>, "href"> & { href: string }) {

    return <Link
        hrefAttrs={{ target: "_blank" }}
        {...props}
        href={props.href}
        onPress={(e: any) => {

            if (Platform.OS !== "web") {

                e.preventDefault();

                WebBrowser.openBrowserAsync(props.href);

            }

        }}
    />

}
