import './Menu.css';
import IFood from '../../model/IFood';
import { Dispatch, useContext, useEffect, useState } from 'react';
import AppContext from '../../contexts/AppContext';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { updateRecipes } from '../../store/actions/actionCreators';
import { AiOutlineEdit } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';

interface MenuProps {
    categories?: IFood[];
}

export default function Menu({ categories = [] }: MenuProps) {
    const [category, setcategory] = useState<string>("");
    const services = useContext(AppContext);
    const { data: recipes } = useQuery(['recipes', category], () => services?.recipeService.getItemsByCategoryPage(category, '1', '9'));
    const dispatch: Dispatch<any> = useDispatch()
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location !== undefined && location.state !== null) {
            setcategory(location.state.category);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // Intentionally run only on mount

    useEffect(() => {
        if (recipes !== null && recipes !== undefined) {
            dispatch(updateRecipes(recipes));
        }
    }, [recipes])

    function toggleMenu() {
        const categoriesMenu = document.querySelector(".categoriesMenu") as HTMLElement;
        categoriesMenu.classList.toggle('hdn');
    }

    function showCategoryByName(id: string) {
        if (id !== category) {
            setcategory(id);
        }
    }

    // Basic prop validation
    if (categories.length === 0) {
        // You could return a placeholder or continue with empty state
        return <div>No categories available</div>;
    }

    return (
        <div id="menuContainer">
            <div className="categoriesMenu hdn">
                <ul>
                    {categories.map((curr) => (<li key={curr._id} className={curr._id === category ? 'foodCategoriesListItem active' : 'foodCategoriesListItem'} onClick={() => showCategoryByName(curr._id)}>
                        {curr.name}
                        <AiOutlineEdit className='edit' onClick={() => navigate(`/edit-food/${curr._id}`, { state: { category: curr._id } })} />
                    </li>))}
                </ul>
            </div>

            <div onClick={toggleMenu}>
                <span className="material-symbols-outlined cursorHand">
                    menu
                </span>
            </div>
        </div>
    )
}
