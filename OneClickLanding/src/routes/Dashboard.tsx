import { useEffect, useState } from "react";
import SideNavbar from "@/components/ui/sideNavbar";
import DashboardCard from "@/components/ui/DashboardCard";
import DashboardTable from "@/components/ui/DashboardTable";
import ScorePanel from "@/components/ui/ScorePanel";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import PasswordDialog from "@/components/ui/password-dialog";
import { Modal } from "@nextui-org/react";
import { getEntries } from "@/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faPlus } from "@fortawesome/free-solid-svg-icons";
import CsvDialog from "@/components/ui/csv-dialog";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [openCsv, setOpenCsv] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [passwordEntries, setPasswordEntries] = useState<JSX.Element[]>([]);

  //Obtiene las credenciales del usuario actual, siempre que las variables entre corchetes cambien.
  useEffect(() => {
    async function fetchData() {
      const entries = await getEntries();

      setPasswordEntries(entries);
    }
    fetchData();
  }, [open, deleted, openCsv, updated]);

  return (
    <>
      <SideNavbar></SideNavbar>
      <div className="ml-6 flex flex-row justify-between h-full bg-backgroundColor w-9/12 dark">
        <ScorePanel passwordEntries={passwordEntries}></ScorePanel>
        <div className="ml-32 py-12 h-screen w-10/12 flex flex-col items-center">
          <h1 className="text-gray-200 font-bold text-2xl ml-10 self-start">
            Bienvenido{" "}
            <span className="text-accentColor">
              {sessionStorage.getItem("username")}
            </span>
          </h1>
          <DashboardCard passwordEntries={passwordEntries} />
          <DashboardTable
            deletedMethod={setDeleted}
            updatedMethod={setUpdated}
            updated={updated}
            passwordEntries={passwordEntries}
          />
        </div>
        <div className="absolute bottom-4 right-4">
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <Button variant="flat" isIconOnly={true}>
                +
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              color="danger"
              variant="flat"
              aria-label="Static Actions"
            >
              <DropdownItem
                key="new"
                onClick={function () {
                  setOpen(true);
                }}
                startContent={<FontAwesomeIcon icon={faPlus} />}
              >
                {" "}
                Add password
              </DropdownItem>
              <DropdownItem
                key="copy"
                onClick={function () {
                  setOpenCsv(true);
                }}
                startContent={<FontAwesomeIcon icon={faFile} />}
              >
                {" "}
                Import password from .csv
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <Modal
          isOpen={open}
          onOpenChange={setOpen}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
        >
          <PasswordDialog></PasswordDialog>
        </Modal>
        <Modal
          isOpen={openCsv}
          onOpenChange={setOpenCsv}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
        >
          <CsvDialog></CsvDialog>
        </Modal>
      </div>
    </>
  );
}

export default Dashboard;
