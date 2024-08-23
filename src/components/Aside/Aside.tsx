import * as S from "./Aside.style";

const Aside = () => {
  return (
    <S.Asidewrap>
      <h1>로고</h1>
      <S.Title>동물 품종 데이터 관리</S.Title>
      <S.MenuList>
        <li>
          <S.TextLink to="/">Home</S.TextLink>
        </li>
        <li>
          <S.TextLink to="/">menu1</S.TextLink>
        </li>
        <li>
          <S.TextLink to="/">menu2</S.TextLink>
        </li>
      </S.MenuList>
    </S.Asidewrap>
  );
};

export default Aside;