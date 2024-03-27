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
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

async function handleDelete(passwordId: string, deleteMethod: any) {
  let message = await deleteEntry(passwordId);
  toast(
    <p>
      <FontAwesomeIcon icon={faCircleInfo} />
      {message}
    </p>
  );
  deleteMethod();
}

function PasswordDeleteDialog(props: any) {
  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">
            ¿Quieres eliminar esta credencial?
          </ModalHeader>
          <ModalBody>
            <p>
              Si decides eliminar esta credencial, no se podrá recuperar y sera
              eliminada para siempre.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancelar
            </Button>
            <Button
              color="primary"
              onClick={function () {
                onClose;
                handleDelete(props.passwordId, props.deletedMethod);
              }}
              onPress={onClose}
            >
              Eliminar
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  );
}

export default PasswordDeleteDialog;
