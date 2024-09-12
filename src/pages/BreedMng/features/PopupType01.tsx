import { useEffect, useState } from "react";
import AnimalBreed, { DetailMetaInfo } from "../../../api/AnimalBreed";
import * as S from "../BreedMng.style";

// type Props = {
//   selectedItem?: MetaInfo;
// };

type Props = {
  selectedItemId?: number;
};

const PopupType01 = ({ selectedItemId }: Props) => {
  const [selectedItem, setSelectedItem] = useState<DetailMetaInfo>();

  useEffect(() => {
    if (!selectedItemId) return;
    const fetchData = async () => {
      try {
        const data = await AnimalBreed.detailLists(selectedItemId);
        setSelectedItem(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [selectedItemId]);

  return (
    <S.PopContainer>
      <h2>푸들</h2>
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
            {selectedItem?.matchingDataList?.map((item) => (
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
