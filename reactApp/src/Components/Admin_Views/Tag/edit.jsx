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
import { useContentContext } from '../../../provider/MypageProvide';
import { Span } from '../../../Setteing/Typography';
import { api } from '../../../Function/api';

    const inputlabel={
        style:{
            fontSize: 20,
            fontFamily:'IMPACT'
        }
    }

function SimpleDialog($props) {
    const { setOpen,open,reloadChange,value } = $props;
    const [file,setvalue] = useState()
    const [image,setImage] = useState("")
    const {control,handleSubmit,setValue,getValues} = useForm()

    const handleClose = () => {
            setImage("")
            setValue("")
            setValue("name","")
            setOpen(false);
        };  
    const onSelectFile =(event)=>{
        setvalue(event.target.files[0]);
        setImage(URL.createObjectURL(event.target.files[0]));     
        };
    React.useEffect(()=>{ 
        setValue("id",value.id)
        setValue("name",value.name)
        setImage("/image/"+value.image)
    },[open]);

    const onSubmit = (data) => {
        const formData = new FormData();
        if(file != undefined){
            formData.append('file',file,encodeURIComponent(file.name)) 
        }
        formData.append('name',data.name); 
        formData.append('image',file.name); 
            (async()=>{
                const result = await api.post('admin/create/tag', formData)
                handleClose()
                reloadChange()
            })()
        };
  


    
    return (
      <Dialog  open={open} >
        <DialogTitle style={{textAlign:"center",backgroundColor:'#000',fontFamily:'IMPACT',color:'white'}}>Profile Edit</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div style={{margin:"15px",textAlign: "-webkit-center" }}>
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
                                src={"/image/userIcon.jpeg"}
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
                               <TextField InputLabelProps={inputlabel}  style={{width:"100%",textAlign:"left"}} value={value} onChange={onChange} id="name" name ="name"  label="TagName" variant="outlined" />
                            )}
                        /> 
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
                        <Button type='submit'>作成</Button>
                    </DialogActions>  
                </div>
            </div>
        </form>
      </Dialog>
    );
  }
  export default SimpleDialog;
