
import './NewCategory.css';
import { useContext, useState } from 'react';
import AppContext from '../../contexts/AppContext';
import { RecipeType } from '../../model/RecipeType';
import Recipe from '../../model/Recipe';
import Food from '../../model/Food';
import { useQuery } from '@tanstack/react-query';

export default function NewCategory() {
    const services = useContext(AppContext);
    const [foodFormData, setFoodFormData] = useState<Food>({
        name: ''
    });
    const [recipeFormData, setRecipeFormData] = useState<Recipe>({
        categoryId: '',
        name: '',
        urlImg: '',
        instructions: ''
    });
    const { data: foods } = useQuery(['foods'], () => services?.foodService.getAll());

    function updateFoodFormData(e: React.FormEvent<HTMLInputElement>, str: "name") {
        setFoodFormData({ ...foodFormData, [str]: (e.target as HTMLInputElement).value });
    }

    function updateRecipeFormData(e: React.FormEvent<any>, str: RecipeType) {
        setRecipeFormData({ ...recipeFormData, [str]: (e.target as HTMLInputElement).value });
    }

    async function addNewFoodCategory() {

        if (foodFormData.name === '') {
            alert('Invalid Form, Food Category can not be empty');
            return;
        }

        await services?.foodService.addNewCategory(foodFormData!);
    }

    async function addNewRecipeByFoodCategory() {

        if (recipeFormData.categoryId === '') {
            alert('Invalid Form, Food Category can not be empty')
            return;
        }

        if (recipeFormData.name === '') {
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

        await services?.foodService.addNewRecipeByCategory(recipeFormData);
    }

    return (
        <>
            <div className="FormContainer">
                <div className="formItem">
                    <h3> add New Category</h3>
                </div>
                <div className="formItem">
                    <input type="text" onInput={(e) => { updateFoodFormData(e, "name"); }} placeholder="Food Category" />
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
                    <select onChange={(e) => { updateRecipeFormData(e, "categoryId"); }} >
                        <option value="">Choose Category</option>
                        {foods?.map((curr) => (<option key={curr._id} value={curr._id}>{curr.name}</option>))}
                    </select>
                </div>
                <div className="formItem">
                    <input type="text" onInput={(e) => { updateRecipeFormData(e, "name"); }} placeholder="name" />
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
