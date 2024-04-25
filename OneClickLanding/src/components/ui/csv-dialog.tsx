import { useState } from "react";
import { importPasswords} from "@/utils/utils";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";
import CSVReader from "react-csv-reader";
import { Progress } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function CsvDialog() {
  const [loadValue, setLoadValue] = useState(0);
  const [visible, setVisible] = useState(false);

  const parserOptions = {
    header: true,
    skipEmptyLines: true,
  };

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">
            Import credentials (.csv)
          </ModalHeader>
          <ModalBody className="p-4">
            <Alert>
              <FontAwesomeIcon icon={faCircleInfo} />
              <AlertTitle>Warning!</AlertTitle>
              <AlertDescription> 
                In order to reduce credential processing time,
                leaks will not be searched automatically.
              </AlertDescription>
            </Alert>
            <CSVReader
              parserOptions={parserOptions}
              accept=".csv"
              onFileLoaded={function (data, fileInfo, originalFile) {
                setVisible(true);
                importPasswords(
                  data,
                  fileInfo,
                  originalFile,
                  setLoadValue,
                  onClose
                );
              }}
            />
            <div hidden={!visible}>
              <Progress
                isIndeterminate={false}
                size="sm"
                aria-label="Loading..."
                value={loadValue}
                label="Importing..."
              />
            </div>
          </ModalBody>
        </>
      )}
    </ModalContent>
  );
}

export default CsvDialog;
