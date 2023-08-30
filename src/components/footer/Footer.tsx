import React from "react";
import { CONTACT } from "@/utils/constants/menu";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const redirectTo = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <footer className="w-full shadow bg-secondary border-gray-200">
      <div className="h-fit max-w-screen-2xl flex flex-wrap flex-col md:flex-row items-center md:justify-between justify-center mx-auto py-10 px-10 gap-4 md:gap-0">
        <div>
          <span>
            <strong>copyright </strong>©2023 | Power by React
          </span>
        </div>
        <div className="flex flex-col items-center gap-4" id="contact">
          <h2>Contact Developer @apra-saputra</h2>
          <ul className="flex gap-2 item-center">
            {CONTACT.map((item) => {
              return (
                <li
                  className={`flex flex-row items-center gap-2 cursor-pointer hover:text-accent transition-all duration-300`}
                  onClick={() => redirectTo(item.url)}
                  key={item.name}
                >
                  <img
                    src={item.logo}
                    width={25}
                    height={25}
                    alt="logo"
                    className={``}
                  />
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
