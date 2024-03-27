import logo from '../../styles/logo.png';
import { NavBar, HeaderWrapper, NavText, Logo } from './Header.styled';
import { Container } from 'components';
import { useTheme } from '@emotion/react';

export const Header = () => {
  const theme = useTheme();

  return (
    <>
      <NavBar>
        <Container>
          <HeaderWrapper>
            <Logo src={logo} size="40px" color={theme.colors.accent} />

            <NavText>Notes</NavText>
          </HeaderWrapper>
        </Container>
      </NavBar>
    </>
  );
};
