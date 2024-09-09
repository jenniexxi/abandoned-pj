import styled from "styled-components";

export const SelectBox = styled.div<{ $width?: string }>`
  width: ${(props) => props.$width || "200px"};
  position: relative;
`;

export const ItemSelect = styled.div<{ $isOpen?: boolean }>`
  width: 100%;
  height: 35px;
  border: 1px solid ${({ $isOpen }) => ($isOpen ? "#f7e4ff" : "#ccc")};
  box-shadow: 2px 2px 5px #f1f3f5;
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  background-color: #fff;
  cursor: pointer;
`;

export const ItemList = styled.ul`
  width: 100%;
  border: 1px solid #f7e4ff;
  box-shadow: 2px 2px 5px #f1f3f5;
  position: absolute;
  top: 36px;
  left: 0;
  background-color: #fff;
  z-index: 1;
  border-radius: 10px;
  max-height: 150px;
  overflow: scroll;
  li {
    width: 100%;
    padding: 10px;
    margin: 0 !important;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: #f7e4ff;
    }
  }
`;
