import { useContext } from "react";
import AppContext from "../../contexts/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "../../store/actions/actionCreators";
import './HomePage.css'
import foodRecipes from '../../img/food_recipes.gif';
import TokenDisplay from "../../components/TokenDisplay/TokenDisplay";
import { RootState } from "../../store/types/rootState";
import NavManager from "../../components/NavManager/NavManager";
import { useQuery } from "@tanstack/react-query";
import { Nav } from "../../model/Nav";
import { INav } from "../../model/INav";

export default function HomePage() {
    const services = useContext(AppContext);
    const dispatch = useDispatch();
    const { data: navs } = useQuery(
        ['foods'],
        () => services!.navigationService.getAllItems(),
        {
            enabled: !!services?.navigationService,
        }
    );

    let token: string | null | undefined = useSelector(
        (state: RootState) => state.tokenReducer.token
    )

    async function Logout(): Promise<void> {
        await services?.userAuthenticationService.Logout();
        dispatch(updateToken(null));
    }

    async function handleAdd(nav: Nav): Promise<void> {
        await services!.navigationService.addItem(nav);
    }

    async function handleEdit(id: string, nav: Nav): Promise<void> {
        await services!.navigationService.updateItem(id, nav);
    }

    async function handleDelete(id: string): Promise<void> {
        await services!.navigationService.deleteItem(id);
    }

    function renderItem(nav: INav) {
        return <span>{nav.name}</span>;
    }

    return (
        <div id="Home" className="home-container">
            <div className="hero-section">
                <div className="hero-text">
                    <h1>🍽️ Welcome to Food Recipes</h1>
                    <p className="tagline">Discover your next favorite recipe — fast, easy, and tasty.</p>
                    <button onClick={Logout} className="logout-button">Log out</button>
                </div>
                <img className="hero-image" src={foodRecipes} alt="Delicious food" />
            </div>
            <div className="row">
                <NavManager
                    items={navs || []}
                    onAdd={handleAdd}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    renderItem={renderItem}
                />
                <TokenDisplay token={token} />
            </div>
        </div>
    )
}
