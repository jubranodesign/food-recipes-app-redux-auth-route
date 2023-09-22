import IRecipe from "./IRecipe";

interface ILazy {
    items: IRecipe[];
    startPage: number;
    range: number;
}

export default ILazy;
