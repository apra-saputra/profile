import React, { useState, Suspense } from "react";
import { Components, Forms, Tables } from "./containers";
import { Button } from "@/components/elements/buttons";
import {
  TabContainerType,
  TabContainer,
  TapsHead,
} from "@/components/elements/tabContainer/TabContainer";
import PageLoading from "@/components/PageLoading";

const MyComponent: React.FC = () => {
  const [tabId, setTabId] = useState<number>(0);

  const tabMenu: TabContainerType[] = [
    { id: 1, name: "components" },
    { id: 2, name: "table" },
    { id: 3, name: "forms" },
  ];

  const renderContainer = () => {
    switch (tabId) {
      case 0:
        return <Components />;
      case 1:
        return <Tables />;
      case 2:
        return <Forms />;
    }
  };

  return (
    <React.Fragment>
      <section className="min-h-[600px] flex flex-col justify-center items-start gap-2 px-4 max-w-screen-2xl mx-auto">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold">MyComponent</h1>
          <p className="line-clamp-3">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore
            omnis, obcaecati expedita veritatis illo est, rem amet labore
            praesentium modi nam exercitationem aliquid sit voluptatum quam quae
            aliquam eius unde? Nam suscipit sapiente earum nihil saepe ipsam
            aspernatur, ad nisi eaque accusamus eum? Itaque soluta cupiditate
            doloribus odio laudantium. Id incidunt consectetur aspernatur
            excepturi doloribus itaque voluptatem temporibus dolores distinctio.
          </p>
        </div>
        <div className="flex gap-2">
          <Button type="button">admin cms</Button>
        </div>
      </section>

      <section className="min-h-screen px-4 w-full max-w-screen-2xl mx-auto">
        <TapsHead tabMenu={tabMenu} value={tabId} setValue={setTabId} />
        <Suspense fallback={<PageLoading />}>
          <TabContainer>{renderContainer()}</TabContainer>
        </Suspense>
      </section>
    </React.Fragment>
  );
};

export default MyComponent;
