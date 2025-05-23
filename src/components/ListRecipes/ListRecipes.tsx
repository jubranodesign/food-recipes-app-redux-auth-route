import './ListRecipes.css';
import IRecipe from '../../model/IRecipe';
import { useSelector } from 'react-redux';
import { useCallback, useContext } from 'react';
import Recipe from '../Recipe/Recipe';
import AppContext from '../../contexts/AppContext';
import useInfinite from '../../hooks/useInfiniteScroll';
import IPage from '../../model/IPage';

export default function ListRecipes() {
    const services = useContext(AppContext);
    const category: string = useSelector(
        (state: any) => state.categoryReducer.category
    )

    const { itemsLazy, setItemsLazy } = useInfinite<IRecipe>({
        fetchFn: (page, categoryId) => {
            if (categoryId) {
                return services?.recipeService.getItemsByCategoryPage(categoryId, page.toString(), '9');
            }
            return Promise.resolve<IPage<IRecipe>>({ items: [], currentPage: 0, totalPages: 0 });
        },
        category: category
    });

    const removeRecipe = useCallback((id: string): void => {
        setItemsLazy(prev => prev.filter(recipe => recipe._id !== id));
    }, []);

    if (itemsLazy === null || itemsLazy === undefined || itemsLazy.length === 0) return (<div id="recipesMainDisplay"><h2>Choose Recipes Category from the Menu</h2></div>)

    return (
        <div id="recipesMainDisplay">
            {itemsLazy.map((curr) => (<Recipe key={curr._id} recipe={curr} removeRecipeFn={removeRecipe} />))}
        </div>
    )
}