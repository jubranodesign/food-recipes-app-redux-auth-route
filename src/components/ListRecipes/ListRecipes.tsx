import './ListRecipes.css';
import IRecipe from '../../model/IRecipe';
import { useSelector } from 'react-redux';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Recipe from '../Recipe/Recipe';
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
    const pageRef = useRef(page);

    useQuery(
        ['recipes', categoryId, page],
        () => services?.recipeService.getItemsByCategoryPage(categoryId, page.toString(), '9'),
        {
            enabled: !!categoryId,
            onSuccess: (moreRecipes) => {
                if (moreRecipes?.items) {
                    if (pageRef.current === 1) {
                        setRecipesLazy(moreRecipes.items);
                    } else {
                        setRecipesLazy(prev => prev.concat(moreRecipes.items));
                    }
                }
            }
        }
    );

    useEffect(() => {
        if (recipes !== undefined) {
            setPage(1);
            setRecipesLazy(recipes.items);
            if (recipes.items.length > 0) {
                setCategoryId(recipes.items[0].categoryId);
            }
        }
    }, [recipes])

    useEffect(() => {
        pageRef.current = page;
    }, [page]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [recipes])

    const loadMore = (): void => {
        if (pageRef.current <= recipes.totalPages) {
            setPage(prevPage => prevPage + 1);
        }
    }

    const handleScroll = useCallback((): void => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
            return;
        }
        loadMore();
    }, [recipes]);

    const removeRecipe = useCallback((id: string) => {
        setRecipesLazy(prev => prev.filter(recipe => recipe._id !== id));
    }, []);

    if (recipesLazy === null || recipesLazy === undefined || recipesLazy.length === 0) return (<div id="recipesMainDisplay"><h2>Choose Recipes Category from the Menu</h2></div>)

    return (
        <div id="recipesMainDisplay">
            {recipesLazy.map((curr) => (<Recipe key={curr._id} recipe={curr} removeRecipeFn={removeRecipe} />))}
        </div>
    )
}


