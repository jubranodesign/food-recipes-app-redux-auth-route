import { useCallback, useEffect, useRef, useState } from "react";
import IPage from "../model/IPage";
import { useQuery } from "@tanstack/react-query";
import useScrollListener from "./useScrollListener";

type UseInfiniteProps<T> = {
    fetchFn: (categoryId: string, page: string) => Promise<IPage<T>> | undefined;
    category: string;
};

function useInfinite<T>({
    fetchFn,
    category
}: UseInfiniteProps<T>) {

    const [itemsLazy, setItemsLazy] = useState<T[]>([]);
    const [categoryId, setCategoryId] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const pageRef = useRef(page);
    const loadMore = useCallback(() => {
        if (pageRef.current <= totalPages) {
            setPage(prev => prev + 1);
        }
    }, [totalPages]);

    useScrollListener(loadMore);

    const { isLoading, isError } = useQuery(
        ['recipes', categoryId, page],
        () => fetchFn(categoryId, page.toString()),
        {
            enabled: !!categoryId,
            onSuccess: (moreItems) => {
                if (moreItems?.items) {
                    if (totalPages === 0) {
                        setTotalPages(moreItems.totalPages)
                    }
                    setItemsLazy(prev => prev.concat(moreItems.items));
                }
            }
        }
    );

    useEffect(() => {
        setPage(1);
        setCategoryId(category);
        setTotalPages(0);
        setItemsLazy([])
    }, [category]);

    useEffect(() => {
        pageRef.current = page;
    }, [page]);


    return { itemsLazy, setItemsLazy, isLoading, isError };
}

export default useInfinite;
