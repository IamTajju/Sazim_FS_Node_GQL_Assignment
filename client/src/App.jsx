import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage';
import LoginPage from './pages/loginPage';
import NavBar from './components/common/navbar';
import RegistrationPage from './pages/registrationPage';
import { CategoriesProvider } from './context/categoriesContext';
import PrivateRoutes from './components/auth/protectedRoute';
import PostPage from './pages/postPage';


function App() {

  return (
    <CategoriesProvider>
      <>
        <NavBar />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:id" element={<PostPage />} />

          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
      </>
    </CategoriesProvider>
  )
}

export default App;
