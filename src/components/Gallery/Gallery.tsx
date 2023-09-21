import Menu from '../Menu/Menu';
import ListRecipes from '../ListRecipes/ListRecipes';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import IFood from '../../model/IFood';
import AppContext from '../../contexts/AppContext';
import './Gallery.css';

export default function Gallery() {
    const services = useContext(AppContext);
    const { data: foods } = useQuery(['foods'], () => services?.foodService.getAllFoodCategories<IFood[]>());

    return (
        <div id="Gallery">
            <Menu categories={foods} />
            <ListRecipes />
        </div>
    )
}
