import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { login } from '../../services/userAPI';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from '../../redux/reducers/authSlice';


const LoginPage = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeUserData = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = (e) => {
    e.preventDefault();
    try {
      if (!userData) return null;
  
      login({ email: userData.email, password: userData.password })
        .then((data) => {
          alert("Вы вошли!");
          setUserData({
            email: "",
            password: "",
          });
          dispatch(setAuth(true));
          navigate("/account");
        })
        .catch(error => {
          alert(error.response?.data?.message?.message || "Ошибка при входе");
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="login-container">
      <form onSubmit={loginUser} className="login-form">
        <Typography variant="h4" padding={3} fontFamily='Playfair Display' textAlign='center'>Форма входа</Typography>
        <TextField name='email' onChange={changeUserData} fullWidth margin='normal' label="E-mail" variant="standard" placeholder='Введите ваш E-mail'  />
        <TextField name='password' onChange={changeUserData} type='password' fullWidth margin='normal' label="Пароль" variant="standard" placeholder='Введите ваш Пароль' />
        <Button type='submit' sx={{ fontFamily: 'Playfair Display', marginTop: 2, marginBottom: 2, width: '30%' }} variant="contained">Войти</Button>
        <Typography variant="body2" sx={{ fontFamily: 'Playfair Display', textAlign: 'center' }}>У вас нет учетной записи?<a style={{color:'#e17396',textDecoration:'none'}} href='/register' className='incitingText'>Зарегистрироваться</a></Typography>
      </form>
    </main>
  );
};

export default LoginPage;



