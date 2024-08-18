import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToUserCart } from '../../redux/reducers/cartSlice';

const Menu = () => {
  const dispatch = useDispatch();

  const goods = useSelector((state) => state.goods.goods.rows);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const onAddToUserCart = (goodId) => {
    if(!isAuth) alert('Чтобы воспользоваться корзиной - авторизуйтесь');

    dispatch(addToUserCart(goodId))
  };

const renderGoodsByType = (typeId) => {
    if (!goods) return [];

    return goods
      .filter((good) => good?.typeId === typeId)
      .map((good, index) => (
        <div style={{height:'95%',minWidth:'40%'}} key={index} className='item'>
          <img src={`${process.env.REACT_APP_PUBLIC_API_URL}` + good?.img} alt='product' />
          <h5>{good?.name}</h5>
          <b>{good?.price}₽</b>
          <div className='add-to-cart' onClick={() => onAddToUserCart(good?.id)}>
            +
          </div>
        </div>
      ));
  };

    return(
        <main style={{display:"flex",justifyContent:"center",alignItems:'center',flexDirection:'column'}}>
            <div style={{textAlign: 'center', fontSize: '44px', fontFamily: 'Playfair Display'}}>Десерты</div>
                <div className="cards" style={{marginTop:22,height:600,display:"flex",justifyContent:"center",alignItems:'center',flexDirection:'row'}}>
                     {renderGoodsByType(2)}
                </div>
            <div style={{textAlign: 'center', fontSize: '44px', fontFamily: 'Playfair Display'}}>Кофе</div>
            <div className="cards" style={{marginTop:5,height:550,display:"flex",justifyContent:"center",alignItems:'center',flexDirection:'row'}}>
                     {renderGoodsByType(1)}
                </div>
        </main>
    )

    
}

export default Menu;
