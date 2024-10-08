import { SubmitHandler, useForm } from "react-hook-form";
import * as S from "../BreedMng.style";
import AnimalBreed, { ReqCreateMetaList } from "../../../api/AnimalBreed";
import { useNavigate } from "react-router-dom";
import Selector, { ListItem } from "../../../components/Selector/Selector";
import { FCI_GROUP } from "../constants";
import { useEffect, useState } from "react";
import MultiSelector from "../../../components/Selector/MultiSelector";

type Props = {
  externalItem?: string[];
  childKindItem?: { id: number; kind: string }[];
  onPopClose?: () => void;
};

const PopupType02 = ({ externalItem, childKindItem, onPopClose }: Props) => {
  const navigate = useNavigate();

  const [selectedListItem, setSelectedListItem] = useState<ListItem>();
  const [matchingListItem, setMatchingListItem] = useState<ListItem>();
  const [selectChildKind, setSelectChildKind] = useState<ListItem>();

  const [childKind, setChildKind] = useState<ListItem[]>([]);
  const [matchingData, setMatchingData] = useState<ListItem[]>([]);

  // fetchedExternalItem : 매칭
  const [fetchedExternalItem, setFetchedExternalItem] = useState<string[]>(
    externalItem || []
  );
  const [fetchedChildKindItem, setFetchedChildKindItem] = useState<
    { id: number; kind: string }[]
  >(childKindItem || []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReqCreateMetaList>();

  const fetchData = async () => {
    try {
      const response = await AnimalBreed.getListsPop();
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

  const submitForm: SubmitHandler<ReqCreateMetaList> = async (data) => {
    try {
      await AnimalBreed.createLists(
        {
          ...data,
          // childKindCodeList 가져오는 값이 이상함
          childKindCodeList: childKind.map((item) => {
            return { id: parseInt(item.value), kind: item.label };
          }),
          externalDataList: matchingData.map((item) => item.label),
        },
        0,
        parseInt(selectedListItem?.value || "1")
      );
      alert("등록 완료");

      if (onPopClose) {
        onPopClose();
      }

      navigate(0);
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
          <MultiSelector
            selected={selectChildKind?.label}
            placeholder="선택해주세요"
            list={childKindList}
            onSelected={(item) => {
              setSelectChildKind(item);
            }}
            title="하위 품종"
            width="150px"
            selectedItem={setChildKind}
          />
          {/* <S.ListItem>
            <S.PartBox>
              <h3>하위 품종</h3>
              <MultiSelector
                selected={selectChildKind?.label}
                placeholder="선택해주세요"
                list={childKindList}
                onSelected={(item) => {
                  setSelectChildKind(item);
                  setChildKind((prev) => {
                    const list = new Set([...prev, item.label]);
                    return [...list];
                  });
                }}
                width="150px"
              />
            </S.PartBox>
            <S.TagBox>
              {childKind.map((item) => (
                <span
                  onClick={() => {
                    const result = childKind.filter((childKind) => 
                      childKind !== item
                    );
                    setChildKind(result)
                  }}
                >
                  {item}
                </span>
              ))}
            </S.TagBox>
          </S.ListItem> */}
          <li>
            <MultiSelector
              selected={matchingListItem?.label}
              placeholder="선택해주세요"
              list={externalItemList}
              onSelected={(item) => setMatchingListItem(item)}
              width="150px"
              title="매칭 데이터"
              selectedItem={setMatchingData}
            />
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
