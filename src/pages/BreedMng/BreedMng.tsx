import * as S from "./BreedMng.style";

const BreedMng = () => {
  return (
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
          <span>출생국</span>
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
        <div>
          <div>340건</div>
          <div>
            <p>*총 0건의 미매칭 데이터가 있습니다.</p>
            <button>신규 작성</button>
          </div>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>FCI 그룹</th>
                <th>품종</th>
                <th>출생지</th>
                <th>매칭 데이텃 수</th>
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
            </tbody>
          </table>
        </div>
      </S.ContentWrap>
      <div>
        <button>first</button>
        <button>prev</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>next</button>
        <button>end</button>
      </div>
      <div></div>
    </S.Container>
  );
};

export default BreedMng;
