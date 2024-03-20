import React from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue,Pagination} from "@nextui-org/react";
import { Button } from './button'
import { getEntries } from '@/utils/utils';
import { useState, useEffect } from 'react';
import {Image} from "@nextui-org/react";

  
const statusColorMap: Record<string, ChipProps["color"]>  = {
  safe: "success",
  leaked: "danger",
  reused: "warning",
  weak: "warning",
};


function DashboardTable() {
  const [tableRows, setTableRows] = useState<JSX.Element[]>([]);
  useEffect(() => {
    async function fetchData() {
      const entries = await getEntries();
    
      setTableRows(entries);
    }
    fetchData();
  }, []); // Este useEffect se ejecutará solo una vez al montarse el <componente> 
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;
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
            <TableColumn className="w-[100px] text-secondaryColor" key="title">Title</TableColumn>
            <TableColumn className='text-secondaryColor' key="username">Username</TableColumn>
            <TableColumn className='text-secondaryColor' key="url">Site</TableColumn>
            <TableColumn className="text-right text-secondaryColor" key="status">Status</TableColumn>
        </TableHeader>
        <TableBody items={items}>
        {(item) => (
          <TableRow key={item.title}>
            {(columnKey) => <TableCell className='text-white'>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
        </TableBody>
    </Table>
    </div>
  )


 
}

export default DashboardTable
