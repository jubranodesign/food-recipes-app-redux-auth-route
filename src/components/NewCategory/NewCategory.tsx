
import './NewCategory.css';
import { useContext, useState } from 'react';
import AppContext from '../../contexts/AppContext';
import { RecipeType } from '../../model/RecipeType';
import IRecipe_ from '../../model/IRecipe_';

export default function NewCategory() {
    const services = useContext(AppContext);
    const [foodFormData, setFoodFormData] = useState<string>('');
    const [recipeFormData, setRecipeFormData] = useState<IRecipe_>({
        nameCategory: '',
        nameRecipe: '',
        urlImg: '',
        instructions: ''
    });

    function updateFoodFormData(e: React.FormEvent<HTMLInputElement>,) {
        setFoodFormData((e.target as HTMLInputElement).value);
    }

    function updateRecipeFormData(e: React.FormEvent<any>, str: RecipeType) {
        setRecipeFormData({ ...recipeFormData, [str]: (e.target as HTMLInputElement).value });
    }

    async function addNewFoodCategory() {

        if (foodFormData === '') {
            alert('Invalid Form, Food Category can not be empty');
            return;
        }

        //await services?.foodService.addNewFoodCategory<string>(foodFormData);
    }

    async function addNewRecipeByFoodCategory() {

        if (recipeFormData.nameCategory === '') {
            alert('Invalid Form, Food Category can not be empty')
            return;
        }

        if (recipeFormData.nameRecipe === '') {
            alert('Invalid Form, Recipe Name can not be empty')
            return;
        }

        if (recipeFormData.urlImg === '') {
            alert('Invalid Form, url Img can not be empty')
            return;
        }

        if (recipeFormData.instructions === '') {
            alert('Invalid Form, instructions can not be empty')
            return;
        }

        // await services?.foodService.addNewRecipeByFoodCategory<IRecipe_>(recipeFormData);
    }

    return (
        <>
            <div className="FormContainer">
                <div className="formItem">
                    <h3> add New Category</h3>
                </div>
                <div className="formItem">
                    <input type="text" onInput={(e) => { updateFoodFormData(e); }} placeholder="Food Category" />
                </div>
                <div className="formItem">
                    <input className="Login" type="button" onClick={addNewFoodCategory} value="add New Category" />
                </div>
            </div>

            <div className="FormContainer">
                <div className="formItem">
                    <h3> add New Recipe by Category</h3>
                </div>
                <div className="formItem">
                    <input type="text" onInput={(e) => { updateRecipeFormData(e, "nameCategory"); }} placeholder="Category Food name" />
                </div>
                <div className="formItem">
                    <input type="text" onInput={(e) => { updateRecipeFormData(e, "nameRecipe"); }} placeholder="name" />
                </div>
                <div className="formItem">
                    <input type="text" onInput={(e) => { updateRecipeFormData(e, "urlImg"); }} placeholder="url Img" />
                </div>
                <div className="formItem">
                    <textarea onInput={(e) => { updateRecipeFormData(e, "instructions"); }} placeholder="instructions" />
                </div>
                <div className="formItem">
                    <input className="Login" type="button" onClick={addNewRecipeByFoodCategory} value="add New Recipe" />
                </div>
            </div>
        </>
    )
}
