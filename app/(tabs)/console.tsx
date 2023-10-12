import { View, FlatList, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState, useRef, useCallback } from "react";
import { Text, TextInput } from "../../components/Themed";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { selectServerConsole } from "../../store/slices/serverConsole";
import buildWebSocketAction from "../../store/websocket/actions";
import * as websocketActions from "../../store/websocket/actions";

type ConsoleInputProps = { onSubmit: (inputText: string) => void, onFocus: () => void };

function ConsoleInput({ onSubmit, onFocus }: ConsoleInputProps) {

    const [inputText, setInputText] = useState("");

    function handleSubmit() {

        if (inputText == "") return;

        onSubmit(inputText);

        setInputText("");

    }

    return (
        <View className="flex flex-row justify-between items-center">
            <TextInput
                className="flex-1 bg-zinc-900 rounded-md text-left"
                placeholder="Send Command"
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={handleSubmit}
                onFocus={onFocus}
            />
            <TouchableOpacity className="mx-4" onPress={handleSubmit}>
                <Feather name="send" size={32} color="#9ca3af" />
            </TouchableOpacity>
        </View>
    )

}

export default function ConsoleScreen() {

    const flatListRef = useRef<FlatList>(null);

    const dispatch = useAppDispatch();

    const consoleOutput = useAppSelector(selectServerConsole);

    const handleContentSizeChange = useCallback(() => {

        if (flatListRef.current == null || consoleOutput.length == 0) return;

        flatListRef.current.scrollToEnd({ animated: true });

    }, [consoleOutput.length]);

    const sendRCONCommand = useCallback((inputText: string) =>
        dispatch(buildWebSocketAction(websocketActions.WEBSOCKET_SEND, JSON.stringify({ command: inputText, printToConsole: true }))), [dispatch]);

    const renderItem = useCallback(({ item, index }: { item: typeof consoleOutput[number], index: number }) => {

        let textColor;

        switch (item.type) {
            case "Error":
                textColor = "text-red-500";
                break;
            case "Warning":
                textColor = "text-yellow-300";
                break;
            case "Command":
                textColor = "text-blue-400";
                break;
            default:
                textColor = "text-white";
                break;
        }

        return (
            <View key={index} className="pt-2">
                <Text className={textColor}>
                    {item.message}
                </Text>
            </View>
        )

    }, []);

    return (
        <View className="h-full bg-neutral-950 pt-2 p-4">
            <FlatList
                ref={flatListRef}
                data={consoleOutput}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                onLayout={handleContentSizeChange}
                onContentSizeChange={handleContentSizeChange}
                className="mb-4 flex-1 w-full"
                showsVerticalScrollIndicator={false}
            />
            <ConsoleInput onSubmit={sendRCONCommand} onFocus={handleContentSizeChange} />
        </View>
    )

}
