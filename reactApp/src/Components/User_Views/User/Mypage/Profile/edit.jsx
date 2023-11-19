import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import DialogActions from '@mui/material/DialogActions';
import { useForm,SubmitHandler,Controller } from 'react-hook-form';
import Badge from '@mui/material/Badge';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar'; 
import {GetItem,Login} from '../../../../../Function/UserInfomation'
import { useContentContext } from '../../../../../provider/MypageProvide';
import Tag  from './tag';

const inputlabel={
    style:{
        fontSize: 20,
        fontFamily:'IMPACT'
    }
    }

function SimpleDialog($props) {
    const { onClose,open } = $props;
    const [file,setvalue] = useState()
    const [image,setimage] = useState("")
    const {value,count,change,control,handleSubmit,getValues} = useContentContext();


    const handleClose = () => {
            setimage("")
            onClose();
        };  

    const onSelectFile =(event)=>{
            setvalue(event.target.files[0]);
            setimage(URL.createObjectURL(event.target.files[0]));     
        };

    const onSubmit = (data) => {
        change(data,file)
        onClose();
        };
  

    return (
      <Dialog  open={open} >
        <DialogTitle style={{textAlign:"center",backgroundColor:'#000',fontFamily:'IMPACT',color:'white'}}>Profile Edit</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div style={{margin:"15px",textAlign: "-webkit-center"}}>
                {/* アイコン */}
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                            <IconButton style={{backgroundColor: "floralwhite"}} size="small" color="primary" aria-label="upload picture" component="label">
                                <input  hidden type="file" name="example" accept="image/jpeg, image/png" onChange={onSelectFile}/>
                                <AddIcon/>
                            </IconButton>
                        }
                        >
                        {image === "" ?
                            <Avatar 
                                style={{marginTop:"3px"}}
                                src={"/image/"+getValues('image')}
                                type="button"
                                sx={{ width: 100, height: 100 }}>
                            </Avatar>
                            :
                            <Avatar 
                                style={{marginTop:"3px"}}
                                src={image}
                                type="button"
                                sx={{ width: 100, height: 100 }}>
                            </Avatar>
                        }
                    </Badge>
                {/* プロフ内容 */}
                <div style={{height:'fit-content',marginTop:"20px"}}>
                    <div style={{display:"flex",marginTop:"10px"}}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field: { onChange, value, ref } }) => (
                               <TextField InputLabelProps={inputlabel}  style={{width:"100%",textAlign:"left"}} value={value} onChange={onChange} id="name" name ="name"  label="Name" variant="outlined" />
                            )}
                        />
                        
                    </div>
                    <div style={{display:"flex",marginTop:"10px"}}>
                        <Controller
                            name="introduction"
                            control={control}
                            render={({ field: { onChange, value, ref } }) => (
                                <TextField
                                InputLabelProps={inputlabel}
                                onChange={onChange}
                                value={value}
                                style={{width:"100%",textAlign:"left"}}
                                id="standard-multiline-static"
                                label="introduction"
                                multiline
                                rows={4}
                                variant="outlined"
                                />  
                            )}
                        />             
                    </div>    
                    <div>
                        <Tag defaultValue = {getValues('tag')}></Tag>
                    </div>                
                </div>
            </div>
       
            {/* アクションボタン */}
            <div style={{display:"flex",padding:"10px"}}>
                <div style={{marginLeft:"44px"}}>
                    <DialogActions>
                        <Button onClick={handleClose}>キャンセル</Button>
                    </DialogActions>  
                </div>
                <div style={{marginLeft:"44px"}}>
                    <DialogActions>
                        <Button type='submit'>完了</Button>
                    </DialogActions>  
                </div>
            </div>
        </form>
      </Dialog>
    );
  }
  export default SimpleDialog;