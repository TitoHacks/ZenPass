import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  ChipProps,
  Pagination,
  Modal,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faEye,
  faEyeSlash,
  faFloppyDisk,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/react";
import PasswordDeleteDialog from "./password-delete-dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@radix-ui/react-label";
import { Progress } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { toast } from "sonner";
import { Image } from "@nextui-org/react";
import { editData } from "@/utils/utils";
import InfoSheet from "./infoSheet";

const statusColorMap: Record<string, ChipProps["color"]> = {
  safe: "success",
  leaked: "danger",
  reused: "warning",
  weak: "warning",
};

function DashboardTable(props: any) {
  const tableRows = props.passwordEntries;
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<boolean>(false);
  const [edit, setEdit] = useState(false);
  const [shown, setShown] = useState(false);
  const [viewIcon, setViewIcon] = useState<IconDefinition>(faEye);
  const [passwordId, setPasswordId] = useState<String>();
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

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 6;
  const pages = Math.ceil(tableRows.length / rowsPerPage);
  const items: Entry = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return tableRows.slice(start, end);
  }, [page, tableRows,open]);

  //Metodo que muestra la contraseña al hacer click en el boton con icono de ojo
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

  //Metodo que copia la contraseña al hacer click en el boton con icono de copiar
  function copyPassword() {
    let passwordElement = document.getElementById("entryPassword")!;
    navigator.clipboard.writeText(passwordElement.getAttribute("value")!);
    toast.success("Password copied to clipboard");
  }

  //Metodo utilizado para renderizar elementos custom dependiendo de la columna de la tabla
  const renderCell = React.useCallback((entry: Entry, columnKey: React.Key) => {
    const cellValue = entry[columnKey as keyof Entry];

    switch (columnKey) {
      case "status":
        return (
            <Chip
            className="capitalize"
            color={statusColorMap[entry.status!]}
            size="sm"
            variant="flat"
            >
            {cellValue}
          </Chip>

        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Button
              variant="light"
              onClick={function () {
                setPasswordItem(entry);
                setEdit(true);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
            </Button>
            <Button
              variant="light"
              color="danger"
              onClick={function () {
                setPasswordId(entry["_id"]);
                setOpen(true);
              }}
            >
              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className=" my-12 rounded-2xl flex  flex-row w-11/12 justify-evenly items-center bg-backgroundSecondary p-4">
      <Table
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              variant="flat"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key="title">Title</TableColumn>
          <TableColumn key="username">Username</TableColumn>
          <TableColumn key="url">Site</TableColumn>
          <TableColumn key="status">Status</TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>
        <TableBody
          items={items}
          emptyContent={
            <p>
              Add your first credential by pressing the "+" button on the bottom
              right
            </p>
          }
        >
          {(item: Entry) => (
            <TableRow
              key={item._id}
              className="transition-all ease-in-out duration-150 delay-50 hover:bg-backgroundColorDark cursor-pointer"
              onClick={function () {
                setPasswordItem(item);
                setDetail(true);
              }}
            >
              {(columnKey) => (
                <TableCell className="text-white truncate max-w-64">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal
        isOpen={open}
        onOpenChange={function(){setOpen(!open)}}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <PasswordDeleteDialog
          deletedMethod={props.deletedMethod}
          passwordId={passwordId}
          deleted={props.deleted}
        ></PasswordDeleteDialog>
      </Modal>
      <Sheet open={detail} key={passwordItem._id} onOpenChange={function(){setDetail(!detail);setViewIcon(faEye); setShown(false)}}>
        <InfoSheet passwordItem={passwordItem} showPassword={showPassword} copyPassword={copyPassword} viewIcon={viewIcon} statusColor={statusColorMap[passwordItem.status]}></InfoSheet>
      </Sheet>

      <Sheet open={edit} key={passwordItem._id + "2"} onOpenChange={function(){setEdit(!edit);}}>
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
                  <Input
                    id="titleInput"
                    defaultValue={passwordItem.title}
                  ></Input>
                </SheetTitle>
              </div>
              <Chip
                className="capitalize self-start"
                color="warning"
                size="sm"
                variant="flat"
              >
                Edit
              </Chip>
            </div>
          </SheetHeader>
          <Divider className="my-4" />
          <div>
            <br />
            <Label className="text-sm text-gray-400">Username</Label>
            <Input
              className="text-lg"
              id="usernameInput"
              contentEditable={true}
              defaultValue={passwordItem.username}
            ></Input>
            <br />
            <Label className="text-sm text-gray-400">Password</Label>
            <br />
            <div className="flex flex-row justify-evenly">
              <Input
                className="text-lg w-full bg-transparent"
                id="passwordInput"
                readOnly={false}
                contentEditable={true}
                defaultValue={passwordItem.password}
                type="password"
              ></Input>
            </div>

            <br />
            <Label className="text-sm text-gray-400">URL</Label>
            <Input
              id="urlInput"
              contentEditable={true}
              defaultValue={passwordItem.url}
            ></Input>
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
            <Button
              className="w-full"
              onClick={function () {
                editData(
                  (document.getElementById("usernameInput") as HTMLInputElement)
                    .value!,
                  (document.getElementById("passwordInput") as HTMLInputElement)
                    .value!,
                  (document.getElementById("urlInput") as HTMLInputElement)
                    .value!,
                  (document.getElementById("titleInput") as HTMLInputElement)
                    .value!,
                  passwordItem,
                  props.updatedMethod
                );
                props.updatedMethod(!props.updated);
              }}
              variant="flat"
              color="warning"
              startContent={<FontAwesomeIcon icon={faFloppyDisk} />}
            >
              Save changes
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default DashboardTable;
