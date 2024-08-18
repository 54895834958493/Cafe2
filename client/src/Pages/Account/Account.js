import React ,{useEffect,useState} from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import {getInformation,getAddress,changeAddress,changeInformation} from '../../services/changeUserAPI'
//styles
import "./Account.scss";
import { setAuth } from "../../redux/reducers/authSlice";

const UserPage = () => {
    const [userInformation,setUserInformation] = useState({
        name:"",
        surname:"",
        patronymic:"",
        phone:"",
        email:"",
    });

    const [userAddress,setUserAddress] = useState({
      city:"",
      region:"",
      street:"",
      index:0
    })
    const navigate = useNavigate();
    const isAuth = useSelector((state) => state.auth.isAuth);

    const {name,surname,patronymic,phone,email} = userInformation;
    const {city,region,street,index} = userAddress;

    const [isActiveFormPersonal, setIsActiveFormPersonal] = useState(true);
    const [isActiveFormAddress, setIsActiveFormAddress] = useState(true);

    const {register, handleSubmit,formState:{errors}} = useForm({defaultValues:{}});
    
    //classNames
    const classNameFormsPersonal = isActiveFormPersonal ? 'user-information-input' : 'user-information-input active';
    const classNameFormsAddress = isActiveFormAddress ? 'user-information-input' : 'user-information-input active'

    const formButtonPersonalClassName = isActiveFormPersonal ? "button-save-information-hidden" : "button-save-information";
    const formButtonAddressClassName = isActiveFormAddress ? "button-save-information-hidden" : "button-save-information"

const logOut = () => {

  if(!isAuth) {
      alert('Неизвестная ошибка');
      return;
  }

  setAuth(false);
  navigate('/');
  localStorage.removeItem('annaCafe');
  alert('Вы вышли из аккаунта');
}

const changeUserInformation = (e,setInformation,information) => {

  e.preventDefault();

  setInformation({
    ...information,
    [e.target.name]: e.target.value 
  });

}

const submitInformation = () => {
  try {
    changeInformation({name,surname,patronymic,phone}).
      then(()=>{
        alert('Данные успешно изменены');
        setIsActiveFormPersonal(!isActiveFormPersonal);
      })
      .catch(error => alert(error.response.data.message.message))
  } catch (error) {
      console.log(error)
  }
}

const submitAddress = () => {
  try {
    changeAddress({city,street,region,index}) 
      .then(()=>{
        alert('Данные успешно изменены');
        setIsActiveFormAddress(!isActiveFormAddress);
      })
      .catch(error => alert(error.response.data.message.message));

  } catch (error) {
      console.log(error);
  }
}
// //Обработка ошибки
const error = data => {
  Object.keys(data).forEach((key) => {
    switch (data[key]?.type) {
      case 'required':
        alert("Поле обязательно к заполнению !");
        break;

      default:
          alert(data[key]?.message);
        break;
    }
  });
}
//FormsState
const updateActiveFormPersonal = () => setIsActiveFormPersonal(!isActiveFormPersonal);
const updateActiveFormAddress = () => setIsActiveFormAddress(!isActiveFormAddress);

useEffect(()=>{
  Promise.all([getInformation(), getAddress()])
    .then((values) => {
      const [{ name, surname, patronymic, phone, email }, { city, street, region, index }] = values;

      setUserInformation((prevInformation)=> ({
        ...prevInformation,
        name,
        surname,
        patronymic,
        phone,
        email,
      }));

      setUserAddress((prevAddress)=> ({
        ...prevAddress,
        city,
        street,
        region,
        index,
      }));
    })
    .catch((error) => console.error(error.response.data.message));
}, []);

if(!isAuth){
    return <h1>Loading...</h1>
}

  return (
    <div className="account-page-wrapper">
      <h1 className="account-page-title">Мой аккаунт</h1>
        <div className="account-page-content">
          
          <div className="account-page-content-left">
                <button onClick={logOut} className="log-out">Выйти из аккаунта</button>
                <button onClick={()=> navigate('/admin')} className="log-out">Админка</button>

          </div>

        <div className="account-page-content-right">
          <div className="personal-information">

                 <div className="personal-information-header">
                    <h2 className="main-data-header">Персональные данные</h2>
                    <button onClick={updateActiveFormPersonal} className="button-change-data">Изменить</button>
                  </div>

        <form onSubmit={handleSubmit(submitInformation ,error)}  className="personal-information-inputs">

                <div className="personal-information-block">
                  <p className="data-header">имя</p>
                  <input {...register('name', {
                        minLength:{
                          value:2,
                          message:'Имя слишком короткое'
                        },
                        maxLength:{
                          value:16,
                          message:"Имя слишком длинное"
                        },
                        pattern: {
                            value: /^[А-Я][а-яё]*$/,
                            message: 'Имя должно начинаться с заглавной буквы и быть написанным на кириллице',
                        },
                    })}
                      className={classNameFormsPersonal}  
                      readOnly={isActiveFormPersonal} 
                      value={name === null ? "" : name} 
                      onChange={(e)=>{changeUserInformation(e,setUserInformation,userInformation)}} 
                      type="text" />
                </div>
          
                <div className="personal-information-block">
                  <p className="data-header">фамилия</p>
                  <input
                  {...register('surname', {
                    minLength:{
                      value:2,
                      message:'Фамилия слишком короткая'
                    },
                    maxLength:{
                      value:20,
                      message:"Фамилия слишком длинная"
                    },
                    pattern: {
                        value: /^[А-Я][а-яё]*$/,
                        message: 'Фамилия должно начинаться с заглавной буквы и быть написана на кириллице',
                    },
                })}
                  className={classNameFormsPersonal} 
                  readOnly={isActiveFormPersonal} 
                  value={surname === null ? "" : surname} 
                  onChange={(e)=>{changeUserInformation(e,setUserInformation,userInformation)}} 
                  type="text" />
                </div>

                <div className="personal-information-block">
                  <p className="data-header">отчество</p>
                  <input
                  {...register('patronymic', {
                    minLength:{
                      value:2,
                      message:'Отчество слишком короткое'
                    },
                    maxLength:{
                      value:25,
                      message:"Отчество слишком длинное"
                    },
                    pattern: {
                        value: /^[А-Я][а-яё]*$/,
                        message: 'Отчество должно начинаться с заглавной буквы и быть написано на кириллице',
                    },

                })}
                  className={classNameFormsPersonal}
                    readOnly={isActiveFormPersonal} 
                    value={patronymic === null ? "" : patronymic} 
                    onChange={(e)=>{changeUserInformation(e,setUserInformation,userInformation)}} 
                    type="text" />
                </div>

                <div className="personal-information-block">
                  <p className="data-header">телефон</p>
                  <InputMask
                    className={classNameFormsPersonal} 
                      readOnly={isActiveFormPersonal} 
                      value = {undefined || phone}
                      onChange={(e)=>{changeUserInformation(e,setUserInformation,userInformation)}}   
                      type="tel" 
                      mask="+7 (999) 999-99-99"
                      alwaysShowMask={true}
                      name="phone"
                      
                />
                </div>    
              
                <div className="personal-information-block">
                  <p className="data-header">почта</p>
                  <input name="mail" className='user-information-input' readOnly={true} value={email === null ? "" : email} type="email" />
                </div>

                <button type="submit" onClick={handleSubmit(submitInformation ,error)} className={formButtonPersonalClassName}>Сохранить</button>
            </form>
          </div>


          <div className="address-information">
            <div className="address-information-header">
              <h2 className="main-data-header">Адрес доставки</h2>

              <button onClick={updateActiveFormAddress} className="button-change-data">Изменить</button>

              </div>
            
            <form onSubmit={handleSubmit(submitAddress,error)} className="address-information-inputs">

                  <div className="address-information-block">
                    <p className="data-header">город</p>
                    <input 
                    {...register('city', {
                      minLength:{
                        value:2,
                        message:'Название слишком короткое'
                      },
                      maxLength:{
                        value:30,
                        message:"Название слишком длинное"
                      },
                      pattern: {
                          value:/^[А-Я][а-яё]*$/,
                          message: 'Название города должно начинаться с заглавной буквы и быть написано на кириллице',
                      },

                  })}
                    className={classNameFormsAddress} 
                    readOnly={isActiveFormAddress} 
                    value={city === null ? "" : city} 
                    onChange={(e)=>{changeUserInformation(e,setUserAddress,userAddress)}} 
                    type="text" />
                  </div>

                  <div className="address-information-block">
                    <p className="data-header" >край/область/регион</p>
                    <input 
                    {...register('region', {
                      minLength:{
                        value:2,
                        message:'Название слишком короткое'
                      },
                      maxLength:{
                        value:55,
                        message:"Название слишком длинное"
                      },
                      pattern: {
                          value:  /^[А-Яа-яЁё\s-]+$/,
                          message: 'Название региона должно начинаться с заглавной буквы и быть написано на кириллице',
                      },

                  })}
                    className={classNameFormsAddress}
                    readOnly={isActiveFormAddress}
                    value={region === null ? "" : region}
                    onChange={(e)=>{changeUserInformation(e,setUserAddress,userAddress)}} 
                    type="text" />
                  </div>

                  <div className="address-information-block">
                    <p className="data-header">улица/дом/квартира</p>
                    <input  
                    {...register('street', {
                      minLength:{
                        value:2,
                        message:'Название слишком короткое'
                      },
                      maxLength:{
                        value:100,
                        message:"Название слишком длинное"
                      },

                  })}
                      className={classNameFormsAddress} 
                      readOnly={isActiveFormAddress} 
                      value={street === null ? "" : street} 
                      onChange={(e)=>{changeUserInformation(e,setUserAddress,userAddress)}} 
                      type="text" />
                  </div>

                  <div className="address-information-block">
                    <p className="data-header">почтовый индекс</p>
                    <input  
                    {...register('index', {
                      minLength:{
                        value:6,
                        message:'Индекс слишком короткий'
                      },
                      maxLength:{
                        value:6,
                        message:"Индекс слишком длинный"
                      },
                      pattern: {
                          value: /[0-9\\.,:]/,
                          message: 'Индекс должен содержать только цифры',
                      },

                  })}
                    className={classNameFormsAddress} 
                    readOnly={isActiveFormAddress} 
                    value={index === null ? "" : index || ''} 
                    onChange={(e)=>{changeUserInformation(e,setUserAddress,userAddress)}} 
                    type="tel" />
                  </div>

                 <button type="submit" onClick={handleSubmit(submitAddress,error)} className={formButtonAddressClassName}>Сохранить</button>
             </form>   
           </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;