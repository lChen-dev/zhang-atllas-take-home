import styled from 'styled-components';

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
`;

export const ActionPad = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
  background-color: #2a343a;
`;

export const AgentsContainer = styled.div`
  padding: 20px 0;
  flex: 12;
  display: flex;
  justify-content: flex-start;
  overflow-x: scroll;
`;