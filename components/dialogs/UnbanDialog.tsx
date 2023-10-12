import { memo } from "react";
import Dialog from "react-native-dialog";
import ServerBan from "../../interfaces/ServerBan";

type UnbanDialogProps = {

    isVisible: boolean,

    closeDialog: () => void,

    serverBan: ServerBan,

    sendRCONCommand: (command: string) => void

}

const UnbanDialog = memo(({ isVisible, closeDialog, serverBan, sendRCONCommand }: UnbanDialogProps) => {

    function handleUnban() {

        closeDialog();

        sendRCONCommand(`unban ${serverBan.playerId}`);

    }

    return (
        <Dialog.Container visible={isVisible} contentStyle={{ backgroundColor: "#0a0a0a", borderRadius: 10 }} onBackdropPress={closeDialog}>
            <Dialog.Title style={{ color: "#ffffff" }}>Unban Player</Dialog.Title>
            <Dialog.Description style={{ color: "#9ca3af" }}>Are you sure you want to unban this player?</Dialog.Description>
            <Dialog.Button label="Cancel" style={{ color: "#3b82f6" }} onPress={closeDialog} />
            <Dialog.Button label="Unban" style={{ color: "#3b82f6" }} onPress={handleUnban} />
        </Dialog.Container>
    )

});

export default UnbanDialog;
