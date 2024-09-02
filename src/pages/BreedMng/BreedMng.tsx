import { useState } from "react";
import Modal from "../../components/Modal";
import Portal from "../../components/Portal";
import * as S from "./BreedMng.style";

const BreedMng = () => {
  const [isPopup, setIsPopup] = useState(false);

  const popupOpen = () => {
    setIsPopup(true);
  };

  const popupClose = () => {
    setIsPopup(false);
  };

  return (
    <>
      <S.Container>
        <S.TopWrap>
          <S.OptionBox>
            <S.OptionTitle>FCI 그룹</S.OptionTitle>
            <select>
              <option value="">전체</option>
              <option value="">옵션1</option>
            </select>
          </S.OptionBox>
          <S.OptionBox>
            <S.OptionTitle>출생국</S.OptionTitle>
            <select>
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
            <S.SearchCase>340건</S.SearchCase>
            <S.InfoBox>
              <p>
                *총 <span>0</span>건의 미매칭 데이터가 있습니다.
              </p>
              <button onClick={popupOpen}>신규 작성</button>
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
                  <th>최근 작업일[작업자]</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>7</td>
                  <td>오스트레일리언 캐틀 독</td>
                  <td>호주</td>
                  <td>10</td>
                  <td>24.08.23[유가희]</td>
                  <td>
                    <button>수정</button>
                  </td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>오스트레일리언 캐틀 독</td>
                  <td>호주</td>
                  <td>10</td>
                  <td>24.08.23[유가희]</td>
                  <td>
                    <button>수정</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </S.TableContainer>
        </S.ContentWrap>
        <S.PagingWrap>
          <S.BtnFirst>start</S.BtnFirst>
          <S.BtnPrev>prev</S.BtnPrev>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <S.BtnNext>next</S.BtnNext>
          <S.BtnEnd>end</S.BtnEnd>
        </S.PagingWrap>
      </S.Container>
      {isPopup && (
        <Portal>
          <Modal
            type="center"
            backDropAnimation={false}
            onClickBackDrop={popupClose}
          >
            <div>sdfsdf</div>
          </Modal>
        </Portal>
      )}
    </>
  );
};

export default BreedMng;
