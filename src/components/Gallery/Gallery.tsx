import Menu from '../../components/Menu/Menu';
import List from '../List/List';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import AppContext from '../../contexts/AppContext';
import './Gallery.css';
import IRecipe from '../../model/IRecipe';
import IPage from '../../model/IPage';
import { useDispatch, useSelector } from 'react-redux';
import Recipe from '../Recipe/Recipe';
import { updateCategory } from '../../store/actions/actionCreators';
import { RootState } from '../../store/types/rootState';

export default function Gallery() {
    const services = useContext(AppContext);
    const dispatch = useDispatch();
    const { data: foods } = useQuery(
        ['foods'],
        () => services!.foodService.getAllItems(),
        {
            enabled: !!services?.foodService,
        }
    );
    const category: string = useSelector(
        (state: RootState) => state.categoryReducer.category ?? ''
    )

    return (
        <div id="Gallery">
            <Menu
                categories={foods}
                updateCategory={(categoryId) => dispatch(updateCategory(categoryId))}
            />
            <List<IRecipe>
                fetchFn={(page, categoryId) => {
                    if (categoryId) {
                        return services?.recipeService.getItemsByCategoryPage(categoryId, page.toString(), '9');
                    }
                    return Promise.resolve<IPage<IRecipe>>({ items: [], currentPage: 0, totalPages: 0 });
                }}
                RenderItem={Recipe}
                category={category}
            />
        </div>
    )
}
