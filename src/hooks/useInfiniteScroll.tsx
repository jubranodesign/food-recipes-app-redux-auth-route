import { useCallback, useEffect, useRef, useState } from "react";
import IPage from "../model/IPage";
import { useQuery } from "@tanstack/react-query";
import useScrollListener from "./useScrollListener";

type UseInfiniteProps<T> = {
    fetchFn: (categoryId: string, page: string) => Promise<IPage<T>> | undefined;
    category: string;
    initialItems: IPage<T>;
};

function useInfinite<T>({
    fetchFn,
    category,
    initialItems,
}: UseInfiniteProps<T>) {

    const [itemsLazy, setItemsLazy] = useState<T[]>([]);
    const [categoryId, setCategoryId] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const pageRef = useRef(page);
    const loadMore = useCallback(() => {
        if (pageRef.current <= initialItems.totalPages) {
            setPage(prev => prev + 1);
        }
    }, [initialItems]);

    useScrollListener(loadMore);

    const { isLoading, isError } = useQuery(
        ['recipes', categoryId, page],
        () => fetchFn(categoryId, page.toString()),
        {
            enabled: !!categoryId,
            onSuccess: (moreItems) => {
                if (moreItems?.items && pageRef.current > 1) {
                    setItemsLazy(prev => prev.concat(moreItems.items));
                }
            }
        }
    );

    useEffect(() => {
        if (initialItems) {
            setPage(1);
            setItemsLazy(initialItems.items);
            if (initialItems.items.length > 0) {
                setCategoryId(category);
            }
        }
    }, [initialItems]);

    useEffect(() => {
        pageRef.current = page;
    }, [page]);


    return { itemsLazy, setItemsLazy, isLoading, isError };
}

export default useInfinite;
