interface IPage<Type> {
    items: Type[];
    totalPages: number;
    currentPage: number
}

export default IPage;