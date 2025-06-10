import { useContext } from "react";
import AppContext from "../../contexts/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "../../store/actions/actionCreators";
import './HomePage.css'
import foodRecipes from '../../img/food_recipes.gif';
import TokenDisplay from "../../components/TokenDisplay/TokenDisplay";
import { RootState } from "../../store/types/rootState";

export default function HomePage() {
    const services = useContext(AppContext);
    const dispatch = useDispatch();

    let token: string | null | undefined = useSelector(
        (state: RootState) => state.tokenReducer.token
    )

    async function Logout(): Promise<void> {
        await services?.userAuthenticationService.Logout();
        dispatch(updateToken(null));
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

            <TokenDisplay token={token} />
        </div>
    )
}
