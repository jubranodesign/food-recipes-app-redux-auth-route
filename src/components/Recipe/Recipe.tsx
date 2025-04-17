import { useContext, useEffect, useState } from 'react'
import './Recipe.css';
import IRecipe from '../../model/IRecipe';
import AppContext from '../../contexts/AppContext';
import { useQuery } from '@tanstack/react-query';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import React from 'react';

interface RecipeProps {
    recipe: IRecipe;
    removeRecipeFn: (id: string) => void; // More precise than `Function`
}

function Recipe({ recipe, removeRecipeFn }: RecipeProps) {
    const services = useContext(AppContext);
    const [visibleInstructions, setVisibleInstructions] = useState<string | null>(null);
    const navigate = useNavigate();

    // const [idMeal, setIdMeal] = useState<string>();
    // const services = useContext(AppContext);
    // const [instructions, setInstructions] = useState<String>("");
    // const { data: recipe } = useQuery(['recipe', idMeal], () => services?.foodService.getRecipeById(idMeal));

    // useEffect(() => {
    //     const instructions = (recipe !== null) && (recipe !== undefined) && (recipe[0] !== undefined) ? recipe[0].strInstructions : '';
    //     setInstructions(instructions)
    // }, [recipe])

    const showDetailsRecipe = (idMeal: string): void => {
        setVisibleInstructions((prev) => (prev === idMeal ? null : idMeal));
    }

    const removeRecipe = async (): Promise<void> => {
        if (window.confirm('Delete this Item?')) {
            await services?.recipeService.deleteItem(recipe._id);
            removeRecipeFn(recipe._id);
        }
    }

    return (
        <><div className='oneRecipeDiv'>
            <AiOutlineEdit className='edit' onClick={() => navigate(`/edit-recipe/${recipe._id}`, { state: { category: recipe.categoryId } })} />
            <AiOutlineDelete className='delete' onClick={removeRecipe} />
            <img src={recipe.urlImg}></img>
            <h3>{recipe.name}</h3>

            <div className='hideShowDiv'>
                <div className='header' onClick={() => showDetailsRecipe(recipe._id)}>
                    <p className='instructionTitle'>  {visibleInstructions === recipe._id ? 'Hide Instructions' : 'Show Instructions'}</p>
                    <span className="material-symbols-outlined">keyboard_double_arrow_down</span>
                </div>
                <div id={'instructions' + recipe._id}
                    className={visibleInstructions === recipe._id ? '' : 'hdn'}>
                    {recipe.instructions.split(".").map((str, index) => <p key={index}>{str}.<br /><br /></p>)}
                </div>
            </div>
        </div>

        </>
    )
}

export default React.memo(Recipe);