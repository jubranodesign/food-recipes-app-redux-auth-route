import './LoginPage.css';
import { useContext, useState } from "react";
import AppContext from "../../contexts/AppContext";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginType } from "../../model/LoginType";
import { ILogin } from "../../model/ILogin";
import { updateToken } from '../../store/actions/actionCreators';
import { validateRequiredFields } from '../../utils/validation';

export default function LoginPage() {
    const services = useContext(AppContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [LoginformData, setLoginFormData] = useState<ILogin>({
        userName: '',
        password: ''
    })

    const updateFormData = (e: React.FormEvent<HTMLInputElement>, str: LoginType): void => {
        setLoginFormData({ ...LoginformData, [str]: (e.target as HTMLInputElement).value });
    };

    const Login = async (): Promise<void> => {

        const errorMsg = validateRequiredFields<ILogin>(LoginformData, ['userName', 'password']);
        if (errorMsg) {
            alert(errorMsg);
            return;
        }

        try {
            await services?.userAuthenticationService.Login(LoginformData);
            const token = services?.userAuthenticationService.token;

            if (!token) throw new Error('Login failed: No token received.');

            dispatch(updateToken(token));

            const origin = location.state?.from?.pathname || '/home';
            navigate(origin);
        } catch (error: any) {
            alert(error?.message || 'Login failed');
        }
    }

    return (
        <div className="LoginContainer">
            <div className='Form'>
                <div className="formItem">
                    <h3> Log In</h3>
                </div>
                <div className="formItem">
                    <input
                        type="text"
                        value={LoginformData.userName}
                        onChange={(e) => updateFormData(e, 'userName')}
                        placeholder="userName"
                    />
                </div>
                <div className="formItem">
                    <input
                        type="password"
                        value={LoginformData.password}
                        onChange={(e) => updateFormData(e, 'password')}
                        placeholder="password"
                    />
                </div>
                <div className="formItem">
                    <input className="Login" type="button" onClick={Login} value="Login" />
                </div>
            </div>
        </div>
    )
}

