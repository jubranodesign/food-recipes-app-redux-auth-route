import './ListRecipes.css';
import Recipe from '../Recipe/Recipe';
import IRecipe from '../../model/IRecipe';
import { useSelector } from 'react-redux';

export default function ListRecipes() {

    const recipes: readonly IRecipe[] | undefined = useSelector(
        (state: any) => state.recipesReducer.recipes
    )

    if (recipes === null || recipes === undefined || recipes.length === 0) return (<div id="recipesMainDisplay"><h2>Choose Recipes Category from the Menu</h2></div>)

    return (
        <div id="recipesMainDisplay">
            {recipes.map((curr) => (<Recipe key={curr.idMeal} recipe={curr} />))}
        </div>
    )
}
