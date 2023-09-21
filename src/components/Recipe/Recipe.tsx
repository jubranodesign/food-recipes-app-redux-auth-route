import { useContext, useEffect, useState } from 'react'
import './Recipe.css';
import IRecipe from '../../model/IRecipe';
import AppContext from '../../contexts/AppContext';
import { useQuery } from '@tanstack/react-query';

export default function Recipe(props: { recipe: IRecipe }) {
    const [idMeal, setIdMeal] = useState<number>(0);
    const services = useContext(AppContext);
    const [instructions, setInstructions] = useState<String>("");
    const { data: recipe } = useQuery(['recipe', idMeal], () => services?.foodService.getInstructionsByRecipe<any[]>(idMeal));

    useEffect(() => {
        const instructions = (recipe !== null) && (recipe !== undefined) && (recipe[0] !== undefined) ? recipe[0].strInstructions : '';
        setInstructions(instructions);
    }, [recipe])

    function showDetailsRecipe(e: any, idMeal: number) {
        const categoriesMenu = document.querySelector(`#instructions${idMeal}`) as HTMLElement;
        categoriesMenu.classList.toggle('hdn');
        let theTarget = e.target.parentNode.querySelector(".instructionTitle");

        if (theTarget.innerText.includes('Show')) {
            theTarget.innerText = 'Hide Instructions';
            setIdMeal(idMeal);
        }
        else {
            theTarget.innerText = 'Show Instructions';
        }
    }

    return (
        <><div className='oneRecipeDiv'>
            <img src={props.recipe.strMealThumb}></img>
            <h3>{props.recipe.strMeal}</h3>

            <div className='hideShowDiv'>
                <div className='header' onClick={(e) => showDetailsRecipe(e, props.recipe.idMeal)}>
                    <p className='instructionTitle'>Show Instructions</p>
                    <span className="material-symbols-outlined">keyboard_double_arrow_down</span>
                </div>
                <p id={'instructions' + props.recipe.idMeal} className='hdn'>
                    {instructions}
                </p>
            </div>
        </div>

        </>
    )
}
