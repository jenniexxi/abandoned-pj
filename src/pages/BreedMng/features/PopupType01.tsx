// import { useEffect, useState } from "react";
// import AnimalBreed, { DetailMetaInfo, MetaInfo } from "../../../api/AnimalBreed";
import { useState, useEffect } from "react";
import AnimalBreed, { MetaInfo } from "../../../api/AnimalBreed";
import ListItem from "../../../components/Selector/Selector";
import { FCI_GROUP } from "../constants";
import * as S from "../BreedMng.style";

type Props = {
  externalItem?: string[];
  selectedItem?: MetaInfo;
  childKindItem?: { id: number; kind: string }[];
  onPopClose?: () => void;
};

const PopupType01 = ({ externalItem, selectedItem, childKindItem }: Props) => {
  const [fetchedExternalItem, setFetchedExternalItem] = useState<string[]>(
    externalItem || []
  );
  const [fetchedChildKindItem, setFetchedChildKindItem] = useState<
    { id: number; kind: string }[]
  >(childKindItem || []);

  const fetchData = async (id?: number) => {
    try {
      const response = await AnimalBreed.getListsPop(id);
      console.log("Fetched response:", response);
      if (response) {
        setFetchedExternalItem(response.externalDataList || []);
        setFetchedChildKindItem(response.childKindMetaAnimalList || []);
      }
    } catch (error) {
      console.error("데이터 조회에 실패했습니다:", error);
    }
  };

  useEffect(() => {
    if (!externalItem || !childKindItem) {
      console.log("성공");
      fetchData();
    }
  }, [externalItem, childKindItem]);

  const childKindList: ListItem[] = fetchedChildKindItem.map((item) => ({
    label: item.kind,
    value: item.id.toString(),
  }));

  const externalItemList: ListItem[] = fetchedExternalItem.map((item) => ({
    label: item,
    value: item,
  }));

  console.log(selectedItem);
  fetchData(selectedItem?.id);

  // const [selectedItem, setSelectedItem] = useState<DetailMetaInfo>();
  // useEffect(() => {
  //   if (!selectedItemId) return;
  //   const fetchData = async () => {
  //     try {
  //       const data = await AnimalBreed.getLists(selectedItemId);
  //       // setSelectedItem(data);
  //       console.log('aaaaaa',data)
  //       const selectedAnimal = data.animalList.find(
  //         (item) => item.id === selectedItemId
  //       );
  //       setSelectedItem(selectedAnimal);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   fetchData();
  // }, [selectedItemId]);

  return (
    <S.PopContainer>
      <h2>{selectedItem?.kind}</h2>
      <S.VarietyList>
        <li>
          <h3>하위 품종</h3>
          <S.DataBox>
            {selectedItem?.childKindCodeList?.map((item) => (
              <span>{item}</span>
            ))}
          </S.DataBox>
        </li>
        <li>
          <h3>매칭 데이터</h3>
          <S.DataBox>
            {selectedItem?.externalDataList?.map((item) => (
              <span>{item}</span>
            ))}
          </S.DataBox>
        </li>
        <S.ListType>
          <h3>FCI 그룹 : </h3>
          <span>{selectedItem?.fciGroupCode}</span>
        </S.ListType>
        <S.ListType>
          <h3>출생지 : </h3>
          <span>{selectedItem?.country}</span>
        </S.ListType>
      </S.VarietyList>
      <S.ButtonRow>
        <button type="button">수정</button>
      </S.ButtonRow>
    </S.PopContainer>
  );
};

export default PopupType01;
