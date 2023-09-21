import AuthenticationService from "../services/http/AuthenticationService";
import FoodService from "../services/http/FoodService";
import NavigationService from "../services/http/NavigationService";

interface IGlobalService {
    foodService: FoodService;
    authenticationService: AuthenticationService,
    navigationService: NavigationService
}

export default IGlobalService;
