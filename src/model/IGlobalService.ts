import FoodService from "../services/http/FoodService";
import NavigationService from "../services/http/NavigationService";
import UserAuthenticationService from "../services/http/UserAuthenticationService";

interface IGlobalService {
    foodService: FoodService;
    userAuthenticationService: UserAuthenticationService,
    navigationService: NavigationService
}

export default IGlobalService;
