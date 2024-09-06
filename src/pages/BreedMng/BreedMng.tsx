import { useState } from "react";
import Modal from "../../components/Modal";
import Portal from "../../components/Portal";
// import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import * as S from "./BreedMng.style";
import AnimalBreed from "../../api/AnimalBreed";
import Selector, { ListItem } from "../../components/Selector/Selector";
import { COUNTRY, FCI_GROUP, OPTIONS } from "./constants";
import dayjs from "dayjs";

type PopupType = "type1" | "type2" | "type3";

const BreedMng = () => {
  const [isPopup, setIsPopup] = useState(false);
  // const [selectedFCI, setSelectedFCI] = useState<number | undefined>();
  // const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
  // const [breed, setBreed] = useState<string | undefined>();

  const [selectValue, setSelectValue] = useState<ListItem>();
  const [popupType, setPopupType] = useState<PopupType>("type1");

  const popupOpen = (type: PopupType) => {
    setPopupType(type);
    setIsPopup(true);
  };

  const popupClose = () => {
    setIsPopup(false);
  };

  // const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["getBreed"],
    queryFn: () => AnimalBreed.getLists(),
  });

  return (
    <>
      <S.Container>
        <S.TopWrap>
          <S.OptionBox>
            <S.OptionTitle>FCI 그룹</S.OptionTitle>
            <Selector
              selected={selectValue?.label}
              placeholder="선택해주세요"
              list={OPTIONS}
              onSelected={(item) => setSelectValue(item)}
              width="100px"
            />


            <select>
              {FCI_GROUP.map((item) => (
                <option value={item.value} key={"FCI" + item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </S.OptionBox>
          <S.OptionBox>
            <S.OptionTitle>출생국</S.OptionTitle>
            <select>
              {COUNTRY.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.value}
                </option>
              ))}
              <option value="">전체</option>
              <option value="">옵션1</option>
            </select>
          </S.OptionBox>
          <S.OptionBox>
            <input type="text" placeholder="품종을 입력해주세요" />
            <button>검색</button>
          </S.OptionBox>
        </S.TopWrap>
        <S.ContentWrap>
          <S.TableInfoWrap>
            <S.SearchCase>{data?.count}건</S.SearchCase>
            <S.InfoBox>
              <p>
                *총 <span>0</span>건의 미매칭 데이터가 있습니다.
              </p>
              <button onClick={() => popupOpen("type1")}>상세 보기</button>
              <button onClick={() => popupOpen("type2")}>신규 작성</button>
            </S.InfoBox>
          </S.TableInfoWrap>
          <S.TableContainer>
            <table>
              <thead>
                <tr>
                  <th>FCI 그룹</th>
                  <th>품종</th>
                  <th>출생지</th>
                  <th>매칭 데이터 수</th>
                  <th>최근 작업일 |작업자</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.animalList.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.kind}</td>
                    <td>{item.country}</td>
                    <td>{item.matchingDataList.length}</td>
                    <td>
                      {dayjs(item.updatedAt).format("YY.MM.DD")} |
                      {item.memberName}
                    </td>
                    <td>
                      <button>수정</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </S.TableContainer>
        </S.ContentWrap>
        <S.PagingWrap>
          <S.BtnFirst>&lt;&lt;</S.BtnFirst>
          <S.BtnPrev>&lt;</S.BtnPrev>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <S.BtnNext>&gt;</S.BtnNext>
          <S.BtnEnd>&gt;&gt;</S.BtnEnd>
        </S.PagingWrap>
      </S.Container>
      {isPopup && (
        <Portal>
          <Modal
            type="center"
            backDropAnimation={false}
            onClickBackDrop={popupClose}
          >
            {popupType === "type1" && (
              <S.PopContainer>
                <h2>푸들</h2>
                <S.VarietyList>
                  <li>
                    <h3>하위 품종</h3>
                    <S.DataBox>
                      <span>토이 푸들</span>
                      <span>미디엄 푸들</span>
                      <span>미니어처 푸들</span>
                      <span>스탠다드 푸들</span>
                      <span>토이 푸들</span>
                      <span>토이 푸들</span>
                      <span>토이 푸들</span>
                      <span>토이 푸들</span>
                    </S.DataBox>
                  </li>
                  <li>
                    <h3>매칭 데이터</h3>
                    <S.DataBox>
                      <span>푸들</span>
                      <span>토이 푸들</span>
                      <span>푸들</span>
                      <span>토이 푸들</span>
                      <span>푸들</span>
                      <span>토이 푸들</span>
                      <span>푸들</span>
                      <span>토이 푸들</span>
                      <span>푸들</span>
                      <span>토이 푸들</span>
                    </S.DataBox>
                  </li>
                  <S.ListType>
                    <h3>FCI 그룹 : </h3>
                    <span>8</span>
                  </S.ListType>
                  <S.ListType>
                    <h3>출생지 : </h3>
                    <span>프랑스</span>
                  </S.ListType>
                </S.VarietyList>
                <S.ButtonRow>
                  <button type="button">수정</button>
                </S.ButtonRow>
              </S.PopContainer>
            )}
            {popupType === "type2" && (
              <S.PopContainer>
                <S.CreateForm>
                  <ul>
                    <li>
                      <h3>품종</h3>
                      <S.PopInput type="text" />
                    </li>
                    <li>
                      <h3>하위 품종</h3>
                      <Selector
                        selected={selectValue?.label}
                        placeholder="선택해주세요"
                        list={OPTIONS}
                        onSelected={(item) => setSelectValue(item)}
                        width="150px"
                      />
                    </li>
                    <li>
                      <h3>매칭 데이터</h3>
                      <Selector
                        selected={selectValue?.label}
                        placeholder="선택해주세요"
                        list={OPTIONS}
                        onSelected={(item) => setSelectValue(item)}
                        width="150px"
                      />
                    </li>
                    <li>
                      <h3>FCI 그룹</h3>
                      <Selector
                        selected={selectValue?.label}
                        placeholder="선택해주세요"
                        list={OPTIONS}
                        onSelected={(item) => setSelectValue(item)}
                        width="150px"
                      />
                    </li>
                    <li>
                      <h3>출생지 :</h3>
                      <S.PopInput type="text" />
                    </li>
                  </ul>
                </S.CreateForm>
                <S.ButtonRow>
                  <button type="button">저장</button>
                </S.ButtonRow>
              </S.PopContainer>
            )}
            {popupType === "type3" && <></>}
          </Modal>
        </Portal>
      )}
    </>
  );
};

export default BreedMng;
