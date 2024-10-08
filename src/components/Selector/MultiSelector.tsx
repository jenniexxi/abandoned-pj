import { useEffect, useRef, useState } from "react";
import * as S from "./Selector.style";
import Arrow from "../../resources/svg/arrow";

export type ListItem = {
  label: string;
  value: string;
};

type Props = {
  selected?: string;
  list: ListItem[];
  placeholder: string;
  onSelected: (item: ListItem) => void;
  width?: string;
  title?: string;
  selectedItem: (items: ListItem[]) => void;
};

const MultiSelector = ({
  selected,
  list,
  placeholder,
  onSelected,
  width,
  title,
  selectedItem,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [childKind, setChildKind] = useState<ListItem[]>([]);
  const selectorRef = useRef<HTMLDivElement>(null); //외부 클릭시 감지

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <S.ListItem>
      <S.PartBox>
        <h3>{title}</h3>
        <S.SelectBox ref={selectorRef} $width={width}>
          {/* $isOpen : $ 는 스타일에서만 사용하는 property */}
          <S.ItemSelect
            $isOpen={isOpen}
            $isPlaceholder={!selected}
            onClick={handleOpen}
          >
            {selected ? selected : placeholder}
            <Arrow
              color={!selected ? "#ccc" : "#000"}
              isOpendeg={isOpen ? "180" : "0"}
            />
          </S.ItemSelect>
          {isOpen && (
            <S.ItemList>
              {list.map((item) => {
                return (
                  <li
                    key={item.label}
                    onClick={() => {
                      onSelected(item);
                      setChildKind((prev) => {
                        const list = new Set([...prev, item]);
                        selectedItem([...list]);
                        return [...list];
                      });
                    }}
                  >
                    {item.label}
                  </li>
                );
              })}
            </S.ItemList>
          )}
        </S.SelectBox>
      </S.PartBox>
      <S.TagBox>
        {childKind.map((item) => (
          <span
            onClick={() => {
              const result = childKind.filter(
                (childKind) => childKind !== item
              );
              selectedItem(result);
              setChildKind(result);
            }}
          >
            {item.label}
          </span>
        ))}
      </S.TagBox>
    </S.ListItem>
  );
};

export default MultiSelector;
