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

    const inputlabel={
        style:{
            fontSize: 20,
            fontFamily:'IMPACT'
        }
    }
    const ContentBox = styled('div')(({ value }) => ({
        display:"flex",
        padding:"10px",
        border: 'solid 1px #c8c8c8',
        borderRadius: '4px',
        height:'41px',
        margin: '10px 0px 8px 0px',
        position: 'relative',
        '&::before':{
            content:`"`+value+`"`,
            margin: '1px',
            position: 'absolute',
            top: '-30%',
            backgroundColor: '#fff',
            fontFamily: 'Impact',
            color: '#9e9e9e',
            fontSize: 'medium',
        }
    }));
function SimpleDialog($props) {
    const { setOpen,open,value } = $props;
    const {control,handleSubmit,setValue,getValues} = useForm()

    const handleClose = () => {
            setOpen(false);
        };  

    const onSubmit = (data) => {
        setOpen(false);
        };
  
    React.useEffect(()=>{ 
        setValue("id",value.id)
        setValue("name",value.name)
        setValue("userId",value.userId)
        setValue("sex",value.sex)
        setValue("age",value.age)
        setValue("password",value.password)
        setValue("admin_flag",value.admin_flag)
    },[open]);

    
    return (
      <Dialog  open={open} >
        <DialogTitle style={{textAlign:"center",backgroundColor:'#000',fontFamily:'IMPACT',color:'white'}}>Profile Edit</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div style={{margin:"15px",textAlign: "-webkit-center" }}>
                {/* アイコン */}
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        >
                        {value.image === "" ?
                            <Avatar 
                                style={{marginTop:"3px"}}
                                src={"/image/userIcon.jpeg"}
                                type="button"
                                sx={{ width: 100, height: 100 }}>
                            </Avatar>
                            :
                            <Avatar 
                                style={{marginTop:"3px"}}
                                src={"/image/"+value.image}
                                type="button"
                                sx={{ width: 100, height: 100 }}>
                            </Avatar>
                        }
                    </Badge>
                {/* プロフ内容 */}
                <div style={{height:'fit-content',marginTop:"20px"}}>
                    <ContentBox value={'name'}>
                               <Span  style={{width:"100%",textAlign:"left"}}>
                                {value.name}
                                </Span>
                    </ContentBox> 
                    <div style={{display:"flex",marginTop:"10px"}}>
                        <Controller
                            name="userId"
                            control={control}
                            render={({ field: { onChange, value, ref } }) => (
                               <TextField InputLabelProps={inputlabel}  style={{width:"100%",textAlign:"left"}} value={value} onChange={onChange} id="userId" name ="userId"  label="userId" variant="outlined" />
                            )}
                        /> 
                    </div> 
                    <div style={{display:"flex",marginTop:"10px"}}>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field: { onChange, value, ref } }) => (
                               <TextField InputLabelProps={inputlabel}  style={{width:"100%",textAlign:"left"}} value={value} onChange={onChange} id="nampassworde" name ="password"  label="password" variant="outlined" />
                            )}
                        /> 
                    </div> 
                    <ContentBox value={'sex'}>
                            <Span  style={{width:"100%",textAlign:"left"}}>
                                {value.sex == null ?
                                    <>-</>
                                    :
                                    <>{value.sex}</>
                                }                            
                            </Span>

                    </ContentBox>                   
                    <ContentBox value={'age'}>
                            <Span  style={{width:"100%",textAlign:"left"}}>

                                    {value.age == null ?
                                        <>-</>
                                        :
                                        <>{value.age}</>
                                    }
                            </Span>
                    </ContentBox> 
                    <div style={{display:"flex",marginTop:"10px"}}>
                        <Controller
                            name="admin_flag"
                            control={control}
                            render={({ field: { onChange, value, ref } }) => (
                               <TextField InputLabelProps={inputlabel}  style={{width:"100%",textAlign:"left"}} value={value} onChange={onChange} id="admin_flag" name ="admin_flag"  label="admin_flag" variant="outlined" />
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
                        <Button type='submit'>完了</Button>
                    </DialogActions>  
                </div>
            </div>
        </form>
      </Dialog>
    );
  }
  export default SimpleDialog;