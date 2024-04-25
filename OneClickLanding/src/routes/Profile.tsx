import { useState } from "react";
import SideNavbar from "@/components/ui/sideNavbar";
import {
  Divider,
  Input,
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { Modal } from "@nextui-org/react";
import { deleteAllData, exportCSV } from "@/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileArrowDown,
  faFloppyDisk,
  faGear,
  faKey,
  faTrash,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { Accordion, AccordionItem } from "@nextui-org/react";

async function handleDelete(onClose: any, setLoading: any) {
  setLoading(true);
  await deleteAllData();
  setLoading(false);
  onClose();
}

function Profile() {
  const [open, setOpen] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <SideNavbar></SideNavbar>
      <div className="ml-6 flex flex-row justify-between h-full bg-backgroundColor w-12/12 dark">
        <div className="ml-32 py-12 h-screen w-10/12 flex flex-col items-center">
          <h1 className="text-gray-200 font-bold text-2xl ml-10 self-start">
            Settings
          </h1>
          <div className="self-start ml-10 w-full">
            <Divider className="my-1 bg-accentColorText " />
            <Accordion className="py-4">
              <AccordionItem
                className="text-white text-lg"
                key="1"
                title="Password Generator"
                indicator={<FontAwesomeIcon icon={faKey} />}
              >
                <div className="py-4 flex flex-row justify-between ">
                  <label className="text-gray-300">
                    Character count
                  </label>
                  <Input type="number" className="w-2/4"></Input>
                </div>
                <div className="py-4 flex flex-row justify-between ">
                  <label className="text-gray-300">Caracteristicas</label>
                  <Input type="number" className="w-2/4"></Input>
                </div>
              </AccordionItem>
              <AccordionItem
                className="text-white text-lg"
                key="2"
                title="Other settings"
                indicator={<FontAwesomeIcon icon={faGear} />}
              >
                <div className="py-4 flex flex-row justify-between ">
                  <label className="text-gray-300">Export data</label>
                  <Button
                    variant="flat"
                    color="primary"
                    isLoading={loadingExport}
                    startContent={<FontAwesomeIcon icon={faFileArrowDown} />}
                    onClick={function () {
                      exportCSV(setLoadingExport);
                    }}
                  >
                    Export data
                  </Button>
                </div>
              </AccordionItem>
              <AccordionItem
                className="text-white text-lg"
                key="3"
                title="Dangerous settings"
                subtitle="Do not touch unless you have the right knowledge."
                indicator={<FontAwesomeIcon icon={faTriangleExclamation} />}
                disableIndicatorAnimation={true}
              >
                <div className="py-4 flex flex-row justify-between ">
                  <label className="text-gray-300">
                    Cantidad de caracteres
                  </label>
                  <Input type="number" className="w-2/4"></Input>
                </div>
                <div className="py-4 flex flex-row justify-between ">
                  <label className="text-gray-300">Delete data</label>
                  <Button
                    variant="flat"
                    color="danger"
                    onClick={function () {
                      setOpen(true);
                    }}
                    startContent={<FontAwesomeIcon icon={faTrash} />}
                  >
                    Delete data
                  </Button>
                </div>
              </AccordionItem>
            </Accordion>
            <div className="w-full flex flex-row justify-end">
              <Button variant="flat" color="success" className="mr-2" startContent={<FontAwesomeIcon icon={faFloppyDisk} />}>
                Save changes
              </Button>
            </div>
          </div>
        </div>
        <Modal
          isOpen={open}
          onOpenChange={setOpen}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Delete all your data?
                </ModalHeader>
                <ModalBody>
                  <p>
                    Once deleted, all your existing data will be gone. Are you sure?
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    startContent={
                      <FontAwesomeIcon icon={faTriangleExclamation} />
                    }
                    isLoading={loading}
                    onClick={function () {
                      handleDelete(onClose, setLoading);
                    }}
                  >
                    Yes, delete it!
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}

export default Profile;
