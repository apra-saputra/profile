import React, { useState, useEffect } from "react";
import { Button } from "@/components/elements/buttons";
import { Modal } from "@/components/elements/modals";
import useSweetAlert from "@/hooks/useSweetAlert";

const ModalSection: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [alertSuccess, setAlertSuccess] = useState<boolean>(false);
  const [alertError, setAlertError] = useState<boolean>(false);

  const { toast, confirmBox } = useSweetAlert();

  const handleAlert = (fc: React.Dispatch<React.SetStateAction<boolean>>) => {
    fc((state) => !state);
    setTimeout(() => {
      fc((state) => !state);
    }, 2000);
  };

  const handleConfirm = async () => {
    const result = await confirmBox("confirm box");
    if (result.isConfirmed) toast("confirm box success", "info");
  };

  useEffect(() => {
    if (alertSuccess) {
      toast("success", "success");
    }

    if (alertError) {
      toast("Ooopss! you got error!", "error");
    }
  }, [alertError, alertSuccess]);

  return (
    <div className="flex-1 shrink-[20%] border border-text rounded-xl p-2 md:w-1/3 w-full flex flex-col gap-2">
      <h1 className="text-2xl uppercase font-medium">modal</h1>
      <div className="md:px-10 flex flex-col gap-2 h-full justify-center">
        <div className="flex justify-between items-center w-full">
          <p>Modal Basic</p>
          <Button size="sm" onClick={() => setShowModal((state) => !state)}>
            Show
          </Button>
        </div>
        <div className="flex justify-between items-center w-full">
          <p>Alert Success</p>
          <Button size="sm" onClick={() => handleAlert(setAlertSuccess)}>
            Show
          </Button>
        </div>
        <div className="flex justify-between items-center w-full">
          <p>Alert Error</p>
          <Button size="sm" onClick={() => handleAlert(setAlertError)} isDanger>
            Show
          </Button>
        </div>
        <div className="flex justify-between items-center w-full">
          <p>Confirm Box</p>
          <Button size="sm" onClick={() => handleConfirm()}>
            Show
          </Button>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Modal"
      >
        <div className="p-2">
          <p>this is modal</p>
        </div>
      </Modal>
    </div>
  );
};

export default ModalSection;
