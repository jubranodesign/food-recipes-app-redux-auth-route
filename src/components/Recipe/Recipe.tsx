import { useContext, useEffect, useState } from 'react'
import './Recipe.css';
import IRecipe from '../../model/IRecipe';
import AppContext from '../../contexts/AppContext';
import { useQuery } from '@tanstack/react-query';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export default function Recipe(props: { recipe: IRecipe, removeRecipeFn: Function }) {
    const services = useContext(AppContext);
    // const [idMeal, setIdMeal] = useState<string>();
    // const services = useContext(AppContext);
    // const [instructions, setInstructions] = useState<String>("");
    // const { data: recipe } = useQuery(['recipe', idMeal], () => services?.foodService.getRecipeById(idMeal));

    // useEffect(() => {
    //     const instructions = (recipe !== null) && (recipe !== undefined) && (recipe[0] !== undefined) ? recipe[0].strInstructions : '';
    //     setInstructions(instructions)
    // }, [recipe])

    const navigate = useNavigate();

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

    async function removeRecipe() {
        if (window.confirm('Delete this Item?')) {
            await services?.recipeService.deleteItem(props.recipe._id);
            props.removeRecipeFn(props.recipe._id);
        }
    }

    return (
        <><div className='oneRecipeDiv'>
            <AiOutlineEdit className='edit' onClick={() => navigate(`/edit-recipe/${props.recipe._id}`, { state: { category: props.recipe.categoryId } })} />
            <AiOutlineDelete className='delete' onClick={removeRecipe} />
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
