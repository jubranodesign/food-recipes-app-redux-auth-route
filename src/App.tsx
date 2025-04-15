import './App.css';
import FoodService from './services/http/FoodService';
import AppContext from './contexts/AppContext';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducers/reducer';
import Nav from './components/Nav/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Gallery from './pages/Gallery/Gallery';
import { useQuery } from '@tanstack/react-query';
import NavigationService from './services/http/NavigationService';
import Login from './pages/Login/Login';
import NoMatch from './pages/NoMatch/NoMatch';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Home from './pages/Home/Home';
import NewCategory from './pages/NewCategory/NewCategory';
import UserAuthenticationService from './services/http/UserAuthenticationService';
import config from './config/http.json'
import RecipeService from './services/http/RecipeService';

function App() {
  const services = {
    foodService: new FoodService(config.foodService.baseURL),
    recipeService: new RecipeService(config.recipeService.baseURL),
    userAuthenticationService: new UserAuthenticationService(config.userAuthenticationService.baseURL),
    navigationService: new NavigationService(config.navigationService.baseURL)
  };
  const store = createStore(reducer);
  const { data: navigations = [] } = useQuery(
    ['navigations'],
    () => services!.navigationService.getAllItems(), // use ! because we're guarding it
    {
      enabled: !!services?.navigationService, // only run if service exists
    }
  );

  return (
    <Provider store={store}>
      <AppContext.Provider value={services}>
        <div id="App">
          <BrowserRouter>
            <Nav links={navigations} />
            <Nav isNavFixed={true} position='bottom' links={navigations} />

            <Routes>
              <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
              <Route path="new-category" element={<ProtectedRoute><NewCategory /></ProtectedRoute>} />
              <Route path="edit-food/:id" element={<ProtectedRoute><NewCategory /></ProtectedRoute>} />
              <Route path="edit-recipe/:id" element={<ProtectedRoute><NewCategory /></ProtectedRoute>} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AppContext.Provider>
    </Provider>
  );

}

export default App;

