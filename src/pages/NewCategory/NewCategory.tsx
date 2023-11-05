
import './NewCategory.css';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../../contexts/AppContext';
import { RecipeType } from '../../model/RecipeType';
import Recipe from '../../model/Recipe';
import Food from '../../model/Food';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function NewCategory() {
    const services = useContext(AppContext);
    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname;
    const { id } = useParams();
    const [foodId, setFoodId] = useState<string>();
    const [recipeId, setRecipeId] = useState<string>();
    const [foodFormData, setFoodFormData] = useState<Food>({
        name: ''
    });
    const [recipeFormData, setRecipeFormData] = useState<Recipe>({
        categoryId: '',
        name: '',
        urlImg: '',
        instructions: ''
    });
    const { data: foods } = useQuery(['foods'], () => services?.foodService.getAllItems());
    const { data: food } = useQuery(['food', foodId], () => services?.foodService.getItem(foodId!));
    const { data: recipe } = useQuery(['recipe', recipeId], () => services?.recipeService.getItem(recipeId!));

    useEffect(() => {
        if (pathname.includes('edit-food')) {
            setFoodId(id);
        }
        if (pathname.includes('edit-recipe')) {
            setRecipeId(id);
        }
    }, [])

    useEffect(() => {
        if (food !== undefined) {
            const foodObj = new Food();
            foodObj.name = food.name;
            setFoodFormData(foodObj);
        }
        if (recipe !== undefined) {
            const recipeObj = new Recipe();
            recipeObj.categoryId = recipe.categoryId;
            recipeObj.name = recipe.name;
            recipeObj.urlImg = recipe.urlImg;
            recipeObj.instructions = recipe.instructions;
            setRecipeFormData(recipeObj);
        }
    }, [food, recipe])

    function updateFoodFormData(e: React.FormEvent<HTMLInputElement>, str: "name") {
        setFoodFormData({ ...foodFormData, [str]: (e.target as HTMLInputElement).value });
    }

    function updateRecipeFormData(e: React.FormEvent<any>, str: RecipeType) {
        setRecipeFormData({ ...recipeFormData, [str]: (e.target as HTMLInputElement).value });
    }

    async function addOrUpdateFoodCategory() {
        if (foodFormData.name === '') {
            alert('Invalid Form, Food Category can not be empty');
            return;
        }

        if (pathname.includes('new-category')) {
            await services?.foodService.addItem(foodFormData!);
            alert('New Food Added');
        } else {
            await services?.foodService.updateItem(id!.toString(), foodFormData!);
            alert('Food Updated');
        }
    }

    async function addOrUpdateRecipeByFoodCategory() {
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

        if (pathname.includes('new-category')) {
            await services?.recipeService.addItem(recipeFormData);
            alert('New Recipe Added');
        } else {
            await services?.recipeService.updateItem(id!.toString(), recipeFormData);
            alert('Recipe Updated');
        }
    }

    return (
        <>
            <div className={pathname.includes('new-category') || pathname.includes('edit-food') ? 'FormContainer' : 'hdn'}>
                <div className="formItem">
                    <h3> {pathname.includes('edit-food') ? 'update Category' : 'add New Category'}</h3>
                </div>
                <div className="formItem">
                    <input type="text" onInput={(e) => { updateFoodFormData(e, "name"); }} placeholder="Food Category" value={foodFormData.name} />
                </div>
                <div className="formItem">
                    <input type="button" onClick={addOrUpdateFoodCategory} value="Save Category" />
                </div>
                <div className="formItem">
                    <input className={pathname.includes('edit-food') ? '' : 'hdn'} type="button" onClick={() => navigate('/gallery', { state: { category: location.state.category } })} value="back" />
                </div>
            </div>

            <div className={pathname.includes('new-category') || pathname.includes('edit-recipe') ? 'FormContainer' : 'hdn'}>
                <div className="formItem">
                    <h3> {pathname.includes('edit-recipe') ? 'update Recipe by Category' : 'add New Recipe by Category'}</h3>
                </div>
                <div className="formItem">
                    <select value={recipeFormData.categoryId} onChange={(e) => { updateRecipeFormData(e, "categoryId"); }} >
                        <option value=''>Choose Category</option>
                        {foods?.map((curr) => (<option key={curr._id} value={curr._id}>{curr.name}</option>))}
                    </select>
                </div>
                <div className="formItem">
                    <input type="text" onInput={(e) => { updateRecipeFormData(e, "name"); }} placeholder="name" value={recipeFormData.name} />
                </div>
                <div className="formItem">
                    <input type="text" onInput={(e) => { updateRecipeFormData(e, "urlImg"); }} placeholder="url Img" value={recipeFormData.urlImg} />
                </div>
                <div className="formItem">
                    <img className={recipeFormData.urlImg === null ? 'hdn' : ''} src={recipeFormData.urlImg} />
                </div>
                <div className="formItem">
                    <textarea onInput={(e) => { updateRecipeFormData(e, "instructions"); }} placeholder="instructions" value={recipeFormData.instructions} />
                </div>
                <div className="formItem">
                    <input type="button" onClick={addOrUpdateRecipeByFoodCategory} value="Save Recipe" />
                </div>
                <div className="formItem">
                    <input className={pathname.includes('edit-recipe') ? '' : 'hdn'} type="button" onClick={() => navigate('/gallery', { state: { category: location.state.category } })} value="back" />
                </div>
            </div>
        </>
    )
}
