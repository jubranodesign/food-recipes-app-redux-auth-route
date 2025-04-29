import { Dispatch } from "react";
import IGlobalService from "../model/IGlobalService";
import { updateToken } from "../store/actions/actionCreators";

export function initAuth(token: string | undefined, services: IGlobalService | null, dispatch: Dispatch<any>) {
    services?.foodService.setAuthToken(token);
    services?.recipeService.setAuthToken(token);
    services?.navigationService.setAuthToken(token);
    dispatch(updateToken(token));
}