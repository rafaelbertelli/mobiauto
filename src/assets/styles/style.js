import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;

  .wrapper {
    flex-direction: column;
    text-align: center;
  }

  .default-mb {
    margin-bottom: 20px;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
  }
`;
