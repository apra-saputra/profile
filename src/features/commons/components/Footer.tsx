import React from "react";
import { contacts } from "@/libs/constants/contact";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const redirectTo = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <footer className="w-full shadow bg-primary text-primary-foreground border-accent border">
      <div className="h-fit max-w-screen-2xl flex flex-wrap flex-col md:flex-row items-center md:justify-between justify-center mx-auto py-10 px-10 gap-4 md:gap-0">
        <div>
          <span>
            <strong>copyright </strong>©2023 | Power by React
          </span>
        </div>
        <div className="flex flex-col items-center gap-4" id="contact">
          <h4 className="">Contact Developer @apra-saputra</h4>
          <ul className="flex gap-2 item-center">
            {contacts.map((item) => {
              return (
                <li
                  className={`flex flex-row items-center gap-2 cursor-pointer hover:text-accent transition-all duration-300`}
                  onClick={() => redirectTo(item.url)}
                  key={item.name}
                >
                  {/* <img
                    src={item.logo}
                    width={25}
                    height={25}
                    alt="logo"
                    className={``}
                  /> */}
                  {<item.logo size={'1rem'}/>}
                  <span className="text-md font-semibold">{item.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
