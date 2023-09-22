import HttpService from "./HttpService";

class FoodService extends HttpService {

    private urlAllFoodCategories: string = "https://www.themealdb.com/api/json/v1/1/categories.php";
    private urlRecipesByCategory: string = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
    private urlInstructionsByRecipe: string = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

    constructor(baseURL: string) {
        super(baseURL)
    }

    public async getAllFoodCategories<Type>(): Promise<Type> {
        // const response = await this.get('');
        const response = await this.fetchDataFromAPI(this.urlAllFoodCategories);
        const data = this.convertResponseToJSON<{ categories: Type }>(response);
        return data.categories;
    }

    public async getAllRecipesByCategory<Type>(category: string): Promise<Type> {
        //const response = await this.get(`/${category}`);
        const response = await this.fetchDataFromAPI(this.urlRecipesByCategory + category);
        const data = this.convertResponseToJSON<{ meals: Type }>(response);
        return data.meals;
    }

    public async getRecipeById<Type>(id: number): Promise<Type> {
        //const response = await this.get(`category/recipe/${id}`);
        const response = await this.fetchDataFromAPI(this.urlInstructionsByRecipe + id);
        const data = this.convertResponseToJSON<{ meals: Type }>(response);
        return data.meals;
    }

    public async addNewFoodCategory<Type>(payload: Type): Promise<Type> {
        const response = await this.post('', payload);
        return this.convertResponseToJSON<Type>(response);
    }

}

export default FoodService;