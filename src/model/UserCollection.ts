export default interface UserCollection {
    cardId: number;
    userId: number;
    title: string;
    description?: string;
    cover?: string;
    collectionState?: number
}