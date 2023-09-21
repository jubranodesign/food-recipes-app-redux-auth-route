import { createContext } from "react";
import IGlobalService from "../model/IGlobalService";

const AppContext = createContext<IGlobalService | null>(null);

export default AppContext;