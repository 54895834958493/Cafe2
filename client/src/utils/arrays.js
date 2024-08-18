import AddType from '../Pages/Admin/AdminPages/AddType/AddType';
import DeleteType from '../Pages/Admin/AdminPages/DeleteType/DeleteType';
import AddGood from '../Pages/Admin/AdminPages/AddGood/AddGood';
import DeleteGood from '../Pages/Admin/AdminPages/DeleteGood/DeleteGood';
import GetAllUsers from '../Pages/Admin/AdminPages/GetAllUsers/GetAllUsers';
import getAllOrders from '../Pages/Admin/AdminPages/GetAllOrders/GetAllOrders';



export const adminRoutesArray = [
    {  route: "addType",name:'Добавить тип',component:AddType},
    {  route: "deleteType",name:'Удалить тип',component:DeleteType},
    {  route: "addGood",name:'Добавить товар' ,component:AddGood},
    {  route: "deleteGood",name:'Удалить товар',component:DeleteGood },
    {  route: "getAllUsers",name:'Просмотр пользователей',component:GetAllUsers},
    {  route: "getAllOrders",name:'Управление заказами' ,component:getAllOrders},
  ];
  