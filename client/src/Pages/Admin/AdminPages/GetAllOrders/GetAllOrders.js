import React,{useEffect, useState} from 'react';
import {getAllOrders} from '../../../../services/paymentAPI';
import Table from '../../../../Components/ordersTable/Table';
import './GetAllOrders.scss';

const GetAllOrders = () => {
  const tableHeaders = [
    'ID',
    'Сумма',
    'Товары',
    'Информация о заказчике',
    'Статус'
  ];
  
  const [allOrders,setAllOrders] = useState([]);

  useEffect(()=>{
    getAllOrders()
      .then(orders => setAllOrders(orders))
      .catch(error => console.error(error));
  },[]);

  const checkOrders = () => {
    if(allOrders.length === 0){
      return(
        <h1 className='order-alert'>Заказов нет</h1>
      )
    }

    return(
      <Table headers={tableHeaders} data={allOrders} />
    )
  }
  
  return (
    <div className="table-container">
        <h1 className='manage-name-title'>Управление заказами</h1>
          {
            checkOrders()
          }
    </div>
  );
}

export default GetAllOrders