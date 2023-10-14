import { View, FlatList, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState, useRef, useCallback } from "react";
import { Text, TextInput, Separator } from "@/components/Themed";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectServerChat } from "@/store/slices/serverChat";
import buildWebSocketAction from "@/store/websocket/actions";
import * as websocketActions from "@/store/websocket/actions";

type ChatInputProps = { onSubmit: (inputText: string) => void, onFocus: () => void };

function ChatInput({ onSubmit, onFocus }: ChatInputProps) {

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
                placeholder="Send Message"
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

export default function ChatScreen() {

    const flatListRef = useRef<FlatList>(null);

    const dispatch = useAppDispatch();

    const chatMessages = useAppSelector(selectServerChat);

    const handleContentSizeChange = useCallback(() => {

        if (flatListRef.current == null || chatMessages.length == 0) return;

        flatListRef.current.scrollToEnd({ animated: true });

    }, [chatMessages.length]);

    const handleSubmit = useCallback((inputText: string) =>
        dispatch(buildWebSocketAction(websocketActions.WEBSOCKET_SEND, JSON.stringify({ command: `global.say ${inputText}`, printToConsole: false }))), [dispatch]);

    const renderItem = useCallback(({ item, index }: { item: typeof chatMessages[number], index: number }) => (
        <View className="mt-2 w-full bg-zinc-900 rounded-md p-4" key={index}>
            <Text className={`text-${item.playerName === "SERVER" ? "blue-400" : "white"} font-medium`}>
                {item.playerName}
            </Text>
            <Separator className="my-2" />
            <Text>{item.content}</Text>
        </View>
    ), []);

    return (
        <View className="h-full bg-neutral-950 pt-2 p-4">
            <FlatList
                ref={flatListRef}
                data={chatMessages}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                onLayout={handleContentSizeChange}
                onContentSizeChange={handleContentSizeChange}
                className="mb-4 flex-1 w-full"
                showsVerticalScrollIndicator={false}
            />
            <ChatInput onSubmit={handleSubmit} onFocus={handleContentSizeChange} />
        </View>
    )

}
