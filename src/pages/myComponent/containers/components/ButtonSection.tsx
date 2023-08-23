import React, { useCallback, useState } from "react";
import {
  Button,
  ButtonComponent,
  ButtonGroup,
  ToggleSwitch,
} from "@/components/elements/buttons";
import {
  faExclamationCircle,
  faTrashCan,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ButtonSection: React.FC = () => {
  const [isOn1, setIsOn1] = useState<boolean>(false);
  const [isOn2, setIsOn2] = useState<boolean>(false);
  const [isOn3, setIsOn3] = useState<boolean>(false);

  return (
    <div className="flex-1 shrink-[20%] border border-text rounded-xl p-2 md:w-1/3 w-full flex flex-col gap-2">
      <h1 className="text-2xl uppercase font-medium">button</h1>
      <div className="w-full flex justify-center items-center">
        <ButtonPagination />
      </div>
      <div className="flex justify-center flex-wrap items-center gap-2">
        <Button type="button" size="sm">
          size sm
        </Button>
        <Button type="button">size medium</Button>
        <Button type="button" isDanger>
          medium danger
        </Button>
        <Button type="button" size="lg" isDisabled>
          size larger
        </Button>
        <Button type="button" size="lg" isDanger>
          size larger
        </Button>
      </div>
      <div className="flex flex-col item-center justify-center w-full gap-2 md:px-10">
        <div className="flex justify-between items-center">
          <p>small width 4.5 rem</p>
          <ToggleSwitch
            isOn={isOn1}
            setIsOn={setIsOn1}
            width="4.5rem"
            size="sm"
          />
        </div>
        <div className="flex justify-between items-center">
          <p>medium width 5 rem</p>
          <ToggleSwitch isOn={isOn2} setIsOn={setIsOn2} width="5rem" />
        </div>
        <div className="flex justify-between items-center">
          <p>large width 6 rem</p>
          <ToggleSwitch
            isOn={isOn3}
            setIsOn={setIsOn3}
            size="lg"
            width="6rem"
          />
        </div>
      </div>
      <div className="flex justify-between items-center md:px-10 px-0">
        <h4 className="capitalize">button with icon</h4>
        <div className="flex gap-2">
          <Button size="sm-icon" isDanger>
            <FontAwesomeIcon icon={faXmarkCircle} size="2x" />
          </Button>
          <Button size="sm-icon">
            <FontAwesomeIcon icon={faExclamationCircle} size="2x" />
          </Button>
          <Button size="sm-icon" isDisabled>
            <FontAwesomeIcon icon={faTrashCan} size="2x" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ButtonSection;

type PageNavFunctionType = "prev" | "next" | "page";

const ButtonPagination = () => {
  const data = new Array(20).fill(0).map(() => ({
    id: Math.random().toString(36).substr(2, 9),
  }));

  const [curentPage, setCurentPage] = useState(1);
  const [maxLength] = useState(data.length);
  const [showPage] = useState(5);

  const handlePage = useCallback(
    (nav: PageNavFunctionType, page?: number) => {
      if (curentPage - 1 !== 0 && nav === "prev")
        setCurentPage((state) => state - 1);

      if (curentPage + 1 !== maxLength + 1 && nav === "next")
        setCurentPage((state) => state + 1);

      if (nav === "page" && page) setCurentPage(page);
    },
    [curentPage]
  );

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const halfShowPage = Math.floor(showPage / 2);
    const startPage = Math.max(curentPage - halfShowPage, 1);
    const endPage = Math.min(startPage + showPage - 1, maxLength);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <ButtonComponent
          key={i}
          active={i === curentPage}
          onClick={() => handlePage("page", i)}
        >
          {i}
        </ButtonComponent>
      );
    }

    return pageNumbers;
  };

  return (
    <ButtonGroup>
      <ButtonComponent
        onClick={() => handlePage("prev")}
        isDisabled={curentPage === 1}
      >
        prev
      </ButtonComponent>
      {renderPageNumbers()}
      <ButtonComponent
        onClick={() => handlePage("next")}
        isDisabled={curentPage === maxLength}
      >
        next
      </ButtonComponent>
    </ButtonGroup>
  );
};
