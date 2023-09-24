import './Menu.css';
import IFood from '../../model/IFood';
import { Dispatch, useContext, useEffect, useState } from 'react';
import AppContext from '../../contexts/AppContext';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { updateRecipes } from '../../store/actions/actionCreators';

export default function Menu(props: { categories: IFood[] | undefined }) {
    const [category, setcategory] = useState<string>("");
    const services = useContext(AppContext);
    const { data: recipes } = useQuery(['recipes', category], () => services?.foodService.getAllRecipesByCategory(category));
    const dispatch: Dispatch<any> = useDispatch()

    useEffect(() => {
        if (recipes !== null && recipes !== undefined) {
            dispatch(updateRecipes(recipes));
        }
    }, [recipes])

    function toggleMenu() {
        const categoriesMenu = document.querySelector(".categoriesMenu") as HTMLElement;
        categoriesMenu.classList.toggle('hdn');
    }

    function showCategoryByName(cat: string) {
        if (cat !== category) {
            setcategory(cat);
        }
    }

    return (
        <div id="menuContainer">
            <div className="categoriesMenu hdn">
                <ul>
                    {props.categories?.map((curr) => (<li key={curr.idCategory} className={curr.strCategory === category ? 'foodCategoriesListItem active' : 'foodCategoriesListItem'} onClick={() => showCategoryByName(curr.strCategory)}>{curr.strCategory}</li>))}
                </ul>
            </div>

            <div onClick={toggleMenu}>
                <span className="material-symbols-outlined">
                    menu
                </span>
            </div>
        </div>
    )
}
