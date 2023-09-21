import './App.css';
import FoodService from './services/http/FoodService';
import AppContext from './contexts/AppContext';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducers/reducer';
import AuthenticationService from './services/http/AuthenticationService';
import Nav from './components/Nav/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Gallery from './components/Gallery/Gallery';
import { useQuery } from '@tanstack/react-query';
import NavigationService from './services/http/NavigationService';
import Login from './components/Login/Login';
import NoMatch from './components/NoMatch/NoMatch';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Home from './components/Home/Home';
import NewCategory from './components/NewCategory/NewCategory';

function App() {
  const services = {
    foodService: new FoodService(),
    authenticationService: new AuthenticationService(),
    navigationService: new NavigationService()
  };
  const store = createStore(reducer);
  const { data: navigations } = useQuery(['navigations'], () => services?.navigationService.getAllNavigationCategories());

  return (
    <Provider store={store}>
      <AppContext.Provider value={services}>
        <div id="App">
          <BrowserRouter>
            <Nav links={navigations} />

            <Routes>
              <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
              <Route path="new-category" element={<ProtectedRoute><NewCategory /></ProtectedRoute>} />

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

