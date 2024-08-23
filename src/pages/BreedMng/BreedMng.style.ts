import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const TopWrap = styled.div`
  background-color: #e7f5ff;
  height: 100px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OptionBox = styled.div`
  margin-right: 10px;
  &last-child {
    margin-right: 0;
  }
`;

export const OptionTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const ContentWrap = styled.div`
  height: 500px;
  border: 1px solid #e7f5ff;
`;
