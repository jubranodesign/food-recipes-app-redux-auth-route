import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducers/reducer';
import AppContext from './contexts/AppContext';
import FoodService from './services/http/FoodService';
import RecipeService from './services/http/RecipeService';
import UserAuthenticationService from './services/http/UserAuthenticationService';
import NavigationService from './services/http/NavigationService';
import config from './config/http.json'

const queryClient = new QueryClient({});
const store = createStore(reducer);
const services = {
  foodService: new FoodService(config.foodService.baseURL),
  recipeService: new RecipeService(config.recipeService.baseURL),
  userAuthenticationService: new UserAuthenticationService(config.userAuthenticationService.baseURL),
  navigationService: new NavigationService(config.navigationService.baseURL)
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  //<React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <AppContext.Provider value={services}>
        <App />
      </AppContext.Provider>
    </Provider>
  </QueryClientProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
