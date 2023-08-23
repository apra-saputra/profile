import React, { useState } from "react";
import { CircleAvatar } from "@/components/elements/avatar";
import { Button } from "@/components/elements/buttons";
import { Dropdown } from "@/components/elements/dropdown";
import { Input } from "@/components/elements/inputs";
import { MenuDropdown } from "@/components/elements/dropdown/Dropdown";
import ButtonSection from "./components/ButtonSection";
import ModalSection from "./components/ModalSection";

const Components: React.FC = () => {
  // dropdown
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const menuDropDown: MenuDropdown[] = [
    { name: "test 1" },
    { name: "test 2" },
    { name: "test 3", isDisable: true },
  ];

  return (
    <div className="border-2 rounded-lg p-1 relative">
      <div className="w-full p-2 flex items-center justify-between">
        <h3 className="text-2xl font-medium uppercase">head title</h3>
        <div className="flex items-center gap-2">
          <p>search</p>
          <CircleAvatar height={10} />
        </div>
      </div>
      <hr className="w-full absolute right-0 border-t-2" />
      <div className="p-2 flex flex-col gap-2">
        <div className="flex justify-between items-center w-full">
          <h3 className="text-2xl font-medium">card title</h3>
          <div className="flex gap-2 items-center">
            <Input type="date" size="sm" />
            <Dropdown
              isOpen={openDropdown}
              setIsOpen={setOpenDropdown}
              menus={menuDropDown}
            >
              <Button
                type="button"
                size="sm"
                onClick={() => setOpenDropdown((prev) => !prev)}
              >
                dropdown
              </Button>
            </Dropdown>
          </div>
        </div>
        <div className="bg-disable p-1 rounded-lg flex items-center w-fit gap-2">
          <div className="bg-background px-4 py-1 rounded-lg cursor-pointer">
            <span className="text-gray-300 font-thin">text-1</span>
          </div>
          <div className="px-2 py-1 rounded-lg cursor-pointer">
            <span className="text-gray-300 font-thin">text-2</span>
          </div>
          <div className="px-2 py-1 rounded-lg cursor-pointer">
            <span className="text-gray-300 font-thin">text-3</span>
          </div>
          <div className="px-2 py-1 rounded-lg cursor-pointer">
            <span className="text-gray-300 font-thin">text-4</span>
          </div>
        </div>
        <div className="flex gap-4 md:flex-row flex-col">
          <ButtonSection />
          <ModalSection />
        </div>
      </div>
    </div>
  );
};

export default Components;
