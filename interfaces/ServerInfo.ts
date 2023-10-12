export default interface ServerInfo {

    hostname: string;

    players: number;

    maxPlayers: number;

    queued: number;

    joining: number;

    entityCount: number;

    gameTime: string;

    uptime: number;

    framerate: number;

    memory: number;

    collections: number;

    networkIn: number;

    networkOut: number;

    restarting: boolean;

    saveCreatedTime: string;

    history: ServerInfoHistory[];

}

export interface ServerInfoHistory {

    framerate: number;

    networkIn: number;

    networkOut: number;

    timestamp: number;

}
