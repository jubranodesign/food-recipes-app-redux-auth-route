import { combineReducers } from "redux"
import recipesReducer from "./recipesReducer"
import tokenReducer from "./tokenReducer"
import categoryReducer from "./categoryReducer"

const reducer = combineReducers({
    recipesReducer,
    tokenReducer,
    categoryReducer
})

export default reducer