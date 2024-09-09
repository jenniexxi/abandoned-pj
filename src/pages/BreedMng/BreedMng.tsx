import { useState } from "react";
import Modal from "../../components/Modal";
import Portal from "../../components/Portal";
// import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import * as S from "./BreedMng.style";
import AnimalBreed, { MetaInfo } from "../../api/AnimalBreed";
import Selector, { ListItem } from "../../components/Selector/Selector";
import { OPTIONS } from "./constants";
import dayjs from "dayjs";
import Pagination from "../../components/Pagination/Pagination";

type PopupType = "type1" | "type2" | "type3";

const BreedMng = () => {
  const [isPopup, setIsPopup] = useState(false);
  // const [selectedFCI, setSelectedFCI] = useState<number | undefined>();
  // const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
  // const [breed, setBreed] = useState<string | undefined>();

  const [selectFCI, setSelectFCI] = useState<ListItem>();
  const [selectCountry, setSelectCountry] = useState<ListItem>();
  const [selectedItem, setSelectedItem] = useState<MetaInfo>();
  const [popupType, setPopupType] = useState<PopupType>("type1");
  const [page, setPage] = useState(0);

  const popupOpen = (type: PopupType) => {
    setPopupType(type);
    setIsPopup(true);
  };

  const popupClose = () => {
    setIsPopup(false);
  };

  // const queryClient = useQueryClient();

  const { data } = useQuery({
    // queryKey에서 page 의 역할은 useEffect 와 동일
    queryKey: ["getBreed", page],
    queryFn: () =>
      AnimalBreed.getLists(undefined, undefined, undefined, page + 1),
  });

  const onClickListTr = (selectedItem: MetaInfo) => {
    setSelectedItem(selectedItem);
  };

  return (
    <>
      <S.Container>
        <S.TopWrap>
          <S.OptionBox>
            <S.OptionTitle>FCI 그룹</S.OptionTitle>
            <Selector
              selected={selectFCI?.label}
              placeholder="선택해주세요"
              list={
                data?.metaAnimalSearch.fciGroupCodeList.map((item) => {
                  return { label: item.toString(), value: item.toString() };
                }) || []
              }
              onSelected={(item) => setSelectFCI(item)}
              width="110px"
            />
          </S.OptionBox>
          <S.OptionBox>
            <S.OptionTitle>출생국</S.OptionTitle>
            <Selector
              selected={selectCountry?.label}
              placeholder="선택해주세요"
              list={
                data?.metaAnimalSearch.countryList.map((item) => {
                  return { label: item.toString(), value: item.toString() };
                }) || []
              }
              onSelected={(item) => setSelectCountry(item)}
              width="150px"
            />
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
                  <tr
                    key={item.id}
                    onClick={() => {
                      onClickListTr(item);
                      popupOpen("type1");
                    }}
                  >
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
        <Pagination
          currentPage={page}
          totalCount={data?.count || 0}
          // totalCount={575}
          onClickPage={(page) => setPage(page)}
        />
      </S.Container>
      {isPopup && (
        <Portal>
          <Modal
            type="center"
            backDropAnimation={false}
            // onClickBackDrop={popupClose}
            // isCloseBtn={false}
            onHide={popupClose}
          >
            {popupType === "type1" && (
              <S.PopContainer>
                <h2>푸들</h2>
                <S.VarietyList>
                  <li>
                    <h3>하위 품종</h3>
                    <S.DataBox>
                      {selectedItem?.childKindCodeList.map((item) => (
                        <span>{item}</span>
                      ))}
                    </S.DataBox>
                  </li>
                  <li>
                    <h3>매칭 데이터</h3>
                    <S.DataBox>
                      {selectedItem?.matchingDataList.map((item) => (
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
            )}
            {popupType === "type2" && (
              <S.PopContainer>
                <h2>신규 작성</h2>
                <S.CreateForm>
                  <ul>
                    <li>
                      <h3>품종</h3>
                      <S.PopInput type="text" />
                    </li>
                    <li>
                      <h3>하위 품종</h3>
                      <Selector
                        selected={selectFCI?.label}
                        placeholder="선택해주세요"
                        list={OPTIONS}
                        onSelected={(item) => setSelectFCI(item)}
                        width="150px"
                      />
                    </li>
                    <li>
                      <h3>매칭 데이터</h3>
                      <Selector
                        selected={selectFCI?.label}
                        placeholder="선택해주세요"
                        list={OPTIONS}
                        onSelected={(item) => setSelectFCI(item)}
                        width="150px"
                      />
                    </li>
                    <li>
                      <h3>FCI 그룹</h3>
                      <Selector
                        selected={selectFCI?.label}
                        placeholder="선택해주세요"
                        list={
                          data?.metaAnimalSearch.fciGroupCodeList.map(
                            (item) => {
                              return {
                                label: item.toString(),
                                value: item.toString(),
                              };
                            }
                          ) || []
                        }
                        onSelected={(item) => setSelectFCI(item)}
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
