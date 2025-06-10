import './RecipePage.css';
import { useContext, useEffect, useMemo, useState } from 'react';
import AppContext from '../../contexts/AppContext';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Recipe from '../../model/Recipe';
import { RecipeType } from '../../model/RecipeType';
import { validateRequiredFields } from '../../utils/validation';
import TextInput from '../../components/Form/TextInput';
import Button from '../../components/Form/Button';
import TextArea from '../../components/Form/TextArea';
import SelectInput from '../../components/Form/SelectInput';

export default function RecipePage() {
    const services = useContext(AppContext);
    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname;
    const { id } = useParams();
    const [recipeFormData, setRecipeFormData] = useState<Recipe>({
        categoryId: '',
        name: '',
        urlImg: '',
        instructions: ''
    });

    const { data: foods } = useQuery(
        ['foods'],
        () => services?.foodService.getAllItems(),
        {
            enabled: !!services?.foodService,
        }
    );

    const { data: recipe } = useQuery(
        ['recipe', id],
        () => services?.recipeService.getItem(id!),
        {
            enabled: !!id && pathname.includes('edit-recipe'),
        }
    );

    useEffect(() => {
        if (recipe !== undefined) {
            const recipeObj = new Recipe();
            recipeObj.categoryId = recipe.categoryId;
            recipeObj.name = recipe.name;
            recipeObj.urlImg = recipe.urlImg;
            recipeObj.instructions = recipe.instructions;
            setRecipeFormData(recipeObj);
        }
    }, [recipe]);

    useEffect(() => {
        if (!id) {
            setRecipeFormData({
                categoryId: '',
                name: '',
                urlImg: '',
                instructions: ''
            });
        }
    }, [id]);

    const updateRecipeFormData = (e: React.FormEvent<any>, str: RecipeType): void => {
        setRecipeFormData({ ...recipeFormData, [str]: (e.target as HTMLInputElement).value });
    };

    const addOrUpdateRecipeByFoodCategory = async (): Promise<void> => {
        if (!services?.recipeService) throw new Error('Recipe service unavailable');

        const errorMsg = validateRequiredFields<Recipe>(recipeFormData, [
            'categoryId',
            'name',
            'urlImg',
            'instructions'
        ]);

        if (errorMsg) {
            alert(errorMsg);
            return;
        }

        try {
            if (pathname.includes('new-recipe')) {
                await services.recipeService.addItem(recipeFormData);
                alert('New Recipe Added');
            } else {
                await services.recipeService.updateItem(id!.toString(), recipeFormData);
                alert('Recipe Updated');
            }
        } catch (error: any) {
            alert(error?.message || 'An error occurred. Please try again.');
        }
    };

    const categoryOptions = useMemo(
        () => foods?.map(curr => ({ value: curr._id, label: curr.name })) || [],
        [foods]
    );

    return (
        <div className='FormContainer'>
            <div className="formItem">
                <h3> {pathname.includes('edit-recipe') ? 'update Recipe by Category' : 'add New Recipe by Category'}</h3>
            </div>
            <div className="formItem">
                <SelectInput
                    value={recipeFormData.categoryId}
                    onChange={(e) => updateRecipeFormData(e, "categoryId")}
                    options={categoryOptions}
                    placeholder="Choose Category"
                />
            </div>
            <div className="formItem">
                <TextInput
                    value={recipeFormData.name}
                    onChange={(e) => updateRecipeFormData(e, "name")}
                    placeholder="name"
                />
            </div>
            <div className="formItem">
                <TextInput
                    value={recipeFormData.urlImg}
                    onChange={(e) => updateRecipeFormData(e, "urlImg")}
                    placeholder="url Img"
                />
            </div>
            <div className="formItem">
                <img className={!recipeFormData.urlImg ? 'hdn' : ''} src={recipeFormData.urlImg} alt="" />
            </div>
            <div className="formItem">
                <TextArea
                    value={recipeFormData.instructions}
                    onChange={(e) => updateRecipeFormData(e, "instructions")}
                    placeholder="instructions"
                />
            </div>
            <div className="formItem">
                <Button
                    onClick={addOrUpdateRecipeByFoodCategory}
                    value="Save Recipe"
                    disabled={
                        recipeFormData.categoryId.trim() === '' ||
                        recipeFormData.name.trim() === '' ||
                        recipeFormData.urlImg.trim() === '' ||
                        recipeFormData.instructions.trim() === ''
                    }
                />
            </div>
            <div className="formItem">
                <Button
                    className={pathname.includes('edit-recipe') ? '' : 'hdn'}
                    onClick={() => navigate('/gallery', { state: { category: location.state.category } })}
                    value="back"
                />
            </div>
        </div>
    );
}
