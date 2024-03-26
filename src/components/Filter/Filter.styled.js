import styled from '@emotion/styled';

export const FormFilter = styled.form`
  position: relative;
`;
export const Input = styled.input`
  width: 275px;
  margin-bottom: 20px;
  padding: 0.5em;
  font-weight: 500;
  font-size: 18px;
  border-radius: 8px;
  border: solid 1px grey;
  outline: none;
`;
export const FilterBtn = styled.button`
  width: 50px;
  height: 50px;

  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.dark};

  position: absolute;
  top: -5px;
  left: 230px;
`;
