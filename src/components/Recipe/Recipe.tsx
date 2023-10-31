import { useContext, useEffect, useState } from 'react'
import './Recipe.css';
import IRecipe from '../../model/IRecipe';
import AppContext from '../../contexts/AppContext';
import { useQuery } from '@tanstack/react-query';

export default function Recipe(props: { recipe: IRecipe }) {
    // const [idMeal, setIdMeal] = useState<string>();
    // const services = useContext(AppContext);
    // const [instructions, setInstructions] = useState<String>("");
    // const { data: recipe } = useQuery(['recipe', idMeal], () => services?.foodService.getRecipeById(idMeal));

    // useEffect(() => {
    //     const instructions = (recipe !== null) && (recipe !== undefined) && (recipe[0] !== undefined) ? recipe[0].strInstructions : '';
    //     setInstructions(instructions)
    // }, [recipe])

    function showDetailsRecipe(e: any, idMeal: string) {
        const categoriesMenu = document.querySelector(`#instructions${idMeal}`) as HTMLElement;
        categoriesMenu.classList.toggle('hdn');
        let theTarget = e.target.parentNode.querySelector(".instructionTitle");

        if (theTarget.innerText.includes('Show')) {
            theTarget.innerText = 'Hide Instructions';
            // setIdMeal(idMeal);
        }
        else {
            theTarget.innerText = 'Show Instructions';
        }
    }

    return (
        <><div className='oneRecipeDiv'>
            <img src={props.recipe.urlImg}></img>
            <h3>{props.recipe.name}</h3>

            <div className='hideShowDiv'>
                <div className='header' onClick={(e) => showDetailsRecipe(e, props.recipe._id)}>
                    <p className='instructionTitle'>Show Instructions</p>
                    <span className="material-symbols-outlined">keyboard_double_arrow_down</span>
                </div>
                <div id={'instructions' + props.recipe._id} className='hdn'>
                    {props.recipe.instructions.split(".").map((str, index) => <p key={index}>{str}.<br /><br /></p>)}
                </div>
            </div>
        </div>

        </>
    )
}
