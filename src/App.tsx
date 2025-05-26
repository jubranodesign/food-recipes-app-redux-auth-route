import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoMatch from './pages/NoMatch/NoMatchPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import RecipePage from './pages/NewRecipe/RecipePage';
import { useAuthInit } from './hooks/useAuthInit';
import MainNavigation from './components/Nav/MainNavigation';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import GalleryPage from './pages/GalleryPage/GalleryPage';

function App() {
  const ready = useAuthInit();

  if (!ready) {
    return <div>Loading auth...</div>;
  }

  return (
    <div id="App">
      <BrowserRouter>
        <MainNavigation />

        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="new-category" element={<CategoryPage />} />
            <Route path="edit-category/:id" element={<CategoryPage />} />
            <Route path="new-recipe" element={<RecipePage />} />
            <Route path="edit-recipe/:id" element={<RecipePage />} />
          </Route>

          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>

      </BrowserRouter>
    </div>
  );

}

export default App;

