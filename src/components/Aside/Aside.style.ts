import { Link } from "react-router-dom";
import styled from "styled-components";

export const Asidewrap = styled.aside`
  width: 250px;
  height: 100%;
  min-height: 800px;
  background-color: #f1f3f5;
  padding: 20px;
`;

export const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-top: 20px;
`;

export const MenuList = styled.nav`
  margin-top: 70px;
  li {
  }
`;

export const TextLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.lightversion.primary};
  display: block;
  padding: 10px;
`;
