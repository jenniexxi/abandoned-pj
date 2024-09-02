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
  margin-right: 20px;
  &last-child {
    margin-right: 0;
  }
  select {
    width: 100px;
    height: 35px;
    border-radius: 3px;
  }
  input {
    width: 250px;
    height: 35px;
    border-radius: 3px;
    padding-left: 10px;
  }
  button {
    width: 50px;
    height: 35px;
    border-radius: 3px;
    margin-left: 10px;
    background-color: ${({ theme }) => theme.lightversion.fontSecondary};
    color: #fff;
  }
`;

export const OptionTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  margin-right: 10px;
`;

export const ContentWrap = styled.div`
  height: 500px;
`;

export const TableInfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const SearchCase = styled.div``;
export const InfoBox = styled.div`
  display: flex;
  align-items: center;
  p {
    span {
      color: ${({ theme }) => theme.lightversion.primary};
      font-weight: ${({ theme }) => theme.fontWeight.bold};
    }
    &:hover {
      text-decoration: underline;
    }
  }
  button {
    width: 75px;
    height: 30px;
    border-radius: 10px;
    margin-left: 10px;
  }
`;

export const TableContainer = styled.div`
  border: 1px solid #e7f5ff;
  text-align: center;
  margin-top: 10px;
  table {
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize.md};
    thead {
      tr {
        th {
          background-color: #e7f5ff;
          height: 30px;
          line-height: 40px;
          &:first-child {
            width: 10.66%;
          }
          &:nth-child(2) {
            width: 22.66%;
          }
          &:nth-child(3) {
            width: 16.66%;
          }
          &:nth-child(4) {
            width: 16.66%;
          }
          &:nth-child(5) {
            width: 22.66%;
          }
          &:last-child {
            width: 10.7%;
          }
        }
      }
    }
    tbody {
      tr {
        border-bottom: 1px solid #e7f5ff;
        td {
          padding: 8px 6px 4px;
          button {
            width: 45px;
            height: 30px;
            border-radius: 3px;
          }
        }
        &:last-child {
          border: none;
        }
      }
    }
  }
`;

export const PagingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  button {
  }
`;

export const BtnFirst = styled.button``;
export const BtnPrev = styled.button``;
export const BtnNext = styled.button``;
export const BtnEnd = styled.button``;
