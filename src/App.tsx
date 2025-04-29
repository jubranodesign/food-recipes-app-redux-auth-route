import './App.css';
import Nav from './components/Nav/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Gallery from './pages/Gallery/Gallery';
import { useQuery } from '@tanstack/react-query';
import Login from './pages/Login/Login';
import NoMatch from './pages/NoMatch/NoMatch';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Home from './pages/Home/Home';
import NewCategory from './pages/NewCategory/NewCategory';
import { useAuthInit } from './hooks/useAuthInit';
import { useContext } from 'react';
import AppContext from './contexts/AppContext';

function App() {
  const services = useContext(AppContext);
  const { data: navigations = [] } = useQuery(
    ['navigations'],
    () => services!.navigationService.getAllItems(), // use ! because we're guarding it
    {
      enabled: !!services?.navigationService, // only run if service exists
    }
  );
  const ready = useAuthInit();

  if (!ready) {
    return <div>Loading auth...</div>;
  }

  return (
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
  );

}

export default App;

