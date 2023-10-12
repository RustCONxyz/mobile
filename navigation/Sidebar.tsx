import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useAppDispatch } from "../hooks/redux";
import buildWebSocketAction from "../store/websocket/actions";
import * as websocketActions from "../store/websocket/actions";

export default function Sidebar(props: DrawerContentComponentProps) {

    const dispatch = useAppDispatch();

    const handleDisconnect = () => dispatch(buildWebSocketAction(websocketActions.WEBSOCKET_DISCONNECT));

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Image source={require("../assets/images/logo.png")} style={{ width: 36, height: 36, marginRight: 16 }} />
                <Text style={styles.drawerTitle}>RustCON</Text>
            </View>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate("home")}>
                <Ionicons name="md-home-outline" size={24} color="#ffffff" />
                <Text style={styles.drawerItemText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate("console")}>
                <Ionicons name="terminal-outline" size={24} color="#ffffff" />
                <Text style={styles.drawerItemText}>Console</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate("chat")}>
                <MaterialIcons name="chat-bubble-outline" size={24} color="#ffffff" />
                <Text style={styles.drawerItemText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate("players")}>
                <Ionicons name="people-outline" size={24} color="#ffffff" />
                <Text style={styles.drawerItemText}>Player List</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate("bans")}>
                <Ionicons name="md-hammer-outline" size={24} color="#ffffff" />
                <Text style={styles.drawerItemText}>Server Bans</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.disconnectButton} onPress={handleDisconnect}>
                <Ionicons name="md-exit-outline" size={24} color="#ffffff" />
                <Text style={styles.drawerItemText}>Disconnect</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({

    separator: {

        borderBottomWidth: 1,

        borderBottomColor: "#9ca3af",

        marginVertical: 16

    },

    drawerTitle: {

        color: "#ffffff",

        fontWeight: "bold", 
        
        fontSize: 20

    },

    drawerItem: {

        display: "flex",

        flexDirection: "row",

        alignItems: "center",

        paddingVertical: 16

    },

    drawerItemText: {

        color: "#ffffff",

        fontWeight: "500",

        marginLeft: 16

    },

    disconnectButton: {

        borderColor: "#dc2626",

        borderWidth: 1,

        padding: 16,

        borderRadius: 8,

        display: "flex",

        flexDirection: "row",

        alignItems: "center",

        justifyContent: "center"

    }

});
