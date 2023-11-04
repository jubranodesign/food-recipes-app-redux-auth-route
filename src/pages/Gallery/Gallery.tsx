import Menu from '../../components/Menu/Menu';
import ListRecipes from '../../components/ListRecipes/ListRecipes';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import './Gallery.css';

export default function Gallery() {
    const services = useContext(AppContext);
    const { data: foods } = useQuery(['foods'], () => services?.foodService.getAllItems());

    return (
        <div id="Gallery">
            <Menu categories={foods} />
            <ListRecipes />
        </div>
    )
}
