
export interface IListService<IType, Type> {
    getAllItems(): Promise<IType[]>
    getItem(id: string): Promise<IType>
    addItem(payload: Type): Promise<IType>
    updateItem(id: string, payload: Type): Promise<IType>
    deleteItem(id: string): Promise<string>
}