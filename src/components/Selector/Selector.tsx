import { useEffect, useRef, useState } from "react";
import * as S from "./Selector.style";

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
};

const Selector = ({ selected, list, placeholder, onSelected, width }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

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
    <S.SelectBox ref={selectorRef} onClick={handleOpen} $width={width}>
      {/* $isOpen : $ 는 스타일에서만 사용하는 property */}
      <S.ItemSelect $isOpen={isOpen}>
        {selected ? selected : placeholder}
      </S.ItemSelect>
      {isOpen && (
        <S.ItemList>
          {list.map((item) => {
            return (
              <li
                key={item.label}
                onClick={() => {
                  onSelected(item);
                  setIsOpen(false);
                }}
              >
                {item.label}
              </li>
            );
          })}
        </S.ItemList>
      )}
    </S.SelectBox>
  );
};

export default Selector;
