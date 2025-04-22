import './Menu.css';
import IFood from '../../model/IFood';
import { Dispatch, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCategory } from '../../store/actions/actionCreators';
import { AiOutlineEdit } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';

interface MenuProps {
    categories?: IFood[];
}

export default function Menu({ categories = [] }: MenuProps) {
    const [category, setcategory] = useState<string>("");
    const [isMenuHidden, setIsMenuHidden] = useState(true);
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
        if (category !== null && category !== undefined) {
            dispatch(updateCategory(category));
        }
    }, [category])

    const toggleMenu = (): void => {
        setIsMenuHidden(prev => !prev);
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