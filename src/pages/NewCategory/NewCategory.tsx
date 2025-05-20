import './NewCategory.css';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../../contexts/AppContext';
import Food from '../../model/Food';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function NewCategory() {
    const services = useContext(AppContext);
    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname;
    const { id } = useParams();
    const [foodFormData, setFoodFormData] = useState<Food>({
        name: ''
    });

    const { data: food } = useQuery(
        ['food', id],
        () => services?.foodService.getItem(id!),
        {
            enabled: !!id && pathname.includes('edit-food'),
        }
    );

    useEffect(() => {
        if (food !== undefined) {
            const foodObj = new Food();
            foodObj.name = food.name;
            setFoodFormData(foodObj);
        }
    }, [food]);

    function updateFoodFormData(e: React.FormEvent<HTMLInputElement>, str: "name") {
        setFoodFormData({ ...foodFormData, [str]: (e.target as HTMLInputElement).value });
    }

    async function addOrUpdateFoodCategory() {
        const { name } = foodFormData;

        if (pathname.includes('edit-food') && !id) {
            alert('Invalid Form, Food Category can not be empty');
            return;
        }

        if ((name ?? '').trim() === '') {
            alert('Invalid Form, Food Category can not be empty');
            return;
        }

        try {
            if (pathname.includes('new-category')) {
                await services?.foodService.addItem(foodFormData);
                alert('New Food Added');
            } else {
                await services?.foodService.updateItem(id!.toString(), foodFormData);
                alert('Food Updated');
            }
        } catch (error: any) {
            alert(error?.message || 'An error occurred. Please try again.');
        }
    }

    return (
        <>
            <div className='FormContainer'>
                <div className="formItem">
                    <h3> {pathname.includes('edit-food') ? 'update Category' : 'add New Category'}</h3>
                </div>
                <div className="formItem">
                    <input type="text"
                        onChange={(e) => { updateFoodFormData(e, "name"); }}
                        placeholder="Food Category"
                        value={foodFormData.name} />
                </div>
                <div className="formItem">
                    <input
                        type="button"
                        onClick={addOrUpdateFoodCategory}
                        value="Save Category"
                        disabled={(foodFormData.name ?? '').trim() === ''}
                    />
                </div>
                <div className="formItem">
                    <input className={pathname.includes('edit-food') ? '' : 'hdn'} type="button" onClick={() => navigate('/gallery', { state: { category: location.state.category } })} value="back" />
                </div>
            </div>
        </>
    )
}
