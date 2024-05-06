import { useEffect, useState } from "react";
import SideNavbar from "@/components/ui/sideNavbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  ChipProps,
  Button,
} from "@nextui-org/react";
import PasswordDialog from "@/components/ui/password-dialog";
import { Modal } from "@nextui-org/react";
import { getEntries } from "@/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faEye,
  faEyeSlash,
  faFile,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import CsvDialog from "@/components/ui/csv-dialog";
import PasswordComponent from "@/components/ui/password-component";
import { Input } from "@nextui-org/react";
import {
  Sheet,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import InfoSheet from "@/components/ui/infoSheet";

const statusColorMap: Record<string, ChipProps["color"]> = {
  safe: "success",
  leaked: "danger",
  reused: "warning",
  weak: "warning",
};

function Passwords() {

//Ver si el usuario tiene la sesion iniciada. Si no, se redirige a /login.

if(sessionStorage.getItem("PassnovaUID") == null || sessionStorage.getItem("derivatedKey") == null){
  window.location.href = "/login";
}

  const [open, setOpen] = useState(false);
  const [openCsv, setOpenCsv] = useState(false);
  const [passwordEntries, setPasswordEntries] = useState<JSX.Element[]>([]);
  const [searched, setSearched] = useState(false);
  const [filteredEntries, setFilteredEntries] = useState<JSX.Element[]>([]);
  const [passwordItem, setPasswordItem] = useState<any>({
    _id: "",
    title: "",
    username: "",
    password: "",
    url: "",
    score: "",
    status: "",
    isWeb: "",
    ownerId: "",
    iv: "",
    leakedInfo: [],
  });
  passwordEntries.length;
  const [detail, setDetail] = useState(false);
  const [shown, setShown] = useState(false);
  const [viewIcon, setViewIcon] = useState<IconDefinition>(faEye);

  //Funcion encargada de actualizar la lista de contraseñas segun open(Formulario de añadir), openCsv (Formulario de importar) y searched (Texto buscado)
  useEffect(() => {
    async function fetchData() {
      const entries = await getEntries();
      setPasswordEntries(entries);

      let passwordComponents: JSX.Element[] = [];
      entries.forEach((entry) => {
        let searchValue = (
          document.getElementById("searchBar") as HTMLInputElement
        ).value!;
        if (entry.title.toLowerCase().includes(searchValue.toLowerCase())) {
          passwordComponents.push(
            <PasswordComponent
              passwordItem={entry}
              setDetail={setDetail}
              setPasswordItem={setPasswordItem}
              favicon={entry.favicon}
              status={entry.status}
              title={entry.title}
              url={entry.url}
            ></PasswordComponent>
          );
        }
      });
      if (passwordComponents.length == 0) {
        passwordComponents = [
          <p className="text-gray-500 justify-self-center">
            No credentials found.
          </p>,
        ];
      }
      setFilteredEntries(passwordComponents);
    }
    fetchData();
  }, [open, openCsv, searched]);

  //Funcion encargada de mostrar la contraseña almacenada
  function showPassword() {
    if (shown) {
      document
        .getElementById("entryPassword")!
        .setAttribute("type", "password");
      setViewIcon(faEye);
      setShown(false);
    } else {
      document.getElementById("entryPassword")!.setAttribute("type", "text");
      setViewIcon(faEyeSlash);
      setShown(true);
    }
  }

  //Funcion que copia la contraseña almacenada al portapapeles
  function copyPassword() {
    let passwordElement = document.getElementById("entryPassword")!;
    navigator.clipboard.writeText(passwordElement.getAttribute("value")!);
    toast.success("Password copied to clipboard");
  }

  return (
    <>
      <SideNavbar></SideNavbar>
      <div className="flex flex-row justify-between h-screen bg-backgroundColor w-full dark">
        <div className="ml-40 pt-12 h-full w-full flex flex-col items-center ">
          <div className="self-start flex flex-row n w-full justify-between pb-4 lg:w-2/4 sm:w-full">
            <h1 className="text-gray-200 font-bold text-2xl ml-10 self-start">
              Passwords
            </h1>
            <Input
              id="searchBar"
              label="Search"
              className=" mr-4 w-2/4 text-white lg:mr-0"
              variant="flat"
              color="default"
              onKeyUp={function () {
                setSearched(!searched);
              }}
              radius="lg"
              placeholder="Type to search..."
              startContent={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            />
          </div>

          <div className="w-full pt-4 h-full overflow-y-auto self-start flex flex-col items-center justify-start md:w-full sm:w-full lg:w-6/12 xl:w-6/12 2xl:w-6/12 ">
            {filteredEntries}
          </div>
        </div>
        <div className="fixed bottom-4 right-4">
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

        <Sheet open={detail} key={passwordItem._id} onOpenChange={function(){setDetail(!detail); setViewIcon(faEye);setShown(false)}}>
          <InfoSheet passwordItem={passwordItem} showPassword={showPassword} copyPassword={copyPassword} viewIcon={viewIcon} statusColor={statusColorMap[passwordItem.status]}></InfoSheet>
        </Sheet>
      </div>
    </>
  );
}

export default Passwords;
