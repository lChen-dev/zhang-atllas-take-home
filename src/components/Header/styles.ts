import styled from 'styled-components';

export const HeaderContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 30px;
  height: 100px;
  width: 100%;
  background-color: black;
  z-index: 50;
  .glow {
    margin: 0;
    color: #00008B;
    font-size: 60px;
    color: #fff;
    text-align: center;
    animation: glow 1s ease-in-out infinite alternate;
    @media screen and (max-width: 900px) {
      font-size: 2.8em;
    }
    @media screen and (max-width: 640px) {
      font-size: 2em;
    }
  }
  @keyframes glow {
    from {
      text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #e60073, 0 0 20px #e60073, 0 0 25px #e60073, 0 0 30px #e60073, 0 0 35px #e60073;
    }
    
    to {
      text-shadow: 0 0 15px #fff, 0 0 20px #ff4da6, 0 0 25px #ff4da6, 0 0 30px #ff4da6, 0 0 35px #ff4da6, 0 0 40px #ff4da6, 0 0 45px #ff4da6;
    }
  }
`;