import { Link } from "react-router-dom";
import styled from "styled-components";

export const Asidewrap = styled.aside`
  width: 250px;
  height: 100%;
  min-height: 800px;
`;

export const LogoBox = styled.div`
  background-color: #f1f3f5;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-top: 15px;
`;

export const MenuList = styled.nav`
  margin-top: 30px;
  background-color: #f1f3f5;
  height: 600px;
  li {
  }
`;

export const TextLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.lightversion.primary};
  display: block;
  padding: 10px;
`;
