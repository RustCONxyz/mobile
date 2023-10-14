import { useEffect, type ReactElement } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAppSelector } from "@/hooks/redux"
import { selectIsConnected } from "@/store/slices/websocket";

type RouteRedirectProps = { children: ReactElement };

export default function RouteRedirect({ children }: RouteRedirectProps) {

    const isConnected = useAppSelector(selectIsConnected);

    const router = useRouter();

    const segments = useSegments();

    useEffect(() => {

        const inAuthGroup = segments[0] === "(auth)";
        const inSettingsGroup = segments[0] === "settings";

        if (inSettingsGroup) return;

        if (!isConnected && !inAuthGroup) {

            router.replace("/");

        } else if (isConnected && inAuthGroup) {

            router.replace("/home");

        }

    }, [isConnected, segments]);

    return children;

}
