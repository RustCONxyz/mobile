import { memo, useState } from "react";
import Dialog from "react-native-dialog";
import ServerPlayer from "../../interfaces/ServerPlayer";

type KickDialogProps = {

    isVisible: boolean,

    closeDialog: () => void,

    playerInfo: ServerPlayer,

    sendRCONCommand: (command: string) => void

}

const KickDialog = memo(({ isVisible, closeDialog, playerInfo, sendRCONCommand }: KickDialogProps) => {

    const [reason, setReason] = useState("");

    function handleKick() {

        closeDialog();

        sendRCONCommand(`kick ${playerInfo.steamId} ${reason}`);

    }

    return (
        <Dialog.Container visible={isVisible} contentStyle={{ backgroundColor: "#0a0a0a", borderRadius: 10 }} onBackdropPress={closeDialog}>
            <Dialog.Title style={{ color: "#ffffff" }}>Kick Player</Dialog.Title>
            <Dialog.Description style={{ color: "#9ca3af" }}>Are you sure you want to kick this player?</Dialog.Description>
            <Dialog.Input
                placeholder="Reason"
                selectionColor="#9ca3af"
                placeholderTextColor="#9ca3af"
                cursorColor="#9ca3af"
                onChangeText={setReason}
            />
            <Dialog.Button label="Cancel" style={{ color: "#3b82f6" }} onPress={closeDialog} />
            <Dialog.Button label="Kick" style={{ color: "#3b82f6" }} onPress={handleKick} />
        </Dialog.Container>
    )

});

export default KickDialog;
