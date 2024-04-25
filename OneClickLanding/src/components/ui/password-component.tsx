import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip, ChipProps, Image } from "@nextui-org/react";

const statusColorMap: Record<string, ChipProps["color"]> = {
  safe: "success",
  leaked: "danger",
  reused: "warning",
  weak: "warning",
};

function PasswordComponent(props: any) {
  let favicon = props.favicon;
  let title = props.title;
  let url = props.url;
  let status = props.status;

  return (
    <div
      className=" my-2 ml-9 bg-backgroundColorDark p-4 rounded-xl w-4/6 flex flex-row justify-between items-center hover: cursor-pointer"
      onClick={function () {
        props.setPasswordItem(props.passwordItem);
        props.setDetail(true);
      }}
    >
      <Image src={favicon} className="w-10 h-max"></Image>
      <div className="flex flex-col">
        <h2 className="text-white truncate font-bold max-w-44">{title}</h2>
        <p className="text-gray-500 max-w-44 truncate">{url}</p>
      </div>
      <Chip
        className="capitalize self-start"
        color={statusColorMap[status]}
        size="sm"
        variant="flat"
      >
        {status}
      </Chip>
      <FontAwesomeIcon icon={faCaretRight} className="self-center text-white" />
    </div>
  );
}

export default PasswordComponent;
