import './Login.css';
import { useContext, useState } from "react";
import AppContext from "../../contexts/AppContext";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginType } from "../../model/LoginType";
import { ILogin } from "../../model/ILogin";
import { initAuth } from '../../utils/auth';

export default function Login() {
    const services = useContext(AppContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [LoginformData, setLoginFormData] = useState<ILogin>({
        userName: '',
        password: ''
    })

    function updateFormData(e: React.FormEvent<HTMLInputElement>, str: LoginType) {
        setLoginFormData({ ...LoginformData, [str]: (e.target as HTMLInputElement).value });
    }

    async function Login() {

        if (LoginformData.userName === '') {
            alert('Invalid Form, First Name can not be empty')
            return;
        }
        if (LoginformData.password === '') {
            alert('Invalid Form, password can not be empty')
            return;
        }

        try {
            await services?.userAuthenticationService.Login(LoginformData)
            initAuth(services?.userAuthenticationService.token, services, dispatch)
            const origin = location.state?.from?.pathname || '/home';
            navigate(origin);
        } catch (error) {
            alert(error);
        }

    }

    return (
        <div className="FormContainer">
            <div className="formItem">
                <h3> Log In</h3>
            </div>
            <div className="formItem">
                <input type="text" onInput={(e) => { updateFormData(e, "userName"); }} placeholder="userName" />
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

