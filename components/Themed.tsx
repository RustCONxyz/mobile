import { Text as DefaultText, TextInput as DefaultTextInput, View as DefaultView, Switch as DefaultSwitch } from "react-native";
import { Link as DefaultLink } from "expo-router";
import type { LinkProps } from "expo-router/build/link/Link";

export function Text(props: DefaultText["props"]) {

    return <DefaultText className="text-white font-medium" {...props} />

}

export function TextInput(props: DefaultTextInput["props"]) {

    return <DefaultTextInput
        className="w-full py-3 px-6 bg-zinc-900 border-2 border-gray-400 rounded-md text-white text-center"
        selectionColor="#9ca3af"
        placeholderTextColor="#9ca3af"
        cursorColor="#9ca3af"
        {...props}
    />

}

export function NumberInput(props: DefaultTextInput["props"]) {

    return <TextInput keyboardType="number-pad" {...props} />

}

export function PasswordInput(props: DefaultTextInput["props"]) {

    return <TextInput secureTextEntry={true} autoCapitalize="none" {...props} />

}

export function PasswordNumberInput(props: DefaultTextInput["props"]) {

    return <NumberInput secureTextEntry={true} {...props} />

}

export function Separator(props: DefaultView["props"]) {

    return <DefaultView className="border-b border-gray-400" {...props} />

}

export function Switch(props: DefaultSwitch["props"]) {

    return <DefaultSwitch
        thumbColor="#9ca3af"
        trackColor={{ false: "#0a0a0a", true: "#3b82f6" }}
        {...props}
    />

}

export function Link(props: LinkProps) {

    return <DefaultLink className="text-white font-medium" {...props} />

}
