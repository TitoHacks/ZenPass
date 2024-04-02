import { useState } from 'react'
import { checkExistingLeaked } from '@/utils/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faCopy, faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons'
import { Button,  Chip, ChipProps, Divider, } from '@nextui-org/react'
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
import { Image } from "@nextui-org/react";
import { Label } from "@radix-ui/react-label";
import { Progress } from "@nextui-org/react";
import LeakComponent from './leakComponent'



function InfoSheet(props:any){
    


  return (
    <SheetContent>
          <SheetHeader>
            <div className="flex flex-row justify-between items-center mt-4">
              <Image
                src={props.passwordItem.favicon}
                fallbackSrc="public/defaultIcon.png"
                className="w-16 h-max"
              />
              <div className="flex flex-col ml-4 w-full">
                <SheetTitle className="truncate max-w-64">
                  {props.passwordItem.title}
                </SheetTitle>
                <SheetDescription className="truncate max-w-60">
                  <a href={props.passwordItem.url} target="_blank">
                    {props.passwordItem.url}
                  </a>
                </SheetDescription>
              </div>
              <Chip
                className="capitalize self-start"
                color={props.statusColor}
                size="sm"
                variant="flat"
              >
                {props.passwordItem.status}
              </Chip>
            </div>
          </SheetHeader>
          <Divider className="my-4" />
          <div>
            <br />
            <Label className="text-sm text-gray-400">Username</Label>
            <p className="text-lg truncate">{props.passwordItem.username}</p>
            <br />
            <Label className="text-sm text-gray-400">Password</Label>
            <br />
            <div className="flex flex-row justify-evenly">
              <input
                className="text-lg w-min bg-transparent"
                readOnly
                disabled
                autoComplete="false"
                id="entryPassword"
                type="password"
                value={props.passwordItem.password}
              ></input>
              <div className="flex flex-row w-full justify-evenly">
                <Button
                  variant="flat"
                  color="default"
                  onClick={props.showPassword}
                  isIconOnly={true}
                >
                  <FontAwesomeIcon icon={props.viewIcon} />
                </Button>
                <Button
                  variant="flat"
                  color="default"
                  onClick={props.copyPassword}
                  isIconOnly={true}
                >
                  <FontAwesomeIcon icon={faCopy} />
                </Button>
              </div>
            </div>

            <div></div>

            <br />
            <Label className="text-sm text-gray-400">URL</Label>
            <a href={props.passwordItem.url} target="_blank">
              <p className="text-lg truncate">{props.passwordItem.url}</p>
            </a>
            <br />
            <Label className="text-sm text-gray-400">Strength</Label>

            <Progress
              className="pt-4"
              size="sm"
              aria-label="Loading..."
              color="primary"
              value={props.passwordItem.scorePoints}
              label={props.passwordItem.score}
              showValueLabel={true}
            />
            <br />
            <Divider className="my-4" />
            <Label className="text-sm text-gray-400">Leaks</Label>
            <LeakComponent entry={props.passwordItem}></LeakComponent>
          </div>
        </SheetContent>
    

  )
}

export default InfoSheet
