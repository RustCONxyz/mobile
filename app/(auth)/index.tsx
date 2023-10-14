import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import { CheckBox } from "@rneui/themed";
import { Text, PasswordInput, NumberInput, Separator } from "@/components/Themed";
import FailedToConnect from "@/components/FailedToConnect";
import SavedConnectionsModal from "@/components/modals/SavedConnectionsModal";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectIsConnecting } from "@/store/slices/websocket";
import buildWebSocketAction from "@/store/websocket/actions";
import * as websocketActions from "@/store/websocket/actions";

const formDefaultValues = { serverIP: "", rconPort: "", rconPassword: "", saveInformation: false };

export default function LoginScreen() {

    const { statusbarHeight } = useWindowDimensions();

    const [isSavedConnectionsModalVisible, setSavedConnectionsModalVisible] = useState(false);

    const { handleSubmit, control } = useForm({ defaultValues: formDefaultValues });

    const dispatch = useAppDispatch();

    const isConnecting = useAppSelector(selectIsConnecting);

    const onSubmit = (data: typeof formDefaultValues) => handleConnect(`${data.serverIP}:${data.rconPort}`, data.rconPassword, data.saveInformation);

    function handleConnect(connection: string, rconPassword: string, saveInformation: boolean = false) {

        if (isConnecting) return;

        const payload = { connection, rconPassword, saveInformation };

        dispatch(buildWebSocketAction(websocketActions.WEBSOCKET_CONNECT, JSON.stringify(payload)));

    }

    return (
        <View className="relative h-full bg-neutral-950" style={{ paddingBottom: statusbarHeight }}>
            <FailedToConnect />
            <SavedConnectionsModal
                isVisible={isSavedConnectionsModalVisible}
                closeModal={() => setSavedConnectionsModalVisible(false)}
                handleConnect={handleConnect}
            />
            <View className="absolute top-6 right-6">
                <Link href="/settings" className="m-0 p-0">
                    <MaterialIcons name="settings" size={24} className="m-0 p-0" color="#ffffff" />
                </Link>
            </View>
            <View className="m-auto w-full">
                <View className="flex flex-row justify-center items-center mb-12">
                    <Image source={require("@/assets/images/logo.png")} className="w-12 h-12 mr-6" />
                    <Text className="text-center text-3xl font-bold">RustCON</Text>
                </View>
                <View className="px-12">
                    <Text className="mb-2 font-semibold">Server IP</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) =>
                            <NumberInput className="mb-6" onBlur={onBlur} onChangeText={value => onChange(value)} value={value} editable={!isConnecting} />
                        }
                        name="serverIP"
                        rules={{ required: true, pattern: { value: /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/, message: "Invalid IP Address" } }}
                    />
                    <Text className="mb-2 font-semibold">RCON Port</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) =>
                            <NumberInput className="mb-6" onBlur={onBlur} onChangeText={value => onChange(value)} value={value} editable={!isConnecting} />
                        }
                        name="rconPort"
                        rules={{ required: true }}
                    />
                    <Text className="mb-2 font-semibold">RCON Password</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) =>
                            <PasswordInput className="mb-6" onBlur={onBlur} onChangeText={value => onChange(value)} value={value} editable={!isConnecting} />
                        }
                        name="rconPassword"
                        rules={{ required: true }}
                    />
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) =>
                            <CheckBox
                                title="Save Connection Details"
                                containerStyle={{ backgroundColor: "none", margin: 0, marginLeft: 0, padding: 0, borderWidth: 0 }}
                                wrapperStyle={{ margin: 0, padding: 0, borderWidth: 0 }}
                                textStyle={{ color: "#ffffff", margin: 0, padding: 0, borderWidth: 0 }}
                                uncheckedColor="#9ca3af"
                                uncheckedIcon={<MaterialIcons name="check-box-outline-blank" size={24} color="#9ca3af" />}
                                checkedColor="#3b82f6"
                                checkedIcon={<MaterialIcons name="check-box" size={24} color="#3b82f6" />}
                                onBlur={onBlur}
                                onPress={() => onChange(!value)}
                                checked={value}
                                disabled={isConnecting}
                            />
                        }
                        name="saveInformation"
                        rules={{ required: false }}
                    />
                </View>
                <View className="my-6 px-6">
                    <Separator />
                </View>
                <View className="px-12">
                    <TouchableOpacity onPress={handleSubmit(onSubmit)} className="mb-6 bg-zinc-900 border border-blue-500 py-3 px-6 rounded-md">
                        <Text className="text-center font-semibold">Connect</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSavedConnectionsModalVisible(true)} className="bg-zinc-900 py-3 px-6 rounded-md">
                        <Text className="text-center font-semibold">Saved Connections</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

}
