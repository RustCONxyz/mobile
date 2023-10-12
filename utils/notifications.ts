import { getNotificationSettings } from "./storage/notifications";

export async function registerPushToken(token: string, platform: string, platformVersion: string) {

    const notificationSettings = await getNotificationSettings();

    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/push-token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token,
            platform,
            platformVersion,
            settings: notificationSettings
        })
    });

    if (!response.ok) {

        throw new Error("Failed to register push token");

    }

}
