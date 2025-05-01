import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Gallery from './pages/Gallery/Gallery';
import Login from './pages/Login/Login';
import NoMatch from './pages/NoMatch/NoMatch';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Home from './pages/Home/Home';
import NewCategory from './pages/NewCategory/NewCategory';
import { useAuthInit } from './hooks/useAuthInit';
import MainNavigation from './components/Nav/MainNavigation';

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
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="new-category" element={<NewCategory />} />
            <Route path="edit-food/:id" element={<NewCategory />} />
            <Route path="edit-recipe/:id" element={<NewCategory />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>

      </BrowserRouter>
    </div>
  );

}

export default App;

