import { memo, useState } from "react";
import Dialog from "react-native-dialog";
import ServerPlayer from "@/types/ServerPlayer";

type BanDialogProps = {

    isVisible: boolean,

    closeDialog: () => void,

    playerInfo: ServerPlayer,

    sendRCONCommand: (command: string) => void

}

const BanDialog = memo(({ isVisible, closeDialog, playerInfo, sendRCONCommand }: BanDialogProps) => {

    const [reason, setReason] = useState("");

    function handleBan() {

        closeDialog();

        sendRCONCommand(`ban ${playerInfo.steamId} ${reason}`);

    }

    return (
        <Dialog.Container visible={isVisible} contentStyle={{ backgroundColor: "#0a0a0a", borderRadius: 10 }} onBackdropPress={closeDialog}>
            <Dialog.Title style={{ color: "#ffffff" }}>Ban Player</Dialog.Title>
            <Dialog.Description style={{ color: "#9ca3af" }}>Are you sure you want to ban this player?</Dialog.Description>
            <Dialog.Input
                placeholder="Reason"
                selectionColor="#9ca3af"
                placeholderTextColor="#9ca3af"
                cursorColor="#9ca3af"
                onChangeText={setReason}
            />
            <Dialog.Button label="Cancel" style={{ color: "#3b82f6" }} onPress={closeDialog} />
            <Dialog.Button label="Ban" style={{ color: "#3b82f6" }} onPress={handleBan} />
        </Dialog.Container>
    )

});

export default BanDialog;
