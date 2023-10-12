import { getNotificationSettings } from "./storage/notifications";

const API_URL = "https://api.rustcon.xyz/push-token";

export async function registerPushToken(token: string, platform: string, platformVersion: string) {

    const notificationSettings = await getNotificationSettings();

    const response = await fetch(API_URL, {
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
