import { useEffect, useState } from "react";
import SideNavbar from "@/components/ui/sideNavbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Divider,
  Chip,
  ChipProps,
  Image,
  Progress,
  Button,
} from "@nextui-org/react";
import PasswordDialog from "@/components/ui/password-dialog";
import { Modal } from "@nextui-org/react";
import { getEntries } from "@/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faCopy,
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
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@radix-ui/react-label";
import LeakComponent from "@/components/ui/leakComponent";
import { toast } from "sonner";

const statusColorMap: Record<string, ChipProps["color"]> = {
  safe: "success",
  leaked: "danger",
  reused: "warning",
  weak: "warning",
};

function Passwords() {
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
  const [detail, setDetail] = useState(false);
  const [shown, setShown] = useState(false);
  const [viewIcon, setViewIcon] = useState<IconDefinition>(faEye);
  console.log(passwordItem);
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
            No se encontraron contraseñas.
          </p>,
        ];
      }
      setFilteredEntries(passwordComponents);
    }
    fetchData();
  }, [open, openCsv, searched]);

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
          <div className="self-start flex flex-row n w-2/4 justify-between pb-4">
            <h1 className="text-gray-200 font-bold text-2xl ml-10 self-start">
              Contraseñas
            </h1>
            <Input
              id="searchBar"
              label="Search"
              className="w-2/4 text-white"
              variant="flat"
              color="default"
              onKeyUp={function () {
                setSearched(!searched);
              }}
              isClearable
              radius="lg"
              placeholder="Type to search..."
              startContent={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            />
          </div>

          <div className="w-6/12 pt-4 h-full overflow-y-auto self-start flex flex-col items-center justify-start">
            {filteredEntries}
          </div>
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

        <Sheet open={detail} key={passwordItem._id} onOpenChange={setDetail}>
          <SheetContent>
            <SheetHeader>
              <div className="flex flex-row justify-between items-center mt-4">
                <Image
                  src={passwordItem.favicon}
                  fallbackSrc="public/defaultIcon.png"
                  className="w-16 h-max"
                />
                <div className="flex flex-col ml-4 w-full">
                  <SheetTitle className="truncate max-w-64">
                    {passwordItem.title}
                  </SheetTitle>
                  <SheetDescription className="truncate max-w-60">
                    <a href={passwordItem.url} target="_blank">
                      {passwordItem.url}
                    </a>
                  </SheetDescription>
                </div>
                <Chip
                  className="capitalize self-start"
                  color={statusColorMap[passwordItem.status]}
                  size="sm"
                  variant="flat"
                >
                  {passwordItem.status}
                </Chip>
              </div>
            </SheetHeader>
            <Divider className="my-4" />
            <div>
              <br />
              <Label className="text-sm text-gray-400">Usuario</Label>
              <p className="text-lg truncate">{passwordItem.username}</p>
              <br />
              <Label className="text-sm text-gray-400">Contraseña</Label>
              <br />
              <div className="flex flex-row justify-evenly">
                <input
                  className="text-lg w-min bg-transparent"
                  readOnly
                  disabled
                  autoComplete="false"
                  id="entryPassword"
                  type="password"
                  value={passwordItem.password}
                ></input>
                <div className="flex flex-row w-full justify-evenly">
                  <Button
                    variant="flat"
                    color="default"
                    onClick={showPassword}
                    isIconOnly={true}
                  >
                    <FontAwesomeIcon icon={viewIcon} />
                  </Button>
                  <Button
                    variant="flat"
                    color="default"
                    onClick={copyPassword}
                    isIconOnly={true}
                  >
                    <FontAwesomeIcon icon={faCopy} />
                  </Button>
                </div>
              </div>

              <div></div>

              <br />
              <Label className="text-sm text-gray-400">URL</Label>
              <a href={passwordItem.url} target="_blank">
                <p className="text-lg truncate">{passwordItem.url}</p>
              </a>
              <br />
              <Label className="text-sm text-gray-400">Strength</Label>

              <Progress
                className="pt-4"
                size="sm"
                aria-label="Loading..."
                color="primary"
                value={passwordItem.scorePoints}
                label={passwordItem.score}
                showValueLabel={true}
              />
              <br />
              <Divider className="my-4" />
              <Label className="text-sm text-gray-400">Leaks</Label>
              <LeakComponent entry={passwordItem}></LeakComponent>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

export default Passwords;
