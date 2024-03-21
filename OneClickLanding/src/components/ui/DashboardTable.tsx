import React from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue,Pagination, Modal} from "@nextui-org/react";
import { getEntries } from '@/utils/utils';
import { useState, useEffect } from 'react';
import {Image} from "@nextui-org/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisVertical, faEye,faMagnifyingGlassChart,faPenToSquare,faTrash} from "@fortawesome/free-solid-svg-icons";
import {Button} from "@nextui-org/react";
import PasswordDeleteDialog from './password-delete-dialog';
import {Dropdown, Link, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from '@radix-ui/react-label';
import {Progress} from "@nextui-org/react";
import {Divider} from "@nextui-org/react";
  
const statusColorMap: Record<string, ChipProps["color"]>  = {
  safe: "success",
  leaked: "danger",
  reused: "warning",
  weak: "warning",
};






function DashboardTable(props:any) {
  
  const tableRows = props.passwordEntries;
  const [open,setOpen] = useState(false);
  const [detail,setDetail] = useState<boolean>(false);
  const [passwordId, setPasswordId] = useState<String>();
  const [passwordItem, setPasswordItem] = useState<any>({_id:"",title:"",username:"",password:"",url:"",score:"",status:"",isWeb:"",ownerId:"",iv:""});

  const [page, setPage] = React.useState(1);
  
  const rowsPerPage = 6;
  const pages = Math.ceil(tableRows.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return tableRows.slice(start, end);
  }, [page, tableRows]);




  const renderCell = React.useCallback((entry: Element, columnKey: React.Key) => {
    const cellValue = entry[columnKey as keyof Element];

    switch (columnKey) {
      case "status":
        return (
         <Chip className="capitalize" color={statusColorMap[entry.status]} size="sm" variant="flat">
            {cellValue}
          </Chip> 

                    
        );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Dropdown backdrop="blur">
                <DropdownTrigger>
                  <Button variant="light">
                    <FontAwesomeIcon className=' text-lg font-bold text-gray-500' icon={faEllipsisVertical} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu color='danger' variant="flat" aria-label="Static Actions">
                  <DropdownItem key="edit" startContent={<FontAwesomeIcon icon={faPenToSquare} />}> Edit</DropdownItem>
                  <DropdownItem  key="delete" onClick={function(){setPasswordId(entry["_id"]);setOpen(true)}} startContent={<FontAwesomeIcon icon={faTrash} />}> Delete</DropdownItem>
                  
                </DropdownMenu>
              </Dropdown>
            </div>
          );
      default:
        return cellValue;
    }
  }, []);






  return (
    <div className=' my-12 rounded-2xl flex  flex-row w-11/12 justify-evenly items-center bg-backgroundSecondary p-4'>
      

      <Table aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            variant='flat'
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}>
        <TableHeader>
            <TableColumn key="title">Title</TableColumn>
            <TableColumn key="username">Username</TableColumn>
            <TableColumn key="url">Site</TableColumn>
            <TableColumn key="status">Status</TableColumn>
            <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>
        <TableBody items={items} emptyContent={<p>Add your first credential by pressing the "+" button on the bottom right</p>} >
        {(item) => (
          <TableRow key={item.title} className='transition-all ease-in-out duration-150 delay-50 hover:bg-backgroundColorDark cursor-pointer' onClick={function(){setPasswordItem(item);setDetail(true);}}>
            {(columnKey) => 
            
              <TableCell className='text-white'> 
                
              {renderCell(item, columnKey)}
                 
              </TableCell>
            }
          </TableRow>
        )}
        </TableBody>
    </Table>
    <Modal isOpen={open} onOpenChange={setOpen} isDismissable={false} isKeyboardDismissDisabled={true}>
      <PasswordDeleteDialog passwordId={passwordId}></PasswordDeleteDialog>
    </Modal>
      <Sheet open={detail} key={passwordItem._id} onOpenChange={setDetail}>
          <SheetContent>
            <SheetHeader>
              <div className='flex flex-row justify-between mt-4'>
                <img src="/public/48.png"/>
                <div className='flex flex-col ml-4 w-full'>
                  <SheetTitle>{passwordItem.title}</SheetTitle>
                  <SheetDescription>
                    <a href={passwordItem.url} target='_blank'>{passwordItem.url}</a>
                  </SheetDescription>
                </div>
                <Chip className="capitalize" color={statusColorMap[passwordItem.status]} size="sm" variant="flat">{passwordItem.status}</Chip>
              </div>
                
            </SheetHeader>
            <Divider className="my-4" />
            <div>
              <br/>
              <Label className='text-sm text-gray-400'>Usuario</Label>
              <p className='text-lg'>{passwordItem.username}</p>
              <br/>
              <Label className='text-sm text-gray-400'>Contraseña</Label>
              <br/>
              <input className='text-lg' readOnly type="password" value={passwordItem.password}></input>
              <div>
              
              </div>
              
              <br/>
              <Label className='text-sm text-gray-400'>URL</Label>
              <a href={passwordItem.url} target='_blank'><p className='text-lg'>{passwordItem.url}</p></a>
              <br/>
              <Label className='text-sm text-gray-400'>Score</Label>
              <p className='font-bold text-lg'>{passwordItem.score}</p>
              <br/>
              <Divider className="my-4" />
              <Label className='text-sm text-gray-400'>Leaks</Label>
              <div className='flex flex-col justify-start'>
                <p className='text-lg'>No data leaks found for this account</p>
                <Button variant='flat' color='warning'><FontAwesomeIcon icon={faMagnifyingGlassChart} /> Request analisys</Button>
              </div>
              
            </div>
          </SheetContent>
      </Sheet>
    </div>
  )


 
}

export default DashboardTable
