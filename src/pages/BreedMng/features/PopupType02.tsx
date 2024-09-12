import { SubmitHandler, useForm } from "react-hook-form";
import * as S from "../BreedMng.style";
import AnimalBreed, { ReqCreateMetaList } from "../../../api/AnimalBreed";
import { useNavigate } from "react-router-dom";
import Selector, { ListItem } from "../../../components/Selector/Selector";
import { FCI_GROUP } from "../constants";
import { useState } from "react";

const PopupType02 = () => {
  const navigate = useNavigate();

  const [selectedListItem, setSelectedListItem] = useState<ListItem>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReqCreateMetaList>();

  const submitForm: SubmitHandler<ReqCreateMetaList> = async (data) => {
    try {
      await AnimalBreed.createLists(data);
      alert("등록 완료");
      navigate("/");
    } catch (e) {
      console.log("등록에 실패했습니다:", e);
      alert("등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <S.PopContainer>
      <h2>신규 작성</h2>
      <S.CreateForm onSubmit={handleSubmit(submitForm)}>
        <ul>
          <li>
            <h3>품종</h3>
            <S.PopInput
              {...register("kind", {
                required: { value: true, message: "품종을 입력해주세요" },
              })}
              type="text"
            />
            <S.ErrorMsg>{errors.kind?.message}</S.ErrorMsg>
          </li>
          <li>
            <h3>하위 품종</h3>
            {/* <Selector
              selected={selectFCI?.label}
              placeholder="선택해주세요"
              list={OPTIONS}
              onSelected={(item) => setSelectFCI(item)}
              width="150px"
            /> */}
          </li>
          <li>
            <h3>매칭 데이터</h3>
            {/* <Selector
              selected={selectFCI?.label}
              placeholder="선택해주세요"
              list={OPTIONS}
              onSelected={(item) => setSelectFCI(item)}
              width="150px"
            /> */}
          </li>
          <li>
            <h3>FCI 그룹</h3>
            <Selector
              selected={selectedListItem?.label}
              placeholder="선택해주세요"
              list={FCI_GROUP}
              onSelected={(item) => setSelectedListItem(item)}
              width="150px"
            />
          </li>
          <li>
            <h3>출생지 :</h3>
            <S.PopInput
              {...register("country", {
                required: { value: true, message: "출생지를 입력해주세요" },
              })}
              type="text"
            />
            <S.ErrorMsg>{errors.country?.message}</S.ErrorMsg>
          </li>
        </ul>
        {/* 버튼은 form 안에 넣기 !!! - 다시 수정 */}
        <S.ButtonRow>
          <button type="submit">저장</button>
        </S.ButtonRow>
      </S.CreateForm>
    </S.PopContainer>
  );
};

export default PopupType02;
