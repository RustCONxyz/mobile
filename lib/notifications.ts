import { getNotificationSettings } from "@/lib/storage";

let expoPushToken: string | null = null;

export async function registerPushToken(token?: string) {

    if (!expoPushToken && !token) {

        return;

    }

    if (!expoPushToken && token) {

        expoPushToken = token;

    }

    const notificationSettings = getNotificationSettings();

    await fetch(`${process.env.EXPO_PUBLIC_API_URL}/push-token`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            token: token || expoPushToken,
            settings: notificationSettings
        })

    });

}
