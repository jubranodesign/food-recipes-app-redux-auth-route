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

    function showCategoryByName(id: string) {
        if (id !== category) {
            setcategory(id);
        }
    }

    return (
        <div id="menuContainer">
            <div className="categoriesMenu hdn">
                <ul>
                    {props.categories?.map((curr) => (<li key={curr._id} className={curr._id === category ? 'foodCategoriesListItem active' : 'foodCategoriesListItem'} onClick={() => showCategoryByName(curr._id)}>{curr.name}</li>))}
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
