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
import {Login} from "../../Function/UserInfomation"
import { styled } from '@mui/material/styles';
import useAuth from '../../Auth/useAuth';
import { api } from '../../Function/api';

const Dialog1 = styled(Dialog)(() => ({
  background: '#b1f3ff',
}));

const Title = styled('div')(() => ({
    textAlign: 'center',
    fontFamily: 'monospace',
    fontSize: 'larger',
    fontWeight: '500',
  }));


export default function Register(props) {
    
    const  {handleClickOpen,register,setRegister} = props
    const [isEditing, setIsEditing] = React.useState(true);
    const [error, setError] = React.useState("");
    const navigate = useNavigate();
    const { userRegister, user } = useAuth();
    const {control, handleSubmit,formState: { errors }} = useForm({
        defaultValues: { id: '' ,password:''}
      })

    const handleClose = () => {
        handleClickOpen()
        setRegister(false)
    };

    const onSubmit = async(data) => {
        try {
                await userRegister(data)      
                handleClickOpen()
                setRegister(false)
        } catch (e) {
                console.log(e.message)
                setError(e.message)
        }
    };
  
    return (
        <>
            <Dialog1  open={register} >
                <DialogTitle style={{textAlign:"center"}}>
                <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" />
                </DialogTitle>
                <Title>会員登録</Title>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{margin:"15px",textAlign: "-webkit-center"}}>
                        <div style={{display:"grid"}}>
                            <div style={{margin:"10px"}}>
                            <Controller
                                    name="name"
                                    // propsとしてcontrolオブジェクトを渡す 
                                    control={control}
                                    rules={{ required: "required!" , minLength: { value: 4, message: '4文字以上で入力してください。' },
                                    }}
                                    render={({ field: { onChange, value, ref }, fieldState: {error} }) => (
                                    <TextField id="name" name ="name" value={value} onChange={onChange} label="NAME" variant="outlined" 
                                    error={!!error?.message}
                                    helperText={error?.message}
                                    />
                                    )}
                                />
                            </div>
                            <div style={{margin:"10px"}}>
                            <Controller
                                    name="userId"
                                    // propsとしてcontsrolオブジェクトを渡す 
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
                        {error == ""?
                        <></>
                        :
                        <span style={{color:"red"}}>{error}</span>
                        }
                        <div style={{display:"grid"}}>
                            {!isEditing && <p style={{fontSize: "small",color: "crimson"}}>IDまたはPASSWORDが違います</p>}
                            <Button type='submit'>
                                登録
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
        </>

    );
  }
