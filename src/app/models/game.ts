export interface Game {
    id: string;
    categories: string[];
    name: string;
    image: string;
    group: string;
}

export function createGame(params: Partial<Game>) {
    return {
        ...params,
        group: params.name
    } as Game;
}