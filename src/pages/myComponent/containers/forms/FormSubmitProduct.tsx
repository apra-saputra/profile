import React, { useState } from "react";
import { Input, SelectOption, TextArea } from "@/components/elements/inputs";
import { Button } from "@/components/elements/buttons";

const FormSubmitProduct: React.FC = () => {
  const [namaProduct, setNamaProduct] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priceProduct, setPriceProduct] = useState<string>("");
  const [stockProduct, setStockProduct] = useState<string>("");
  const [tag, setTag] = useState<string>("");

  const tags: {
    value: string | number;
    name: string;
  }[] = [
    { value: 1, name: "tag 1" },
    { value: 2, name: "tag 2" },
    { value: 3, name: "tag 3" },
    { value: 4, name: "tag 4" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNamaProduct("");
    setDescription("");
    setPriceProduct("");
    setStockProduct("");
    setTag("");
  };

  return (
    <div className="border rounded-md min-w-[820px] bg-background px-6 py-4 flex flex-col gap-8">
      <div className="flex flex-col border-b border-primary pb-2">
        <h1 className="text-3xl font-semibold">Submit Product</h1>
      </div>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
        onReset={handleSubmit}
      >
        <div className="flex justify-between md:flex-row flex-col items-center gap-4">
          <div className="w-full">
            <p>Nama Product</p>
            <Input
              type="text"
              value={namaProduct}
              onChange={(e) => setNamaProduct(e.target.value)}
              onReset={() => setNamaProduct("")}
            />
          </div>
          <div className="w-full">
            <p>Tag</p>
            <SelectOption
              options={tags}
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              width="w-full"
              defautText="Choose Tag"
            />
          </div>
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="w-full">
            <p>price</p>
            <Input
              type="number"
              value={priceProduct}
              onChange={(e) => setPriceProduct(e.target.value)}
              onReset={() => setPriceProduct("")}
              inputMode="numeric"
              pattern="[0-9]"
            />
          </div>
          <div className="w-full">
            <p>stock</p>
            <Input
              type="number"
              value={stockProduct}
              onChange={(e) => setStockProduct(e.target.value)}
              onReset={() => setStockProduct("")}
              inputMode="numeric"
            />
          </div>
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="w-full">
            <p>Description</p>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              height="min-h-[200px]"
            />
          </div>
        </div>

        <div className="my-4 flex item-center justify-end">
          <Button
            type="reset"
            background="bg-gradient-to-br from-secondary to-70% to-primary mx-2"
          >
            clear
          </Button>
          <Button
            type="submit"
            background="bg-gradient-to-br from-accent to-50% to-primary"
          >
            Submit
          </Button>
          <div className="text-accent cursor-pointer hover:text-text text-center"></div>
        </div>
      </form>
    </div>
  );
};

export default FormSubmitProduct;
