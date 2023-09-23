
export interface IListService<Type> {
    getAll(): Promise<Type>
}