import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { api } from '../../../Function/api';
import { useProvide } from '../../../provider/UserpageProvide';
import { CircularProgress } from '@mui/material';
import { Box, styled } from '@mui/system';

export default function DeleteButton(props){
    const [open, setOpen] = React.useState(false);
    const [openAlart, setOpenAlart] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
        setOpenAlart(true)
    }; 
    const handleOpen = () => {
        setOpen(true);
    }; 
    

    return(
        <>     
            <IconButton aria-label="delete" onClick={handleOpen} >
                <DeleteIcon />
            </IconButton>
            <DeleteAlart open={open} close ={handleClose} alartClose ={setOpenAlart} id={props.id}/>
            <Alart open={openAlart}/>
        </>
    )
}



const DeleteAlart=($props)=>{
    const {open,close,id,alartClose} = $props
    const {onChange} = useProvide()

    const onClick=()=>{
        (async()=>{
            api.post('/article/delete', new URLSearchParams({"id":id}))
            close()
            setTimeout(()=> {onChange()},1000);
            alartClose(false)
        })()
    }
    const onCancel=()=>{
        (async()=>{
            close()
            alartClose(false)        
        })()
    }
    return(
            <Dialog open={open} >
                <DialogTitle style={{textAlign:"center"}}>本当に削除してもよろしいでしょうか？</DialogTitle>
                {/* アクションボタン */}
                <div style={{display:"flex",padding:"10px"}}>
                    <div style={{marginLeft:"44px"}}>
                    <DialogActions>
                        <Button onClick={onCancel}>キャンセル</Button>
                    </DialogActions>  
                    </div>
                <div style={{marginLeft:"44px"}}>
                    <DialogActions>
                        <Button  onClick={onClick} >削除</Button>
                    </DialogActions>  
                    </div>
                </div>
            </Dialog>
    );
  
}
const Alart=($props)=>{
    const {open,close,id} = $props  
    
    return(
            <Dialog    
                PaperProps={{
                    style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    },
                     sx: {
                      width: "100px",
                      height:"100px",
                     
                    },
                }} 
            color= {'gold'}
              open={open} >
                    <CircularProgress className="circleProgress" disableShrink ={false}/>
            </Dialog>
    );
  
}