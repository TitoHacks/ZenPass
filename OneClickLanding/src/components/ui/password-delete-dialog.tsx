import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { deleteEntry } from "@/utils/utils";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faTrash } from "@fortawesome/free-solid-svg-icons";

async function handleDelete(passwordId: string, deleteMethod: any, deleted:any) {
  let message = await deleteEntry(passwordId);
  toast(
    <p>
      <FontAwesomeIcon icon={faCircleInfo} />
      {message}
    </p>
  );
  deleteMethod(!deleted);
}

function PasswordDeleteDialog(props: any) {
  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">
            Delete credential ?
          </ModalHeader>
          <ModalBody>
            <p>
              Once deleted, it will be imposible to recover.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={function () {
                onClose;
                handleDelete(props.passwordId, props.deletedMethod,props.deleted);
              }}
              onPress={onClose}
              startContent={<FontAwesomeIcon icon={faTrash} />}
            >
              Yes, delete it!
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  );
}

export default PasswordDeleteDialog;
