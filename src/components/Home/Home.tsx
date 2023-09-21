import { Dispatch, useContext } from "react";
import AppContext from "../../contexts/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "../../store/actions/actionCreators";
import './Home.css'

export default function Home() {
    const services = useContext(AppContext);
    const dispatch: Dispatch<any> = useDispatch()

    let token: string | null | undefined = useSelector(
        (state: any) => state.tokenReducer.token
    )

    async function Logout() {
        await services?.authenticationService.Logout()
        dispatch(updateToken(services?.authenticationService.token));
    }

    return (
        <div id="Home">
            <h2>Welcome to the Food Recipes Web App.</h2>
            <br />
            <h3>it's time to discover new Recipe for your next meal. </h3>
            <br /><br />
            <p>your token is: {token}</p>

            <div onClick={Logout} className="Logout">Log out</div>
        </div>

    )
}
