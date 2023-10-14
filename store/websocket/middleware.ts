import type { Middleware, MiddlewareAPI } from "redux";
import ReduxWebSocket from "@/store/websocket/ReduxWebSocket";
import * as websocketActions from "@/store/websocket/actions";

export default (): Middleware => {

    const reduxWebsocket = new ReduxWebSocket();

    const handlers = new Map<string, (store: MiddlewareAPI, action: any) => void>([

        [websocketActions.WEBSOCKET_CONNECT, reduxWebsocket.connect],

        [websocketActions.WEBSOCKET_DISCONNECT, reduxWebsocket.disconnect],

        [websocketActions.WEBSOCKET_SEND, reduxWebsocket.send]

    ]);

    return (store: MiddlewareAPI) => (next) => (action: any) => {

        const { type: actionType } = action;

        if (actionType) {

            const handler = handlers.get(actionType);

            if (handler) {

                try {

                    handler(store, action);

                } catch (error) {

                    console.error(error);

                }

            }

        }

        return next(action);

    }

}
