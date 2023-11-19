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

function SimpleDialog(props) {

    const [isEditing, setIsEditing] = React.useState(true);
    const navigate = useNavigate();
    const {control, handleSubmit, getValues,formState: { errors }} = useForm({
        defaultValues: { register_id: '' ,user_name:'',register_password:'',register_password_confirm:''}
      })


    const [open, setOpen] = React.useState(true);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (data) => {
        if(data.register_password === data.register_password_confirm){
            setIsEditing(true);
        }else{
            setIsEditing(false);
        }
        
        console.log(data)
        axios
        .post('/users', new URLSearchParams(data))
          .then(function(data){
            console.log(data)
            
            navigate('/login');
        });
    };
  
    return (
      <Dialog   open={open}>
        <DialogTitle style={{textAlign:"center"}}>会員登録</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{margin:"15px",textAlign: "-webkit-center"}}>
                <div style={{display:"grid"}}>

                    {/* ID */}
                    <div style={{margin:"10px"}}>
                    <Controller
                            name="register_id" 
                            control={control}
                            rules={{ required: "required!" , minLength: { value: 4, message: '4文字以上で入力してください。' },
                            pattern: {
                                value:/^[.-_0-9A-Za-z]+$/,
                                message: "english only"
                              }
                            }}
                            render={({ field: { onChange, value, ref }, fieldState: {error} }) => (
                            <TextField id="register_id" name ="register_id" value={value} onChange={onChange} label="ID" variant="outlined" 
                            error={!!error?.message}
                            helperText={error?.message}
                            />
                            )}
                        />
                    </div>
                    {/* ユーザネーム */}
                    <div style={{margin:"10px"}}>
                    <Controller
                            name="user_name" 
                            control={control}
                            rules={{ required: "required!" , minLength: { value: 4, message: '4文字以上で入力してください。' },
                            // pattern: {
                                // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            //     message: "invalid email address"
                            //   }
                            }}
                            render={({ field: { onChange, value, ref }, fieldState: {error} }) => (
                            <TextField id="user_name" name ="user_name" value={value} onChange={onChange} label="ユーザ名" variant="outlined" 
                            error={!!error?.message}
                            helperText={error?.message}
                            />
                            )}
                        />
                    </div>
                    {/* パスワード */}
                    <div style={{margin:"10px"}}>
                        <Controller
                            name="register_password"
                            control={control}
                            rules={{ required: "required!" , minLength: { value: 4, message: '4文字以上で入力してください。' }}}
                            render={({ field: { onChange, value, ref }, fieldState: {error}  }) => (
                            <TextField id="register_password" name ="register_password" type="password" value={value} onChange={onChange} label="PASSWORD" variant="outlined"
                            error={!!error?.message}
                            helperText={error?.message}
                             />
                            )}
                        />
                    </div>
                    {/* パスワード確認用 */}
                    <div style={{margin:"10px"}}>
                        <Controller
                            name="register_password_confirm"
                            control={control}
                            rules={{ required: "required!" , minLength: { value: 4, message: '4文字以上で入力してください。' }}}
                            render={({ field: { onChange, value, ref }, fieldState: {error}  }) => (
                            <TextField id="register_password_confirm" name ="register_password_confirm" type="password" value={value} onChange={onChange} label="PASSWORD確認用" variant="outlined"
                            error={!!error?.message}
                            helperText={error?.message}
                             />
                            )}
                        />
                    </div>
                </div>
                <div style={{display:"grid"}}>
                {!isEditing && <p style={{fontSize: "small",color: "crimson"}}>確認用PASSWORDが違います</p>}
                    <Button type='submit'>
                        登録する
                    </Button> 
                    <Button onClick={handleClose} component={Link} to="/login" >
                        キャンセル
                    </Button>  
                </div>
            </div>
        </form>
        <DialogActions>

        </DialogActions>
      </Dialog>
    );
  }
  export default SimpleDialog;