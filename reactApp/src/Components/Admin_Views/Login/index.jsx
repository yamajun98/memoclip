import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import DialogActions from '@mui/material/DialogActions';
import { useForm,SubmitHandler,Controller } from 'react-hook-form';
import { BrowserRouter, Switch, Route, Routes,Link,NavLink } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import {Login} from "../../../Function/UserInfomation"
import { styled } from '@mui/material/styles';
import useAuth from '../../../Auth/useAuth';
import { api } from '../../../Function/api';

const Dialog1 = styled(Dialog)(() => ({
  background: '#b1f3ff',
}));

function SimpleDialog(props) {
    const {open,setOpen} =  props
    const [isEditing, setIsEditing] = React.useState(true);
    const navigate = useNavigate();
    const { login,adminlogin, user } = useAuth();

    const {control, handleSubmit,formState: { errors }} = useForm({
        defaultValues: { id: '' ,password:''}
      })

    const handleClose = () => {
        setOpen(!open);
    };

    const onSubmit = async(data) => {
        try {
                console.log("ログイン失敗")
                await adminlogin(data)
                setOpen(false);         
                setIsEditing(true); 
                navigate('/admin/user');
        } catch (e) {
                console.log("ログイン失敗")
                console.log(e)
                setIsEditing(false);
        }
    };
  
    return (
      <Dialog1  open={!open} >
        <DialogTitle style={{textAlign:"center"}}>
         <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" />
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{margin:"15px",textAlign: "-webkit-center"}}>
                <div style={{display:"grid"}}>
                    <div style={{margin:"10px"}}>
                    <Controller
                            name="userId"
                            // propsとしてcontrolオブジェクトを渡す 
                            control={control}
                            rules={{ required: "required!" , minLength: { value: 4, message: '4文字以上で入力してください。' },
                            }}
                            render={({ field: { onChange, value, ref }, fieldState: {error} }) => (
                            <TextField id="userId" name ="userId" value={value} onChange={onChange} label="ID" variant="outlined" 
                            error={!!error?.message}
                            helperText={error?.message}
                            />
                            )}
                        />
                    </div>
                    <div style={{margin:"10px"}}>
                        <Controller
                            name="password"
                            // propsとしてcontrolオブジェクトを渡す 
                            control={control}
                            rules={{ required: "required!" , minLength: { value: 4, message: '4文字以上で入力してください。' }}}
                            render={({ field: { onChange, value, ref }, fieldState: {error}  }) => (
                            <TextField id="password" name ="password" type="password" value={value} onChange={onChange} label="PASSWORD" variant="outlined"
                            error={!!error?.message}
                            helperText={error?.message}
                             />
                            )}
                        />
                    </div>
                
                </div>
                <div style={{display:"grid"}}>
                     {!isEditing && <p style={{fontSize: "small",color: "crimson"}}>IDまたはPASSWORDが違います</p>}
                        <Button type='submit'>
                            ログイン
                        </Button> 
                        <Button onClick={handleClose}>
                            キャンセル
                        </Button> 
                </div>
            </div>
        </form>
        <DialogActions>

        </DialogActions>
      </Dialog1>
      
    );
  }
  export default SimpleDialog;