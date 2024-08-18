import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Menu1 from '../Menu/Menu1';
import desert from '../../img/1.png';
import desert1 from '../../img/2.png';
import desert2 from '../../img/3.png';
import desert3 from '../../img/4.png';
import desert4 from '../../img/5.png';
import desert5 from '../../img/6.png';
import desert6 from '../../img/7.png';
import desert7 from '../../img/8.png';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import {Fade} from 'react-reveal';
import tables from '../../img/glav.jpg';
import macaroons from '../../img/главная2.png';


const StyledAboutContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;
const StyledTextContainer = styled.div`
  width: 45%;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;
const StyledH1 = styled.h1`
  font-size: 56px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;
const StyledP = styled.p`
  font-size: 27px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
const StyledImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 38%;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;
const StyledImg = styled.img`
  width: 450px;
  height: 450px;
  object-fit: cover;
  margin-bottom: 5px;
  border-radius: 10%;

  @media (max-width: 768px) {
    width: 80%;
    height: auto;
  }
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px;

  @media (max-width: 768px) {
    flex-direction: column; 
    text-align: center;
  }
`;
const TextContainer = styled.div`
  width: 60%;
  margin-top: 13%;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 20px;
  }
`;
const WelcomeText = styled.div`
  color: black;
  font-size: 27px;
  word-wrap: break-word;
  margin-bottom: 10%;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
const Title = styled.div`
  color: black;
  font-size: 64px;
  font-family: 'Playfair Display', serif;
  word-wrap: break-word;
  margin-bottom: 10%;

  @media (max-width: 768px) {
    font-size: 40px; 
  }
`;
const StyledButton = styled(Button)`
  color: white;
  font-size: 33px;
  width: 15%; 
  font-family: 'Playfair Display', serif;
  background-color: #D17E98;

  &:hover {
    color: black;
  }

  @media (max-width: 768px) {
    font-size: 24px;
    width: 50%; 
  }
`;
const Image = styled.img`
  width: 45%;
  display: block;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 20px;
  }
`;


const Glavn2 = () => {

  const goods = useSelector((state) => state.goods.goods.rows);

  const renderAllGoods = () => {
    if(!goods) return [];

   return(
      goods?.map((good,index) => (
        <StyledImg 
          key={index} 
          className={`macar${index}`}
          src={`${process.env.REACT_APP_PUBLIC_API_URL}`+ good?.img} 
          alt={`Macaron-${index}`} 
        />
      ))
   )
  }

    return (
      <main>
        {/* top */}
        <Fade left>
          <Container>
            <TextContainer>
              <WelcomeText>Добро пожаловать в Macaroni Fantasy - Кафе</WelcomeText>
              <Title>Где встречаются кофе и дружба</Title>
              <Link to="/menu">
                <StyledButton variant="white">Меню</StyledButton>
              </Link>
            </TextContainer>
            <Image src={tables} alt="tables" />
          </Container>
        </Fade>
        {/* middle */}
        <div style={{ width: "100%", clear: 'both', textAlign: 'center', backgroundSize: 'cover', backgroundImage: `url(${macaroons})` }}>
            <div style={{ width: '52%', color: 'white', fontSize: '54px', fontFamily: 'Playfair Display', margin: 'auto' }}>Свежая и здоровая еда в любое время суток</div>
            <div style={{ width: '71%', color: 'black', fontSize: '28px', fontFamily: 'Playfair Display', margin: 'auto' }}>
                Добро пожаловать в Macaroni Fantasy. Загляните в очаровательное кондитерское заведение, где вы сможете попробовать наши восхитительные угощения. Наше меню - это удивительное путешествие по вкусам, в нем есть все: от сочного эспрессо до неотразимой выпечки. Ищете ли вы быструю порцию кофеина или уютное местечко для приятного времяпрепровождения с друзьями? Macaroni Fantasy - это ваш рай для расслабления и восстановления сил. Приходите выпить кофе и отведать наши десерты, оставайтесь ради атмосферы.
            </div>
            <div className="image-container">

                <img
                    className="desert"
                    src={desert}
                    alt="desert"
                />
                <img
                    className="desert1"
                    src={desert1}
                    alt="desert"
                />
                <img
                    className="desert2"
                    src={desert2}
                    alt="desert"
                />
                <img
                    className="desert3"
                    src={desert3}
                    alt="desert"
                />
            </div>
            <div className="image-container">
                <img
                    className="desert4"
                    src={desert4}
                    alt="desert"
                />
                <img
                    className="desert5"
                    src={desert5}
                    alt="desert"
                />
                <img
                    className="desert6"
                    src={desert6}
                    alt="desert"
                />
                <img
                    className="desert7"
                    src={desert7}
                    alt="desert"
                />

            </div>
        </div>
        {/* bottom */}
        <Menu1 />
        <StyledAboutContainer className="about-container">
          <StyledTextContainer className="text-container">
            <StyledH1 className="title">Атмосфера, согревающая душу</StyledH1>
            <StyledP className="description">
              Macaroni Fantasy - это больше, чем просто место, где можно насладиться вкусным кофе и выпечкой;
              Это атмосфера, которая окутывает теплом и уютом.
              С того момента, как вы войдете внутрь, вас встретит нежный гул разговора, насыщенный аромат свежесваренного кофе
              и мягкое, манящее освещение, которое задает идеальное настроение.
            </StyledP>
          </StyledTextContainer>
          <StyledImageContainer className="image-container1">
            {renderAllGoods()}
          </StyledImageContainer>
        </StyledAboutContainer>
      </main>
    );
}

export default  Glavn2;
