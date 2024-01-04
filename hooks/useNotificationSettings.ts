import { useMMKVObject } from "react-native-mmkv";
import { registerPushToken } from "@/lib/notifications";

import type NotificationSettings from "@/types/NotificationSettings";

export default function useNotificationSettings() {

    const [notificationsSettings, setNotifications] = useMMKVObject<NotificationSettings>("notification-settings");

    function toggleNotificationSetting(key: keyof NotificationSettings) {

        if (!notificationsSettings) return;

        setNotifications({ ...notificationsSettings, [key]: !notificationsSettings[key] });

        registerPushToken();

    }

    return { notificationsSettings, toggleNotificationSetting };

}
