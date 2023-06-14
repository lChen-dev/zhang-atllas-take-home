import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background-color: #F5F5DC;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(79, 82, 177, 0.35);
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 15px;
  cursor: pointer;
  transition: 1s;
  margin-right: 24px;
  margin-left: 24px;
  &:hover {
    box-shadow: 3px 3px 50px 1px #ffAA99;
  }
  @media screen and (min-width: 640px) {
    display: inline-flex;
    
    min-width: 150px;
  }
  h4 {
    color: #663399;
    text-align: center;
    font-weight: bold;
    text-shadow: 0px 6px 15px #000000;
    margin-top: 20px;
  }
`;

export const AvatarHolder = styled.div`
  flex: 5;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const AgentBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 10;
  overflow-y: hidden;
  & > div {
    flex: 1;
    overflow-y: hidden;
    text-overflow: ellipsis;
  }
  Button {
    color: #E9967A;
    text-align: right;
  }
`;

export const AgentAddress = styled.div`
  display: flex;
  flex-basis: 50px;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #BC8F8F;
  border-radius: 10px;
  font-weight: bold;
  color: #007A7A;
  padding: 5px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AgentAreas = styled.div`
  display: flex;
  flex-basis: 100px;
  flex-wrap: wrap;
  overflow: auto;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-items: center;
  span {
    font-weight: 500;
    margin: 5px;
    padding: 5px;
    height: fit-content;
    color: black;
    background-color: azure;
  }
`;