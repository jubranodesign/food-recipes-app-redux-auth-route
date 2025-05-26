import { useContext, useState } from 'react'
import './Recipe.css';
import IRecipe from '../../model/IRecipe';
import AppContext from '../../contexts/AppContext';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import React from 'react';

interface RecipeProps {
    item: IRecipe;
    removeFn: (id: string) => void;
}

function Recipe({ item, removeFn }: RecipeProps) {
    const services = useContext(AppContext);
    const [visibleInstructions, setVisibleInstructions] = useState<string | null>(null);
    const navigate = useNavigate();
    const instructions = item.instructions
        .split(".")
        .map((str, index) => str.trim())  // Trim any leading/trailing spaces
        .filter((str) => str.length > 0); // Remove empty strings caused by consecutive periods

    const showDetailsRecipe = (idMeal: string): void => {
        setVisibleInstructions(prev => (prev === idMeal ? null : idMeal));
    }

    const removeRecipe = async (): Promise<void> => {
        if (window.confirm('Delete this Item?')) {
            await services?.recipeService.deleteItem(item._id);
            removeFn(item._id);
        }
    }

    return (
        <><div className='oneRecipeDiv'>
            <AiOutlineEdit className='edit' onClick={() => navigate(`/edit-recipe/${item._id}`, { state: { category: item.categoryId } })} />
            <AiOutlineDelete className='delete' onClick={removeRecipe} />
            <img src={item.urlImg}></img>
            <h3>{item.name}</h3>

            <div className='hideShowDiv'>
                <div className='header' onClick={() => showDetailsRecipe(item._id)}>
                    <p className='instructionTitle'>  {visibleInstructions === item._id ? 'Hide Instructions' : 'Show Instructions'}</p>
                    <span className="material-symbols-outlined">keyboard_double_arrow_down</span>
                </div>
                <div id={'instructions' + item._id}
                    className={visibleInstructions === item._id ? '' : 'hdn'}>

                    {instructions.map((instruction, index) => (
                        <p key={index}>{instruction}.</p>  // Add period back here
                    ))}

                </div>
            </div>
        </div>
        </>
    )
}

export default React.memo(Recipe);