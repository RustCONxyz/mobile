import { Drawer } from "expo-router/drawer";
import DrawerSidebar from "@/components/DrawerSidebar";
import useWindowDimensions from "@/hooks/useWindowDimensions";

export default function TabLayout() {

    const { width } = useWindowDimensions();

    return (
        <Drawer
            drawerContent={DrawerSidebar}
            screenOptions={{
                headerShown: false,
                swipeEnabled: true,
                swipeEdgeWidth: width * 3 / 4,
                drawerStyle: {
                    backgroundColor: "#0a0a0a"
                }
            }}
        >
            <Drawer.Screen name="home" />
            <Drawer.Screen name="console" />
            <Drawer.Screen name="chat" />
            <Drawer.Screen name="players" />
            <Drawer.Screen name="bans" />
        </Drawer>
    )

}
