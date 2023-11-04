import FoodService from "../services/http/FoodService";
import NavigationService from "../services/http/NavigationService";
import RecipeService from "../services/http/RecipeService";
import UserAuthenticationService from "../services/http/UserAuthenticationService";

interface IGlobalService {
    foodService: FoodService;
    recipeService: RecipeService;
    userAuthenticationService: UserAuthenticationService,
    navigationService: NavigationService
}

export default IGlobalService;
