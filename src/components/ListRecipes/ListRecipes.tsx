import './ListRecipes.css';
import IRecipe from '../../model/IRecipe';
import { useSelector } from 'react-redux';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Recipe from '../Recipe/Recipe';
import ILazy from '../../model/ILazy';
import IPage from '../../model/IPage';
import AppContext from '../../contexts/AppContext';
import { useQuery } from '@tanstack/react-query';

export default function ListRecipes() {
    const services = useContext(AppContext);
    const [recipesLazy, setRecipesLazy] = useState<IRecipe[]>([]);
    const [categoryId, setCategoryId] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const recipes: IPage<IRecipe> = useSelector(
        (state: any) => state.recipesReducer.recipes
    )
    const { data: moreRecipes, refetch } = useQuery(['recipes', categoryId, page], () => services?.recipeService.getItemsByCategoryPage(categoryId, page.toString(), '9'));
    const prevRef = useRef<IPage<IRecipe>>();

    useEffect(() => {
        if (recipes !== undefined) {
            setPage(1);
            setCategoryId('');
            setRecipesLazy(recipes.items);
        }
    }, [recipes])

    useEffect(() => {
        if (moreRecipes !== undefined) {

            if (moreRecipes.currentPage === moreRecipes.totalPages) {
                refetch();
            }

            const newItems = moreRecipes?.items.slice();
            let selectedItems: IRecipe[] = [];

            if (prevRef.current?.items[0] === moreRecipes?.items[0]) {
                newItems.splice(0, prevRef.current?.items.length);
                selectedItems = newItems;
            } else {
                selectedItems = moreRecipes.items;
            }

            setRecipesLazy((prev) => prev.concat(selectedItems));

            prevRef.current = moreRecipes;

        }
    }, [moreRecipes])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [recipes, moreRecipes])

    const handleScroll = (): void => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
            return;
        }
        loadMore();
    }

    const loadMore = (): void => {
        if (recipes !== undefined && recipes.items[0].categoryId !== categoryId) {
            setCategoryId(recipes.items[0].categoryId);
        }

        if (page <= recipes.totalPages) {
            setPage(prevPage => prevPage + 1);
        }
    }

    const removeRecipe = useCallback((id: string) => {
        // required improvement
        setRecipesLazy(
            recipesLazy.filter((recipeLazy) => {
                return recipeLazy._id !== id;
            })
        );
    }, []);

    // const [recipesLazy, setRecipesLazy] = useState<ILazy>({
    //     items: [],
    //     startPage: 0,
    //     range: 10
    // });

    // useEffect(() => {
    //     if (recipes?.length !== 0) {
    //         setRecipesLazy({
    //             items: initializeItems(),
    //             startPage: 7,
    //             range: 10
    //         });
    //     }
    // }, [recipes])

    // function initializeItems() {
    //     const temp: IRecipe[] = []
    //     let maxRow = recipes!.length < 7 ? recipes!.length : 7;
    //     for (let i = 0; i < maxRow; i++) {
    //         temp.push(recipes![i]);
    //     }
    //     return temp;
    // }

    // function loadMore() {
    //     for (let i = recipesLazy.startPage; (i < recipesLazy.startPage + recipesLazy.range) && (recipesLazy.startPage + recipesLazy.range <= recipes!.length); i++) {
    //         recipesLazy.items.push(recipes![i]);
    //     }
    //     setRecipesLazy({
    //         items: recipesLazy.items,
    //         startPage: recipesLazy.items.length,
    //         range: 10
    //     });

    //     if (recipesLazy.startPage + recipesLazy.range > recipes!.length) {
    //         setRecipesLazy({ ...recipesLazy, range: recipes!.length - recipesLazy.startPage });
    //     }
    // }

    if (recipesLazy === null || recipesLazy === undefined || recipesLazy.length === 0) return (<div id="recipesMainDisplay"><h2>Choose Recipes Category from the Menu</h2></div>)

    return (
        <div id="recipesMainDisplay">
            {recipesLazy.map((curr) => (<Recipe key={curr._id} recipe={curr} removeRecipeFn={removeRecipe} />))}
        </div>
    )
}
