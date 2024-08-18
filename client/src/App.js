import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//pages
import Menu from "./Pages/Menu/Menu";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Footer from "./Components/Footer";
import Table from "./Pages/Table/Table";
import Header from "./Components/Header";
import Main from "./Pages/Main/Main";
import LoginPage from "./Pages/Login/LoginForm";
import RegisterPage from "./Pages/Registration/RegisterPage";
import Account from './Pages/Account/Account';
import Basket from "./Components/basket/Basket";
import Admin from './Pages/Admin/Admin';
//other
import { checkAuthorization } from "./services/userAPI";
import { useDispatch, useSelector } from "react-redux";
import { setAuth,setLoadingAuth } from "./redux/reducers/authSlice";
import { getAllGoods } from "./services/goodAPI";
import { setGoods,setLoading,setError } from "./redux/reducers/goodSlise";
import { adminRoutesArray } from "./utils/arrays";
//styles
import "./App.scss";


const App = () => {
  const dispatch = useDispatch();
  const {isAuth,loading} = useSelector((state) => state.auth);

    useEffect(() => {
      const fetchData = async () => {
        dispatch(setLoading(true)); // Установка флага загрузки в true
        try {
          const goods = await getAllGoods();
          dispatch(setGoods(goods)); // Установка загруженных товаров в состояние
        } catch (error) {
          dispatch(setError(error.message)); // Установка ошибки загрузки
        } finally {
          dispatch(setLoading(false)); // Установка флага загрузки в false при завершении
        }
      };
  
      fetchData();
    }, [dispatch]);

    useEffect(() => {
      dispatch(setLoadingAuth(true));
      checkAuthorization()
        .then(() => dispatch(setAuth(true)))
        .catch((error) => console.error(error?.response?.data?.message))
        .finally(() => dispatch(setLoadingAuth(false)));
    }, [dispatch]);

    const renderAdminRoutes = () => (
      adminRoutesArray.map(({ route, component: Component }, index) => (
        <Route 
          key={index}
          path={`/admin/${route}`} 
          element={isAuth ? <Component /> : <Navigate to="/login" />} 
        />
      )))
      
    if (loading) {
      return <div>Loading...</div>; 
    }

  return (
    <main>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/table" element={<Table />} />
          <Route path="/menu" element={<Menu/>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/admin"
            element={isAuth ? <Admin /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!isAuth ? <LoginPage /> : <Navigate to="/account" />}
          />
          <Route
            path="/register"
            element={!isAuth ? <RegisterPage /> : <Navigate to="/account" />}
          />
          <Route
            path="/account"
            element={isAuth ? <Account /> : <Navigate to="/login" />}
          />
          {
            renderAdminRoutes()
          }
          
        </Routes>
       
        <Footer />
        <Basket/>
      </BrowserRouter>
    </main>
  );
};



export default App;
