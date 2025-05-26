import './List.css';
import { useCallback } from 'react';
import useInfinite from '../../hooks/useInfiniteScroll';
import IPage from '../../model/IPage';

interface ListProps<T> {
    fetchFn: (page: string, categoryId?: string) => Promise<IPage<T>> | undefined;
    RenderItem: React.FC<{ item: T; removeFn: (id: string) => void }>;
    category?: string;
}

export default function List<T>({ fetchFn, RenderItem, category }: ListProps<T>) {

    const { itemsLazy, setItemsLazy } = useInfinite<T>({
        fetchFn: fetchFn,
        category: category
    });

    const removeItem = useCallback((id: string): void => {
        setItemsLazy(prev => prev.filter(item => (item as any)._id !== id));
    }, []);

    if (itemsLazy === null || itemsLazy === undefined || itemsLazy.length === 0) return (<div id="recipesMainDisplay"><h2>Choose Category from the Menu</h2></div>)

    return (
        <div id="recipesMainDisplay">
            {itemsLazy.map((curr) => (
                <RenderItem key={(curr as any)._id} item={curr} removeFn={removeItem} />
            ))}
        </div>
    )
}