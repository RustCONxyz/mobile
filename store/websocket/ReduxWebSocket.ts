import type { Dispatch, MiddlewareAPI } from "redux";
import { setIsConnected, setIsConnecting, setFailedToConnect } from "@/store/slices/websocket";
import { setServerInfo } from "@/store/slices/serverInfo";
import { setServerConsole, addConsoleOutput } from "@/store/slices/serverConsole";
import { setServerMapType, setServerMapSeed, setServerMapSize } from "@/store/slices/serverMap";
import { setServerChat, addServerChatMessage } from "@/store/slices/serverChat";
import { setOnlinePlayers } from "@/store/slices/serverPlayers";
import { setServerBans } from "@/store/slices/serverBans";
import { addSavedConnection } from "@/lib/storage";

export default class ReduxWebSocket {

    private websocket: WebSocket | null = null;

    private refreshTimer: NodeJS.Timeout | null = null;

    private pendingMessages: any[] = [];

    public connect = ({ dispatch }: MiddlewareAPI, { payload }: any) => {

        payload = JSON.parse(payload);

        this.close(dispatch);

        dispatch(setIsConnecting(true));
        dispatch(setFailedToConnect(false));

        this.websocket = new WebSocket(`ws://${payload.connection}/${payload.rconPassword}`);

        this.websocket.addEventListener("open", () => {

            this.handleOpen(dispatch);

            if (payload.saveInformation) {

                addSavedConnection(payload.connection, payload.rconPassword);

            }

        });

        this.websocket.addEventListener("message", (event) =>
            this.handleMessage(dispatch, event));

        this.websocket.addEventListener("error", (error) =>
            this.handleError(dispatch, error));

        this.websocket.addEventListener("close", () =>
            this.handleClose(dispatch));

    }

    public disconnect = ({ dispatch }: MiddlewareAPI) => {

        if (this.websocket) {

            this.close(dispatch);

        }

    }

    public send = ({ dispatch }: MiddlewareAPI, { payload }: any) => {

        payload = JSON.parse(payload);

        this.sendWebSocket(payload.command);

        if (!payload.printToConsole) return;

        dispatch(addConsoleOutput({

            type: "Command",

            message: payload.command,

            timestamp: new Date().getTime()

        }));

    }

    private sendWebSocket = (message: string, identifier: number = 9000) => {

        if (!this.websocket) return;

        if (this.websocket?.readyState === 1) {

            this.websocket.send(JSON.stringify({ Identifier: identifier, Message: message, Name: "RustCON" }));

        } else {

            this.pendingMessages.push({ identifier, message });

        }

    }

    private handleOpen = (dispatch: Dispatch) => {

        dispatch(setIsConnected(true));
        dispatch(setIsConnecting(false));

        this.sendWebSocket("serverinfo", 9001);

        this.sendWebSocket("playerlist", 9002);

        this.sendWebSocket("bans", 9003);

        this.sendWebSocket("serverinfo", 9004);

        this.sendWebSocket("server.seed", 9005);

        this.sendWebSocket("server.worldsize", 9006);

        this.sendWebSocket("chat.tail 512", 9007);

        this.sendWebSocket("console.tail 512", 9008);

        this.refreshTimer = setInterval(() => {

            if (this.websocket?.readyState === 3) {

                clearInterval(this.refreshTimer!);

                this.refreshTimer = null;

                return;

            }

            if (this.pendingMessages.length > 0) {

                this.pendingMessages.forEach(message => {

                    this.sendWebSocket(message.message, message.identifier);

                });

                this.pendingMessages = [];

            }

            this.sendWebSocket("serverinfo", 9001);

            this.sendWebSocket("playerlist", 9002);

            this.sendWebSocket("bans", 9003);

        }, 1000);

    }

    private handleMessage = (dispatch: Dispatch, event: MessageEvent) => {

        try {

            const message = JSON.parse(event.data);

            switch (message.Identifier) {

                case 9001:

                    dispatch(setServerInfo(JSON.parse(message.Message)));

                    break;

                case 9002:

                    const players = JSON.parse(message.Message).map((player: any) => {

                        return {

                            name: player.DisplayName,

                            steamId: player.SteamID,

                            health: player.Health,

                            address: player.Address.split(":")[0],

                            ping: player.Ping,

                            connectionTime: player.ConnectedSeconds

                        }

                    });

                    dispatch(setOnlinePlayers(players));

                    break;

                case 9003:

                    const bans = JSON.parse(message.Message).map((ban: any) => {

                        return {

                            playerName: ban.username,

                            playerId: ban.steamid,

                            reason: ban.notes,

                            expiry: ban.expiry,

                            group: ban.group

                        }

                    });

                    dispatch(setServerBans(bans));

                    break;

                case 9004:

                    const serverInfo = JSON.parse(message.Message);

                    dispatch(setServerMapType(serverInfo.Map));

                    break;

                case 9005:

                    const mapSeed = message.Message.match(/\d+/)[0];

                    dispatch(setServerMapSeed(mapSeed));

                    break;

                case 9006:

                    const mapSize = message.Message.match(/\d+/)[0];

                    dispatch(setServerMapSize(mapSize));

                    break;

                case 9007:

                    const filteredChat = JSON.parse(message.Message).filter((tailMessage: any) => !tailMessage.Message.startsWith("[\r\n") || tailMessage.Message == "[]" || tailMessage.Message == "");

                    const serverChat = filteredChat.map((tailMessage: any) => {

                        return {

                            content: tailMessage.Message,

                            playerName: tailMessage.Username,

                            playerId: tailMessage.UserId,

                            timestamp: new Date(tailMessage.Time).getTime()

                        }

                    });

                    dispatch(setServerChat(serverChat));

                    break;

                case 9008:

                    const filteredOutput = JSON.parse(message.Message).filter((tailMessage: any) => !tailMessage.Message.startsWith("[") || tailMessage.Message == "");

                    const consoleOutput = filteredOutput.map((tailMessage: any) => {

                        return {

                            type: tailMessage.Type,

                            message: tailMessage.Message,

                            timestamp: new Date(tailMessage.Time).getTime()

                        }

                    });

                    dispatch(setServerConsole(consoleOutput));

                    break;

                default:

                    if (message.Type === "Chat") {

                        const chatMessage = JSON.parse(message.Message);

                        dispatch(addServerChatMessage({

                            content: chatMessage.Message,

                            playerName: chatMessage.Username,

                            playerId: chatMessage.UserId,

                            timestamp: chatMessage.Time

                        }));

                        break;

                    }

                    if (message.Message === "" || message.Message.startsWith("[CHAT]")) break;

                    dispatch(addConsoleOutput({

                        type: message.Type,

                        message: message.Message,

                        timestamp: new Date().getTime()

                    }));

                    break;

            }

        } catch (error) {

            console.error(error);

        }

    }

    private handleError = (dispatch: Dispatch, error: Event) => {

        console.error(error);

        dispatch(setFailedToConnect(true));

        dispatch(setIsConnecting(false));

        this.close(dispatch);

    }

    private handleClose = (dispatch: Dispatch) => {

        dispatch(setIsConnecting(false));

        this.close(dispatch);

    }

    private close = (dispatch: Dispatch, code: number = 1000, reason?: string) => {

        if (this.websocket) {

            clearInterval(this.refreshTimer!);

            this.refreshTimer = null;

            dispatch(setIsConnected(false));

            this.pendingMessages = [];

            this.websocket.close(code, reason);

            this.websocket = null;

        }

    }

}
