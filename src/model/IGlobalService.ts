import FoodService from "../services/http/FoodService";
import LoginAuthenticationService from "../services/http/LoginAuthenticationService";
import NavigationService from "../services/http/NavigationService";

interface IGlobalService {
    foodService: FoodService;
    loginAuthenticationService: LoginAuthenticationService,
    navigationService: NavigationService
}

export default IGlobalService;
