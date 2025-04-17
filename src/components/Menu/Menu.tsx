import './Menu.css';
import IFood from '../../model/IFood';
import { Dispatch, useContext, useEffect, useState } from 'react';
import AppContext from '../../contexts/AppContext';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { updateRecipes } from '../../store/actions/actionCreators';
import { AiOutlineEdit } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import IPage from "../../model/IPage";
import IRecipe from "../../model/IRecipe";
import React from 'react';

interface MenuProps {
    categories?: IFood[];
}

function Menu({ categories = [] }: MenuProps) {
    const [category, setcategory] = useState<string>("");
    const [isMenuHidden, setIsMenuHidden] = useState(true);
    const services = useContext(AppContext);
    const defaultRecipes: IPage<IRecipe> = {
        items: [],
        currentPage: 1,
        totalPages: 0,
    };
    const { data: recipes = defaultRecipes } = useQuery(
        ['recipes', category],
        () => services?.recipeService.getItemsByCategoryPage(category, '1', '9'), // use ! because we're guarding it
        {
            enabled: !!services?.recipeService, // only run if service exists
        }
    );
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

    const toggleMenu = (): void => {
        setIsMenuHidden((prev) => !prev);
    }

    const showCategoryByName = (id: string): void => {
        if (id !== category) {
            setcategory(id);
        }
    }

    return (
        <div id="menuContainer">
            <div className={`categoriesMenu ${isMenuHidden ? 'hdn' : ''}`} >
                {categories.length === 0 ? (
                    <div>No categories available</div>
                ) : (
                    <ul>
                        {categories.map((curr) => (<li key={curr._id} className={curr._id === category ? 'foodCategoriesListItem active' : 'foodCategoriesListItem'} onClick={() => showCategoryByName(curr._id)}>
                            {curr.name}
                            <AiOutlineEdit className='edit' onClick={() => navigate(`/edit-food/${curr._id}`, { state: { category: curr._id } })} />
                        </li>))}
                    </ul>
                )}
            </div>

            <div onClick={toggleMenu}>
                <span className="material-symbols-outlined cursorHand">
                    menu
                </span>
            </div>
        </div>
    )
}

export default React.memo(Menu);