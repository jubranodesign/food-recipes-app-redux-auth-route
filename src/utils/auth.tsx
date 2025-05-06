import { Dispatch } from "react";
import IGlobalService from "../model/IGlobalService";
import { updateToken } from "../store/actions/actionCreators";

export function initAuth(token: string | undefined, dispatch: Dispatch<any>, services: IGlobalService | null) {
    // services?.foodService.setAuthToken(token);
    // services?.recipeService.setAuthToken(token);
    // services?.navigationService.setAuthToken(token);
    dispatch(updateToken(token));
}