import { Dispatch, useContext, useState } from "react";
import AppContext from "../../contexts/AppContext";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateToken } from "../../store/actions/actionCreators";
import './Login.css'
import { LoginType } from "../../model/LoginType";
import { ILogin } from "../../model/ILogin";

export default function Login() {
    const services = useContext(AppContext);
    const dispatch: Dispatch<any> = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    const [LoginformData, setLoginFormData] = useState<ILogin>({
        name: '',
        password: ''
    })

    function updateFormData(e: React.FormEvent<HTMLInputElement>, str: LoginType) {
        setLoginFormData({ ...LoginformData, [str]: (e.target as HTMLInputElement).value });
    }

    async function Login() {

        if (LoginformData.name === '') {
            alert('Invalid Form, First Name can not be empty')
            return;
        }
        if (LoginformData.password === '') {
            alert('Invalid Form, password can not be empty')
            return;
        }

        await services?.authenticationService.Login(LoginformData)
        dispatch(updateToken(services?.authenticationService.token));
        const origin = location.state?.from?.pathname || '/home';
        navigate(origin);
    }

    return (
        <div id="Login">
            <div className="formItem">
                <h3> Log In</h3>
            </div>
            <div className="formItem">
                <input type="text" onInput={(e) => { updateFormData(e, "name"); }} placeholder="name" />
            </div>
            <div className="formItem">
                <input type="text" onInput={(e) => { updateFormData(e, "password"); }} placeholder="password" />
            </div>
            <div className="formItem">
                <input className="Login" type="button" onClick={Login} value="Login" />
            </div>
        </div>
    )
}

