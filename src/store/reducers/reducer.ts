import { combineReducers } from "redux"
import recipesReducer from "./recipesReducer"
import tokenReducer from "./tokenReducer"

const reducer = combineReducers({
    recipesReducer,
    tokenReducer
})

export default reducer