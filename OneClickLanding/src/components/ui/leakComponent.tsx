import { useState } from 'react'
import { checkExistingLeaked } from '@/utils/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@nextui-org/react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  


function LeakComponent(props:any){
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    if(props.entry.leakInfo != null){
        let keys = Object.keys(props.entry.leakInfo);
        if(keys.length > 0){
            let leak = props.entry.leakInfo;
            return (
                <div className='flex flex-col justify-start items-center'>
                    <img src={leak.LogoPath} className='w-max'></img>
                    <br/>
                    <h2 className='font-bold'>{leak.Title}</h2>    
                    <br/>
                    <p>{leak.BreachDate}</p>
                    <br/>
                    <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger><Button variant='flat' color='warning' onClick={function(){setOpen(true);}}><FontAwesomeIcon icon={faCircleInfo} /> View details</Button></DialogTrigger>
                    <DialogContent className='bg-white'>
                        <DialogHeader>
                        <DialogTitle>{leak.Title}</DialogTitle>
                        <DialogDescription>
                            <br/>
                            <p dangerouslySetInnerHTML={{__html: leak.Description}}></p>
                        </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                    </Dialog>
    
                    
    
                </div>
            )
        }
        
    }


  return (
    <div className='flex flex-col justify-start'>
        <p className='text-lg'>No data leaks found for this account</p>
        <Button variant='flat' color='warning' isLoading={loading} onClick={async function(){setLoading(true);await checkExistingLeaked(props.entry); setLoading(false)}}><FontAwesomeIcon icon={faMagnifyingGlassChart} /> Request analysis</Button>
                
    </div>
    

  )
}

export default LeakComponent
