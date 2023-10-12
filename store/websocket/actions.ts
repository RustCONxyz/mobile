export const WEBSOCKET_CONNECT = "WEBSOCKET_CONNECT";
export const WEBSOCKET_DISCONNECT = "WEBSOCKET_DISCONNECT";
export const WEBSOCKET_SEND = "WEBSOCKET_SEND";

type ReduxWebSocketActions = typeof WEBSOCKET_CONNECT | typeof WEBSOCKET_DISCONNECT | typeof WEBSOCKET_SEND;

export default function buildWebSocketAction(action: ReduxWebSocketActions, payload?: any) {

    const base = {

        type: action,

        ...(payload instanceof Error ? { error: true } : null)

    }

    return payload ? { ...base, payload } : base;

}
