import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MDEditor from "@uiw/react-md-editor";
import Tag  from '../CommonTag/tag';
import axios from 'axios';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import { useArticleContext } from '../../../../provider/ArticlePostProvide';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { api } from '../../../../Function/api';

  const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));

  const ContentBox = styled('div')(({ theme }) => ({
      // margin: '30px',
      [theme.breakpoints.down('sm')]: { margin: '16px' },
      }));

  const TypographyBox = styled(Typography)(({ theme }) => ({

    }));
  
  const StyledTextField = styled(TextField)(() => ({
      '&.MuiInputLabel-root':{
        fontSize: "50px",
      }
    }));

  const Android12Switch = styled(Switch)(({ theme }) => ({
      padding: 8,
      width:'200px',
      height:'58px',
      marginRight:'10px',
      '& .MuiSwitch-switchBase': {
        color: 'black',
        '&.Mui-checked': {
          transform: 'translateX(90.5px)',
          color: 'black',
          '& .MuiSwitch-thumb': {
            borderRadius:' 0% 16% 16% 0%',
            '&:before': {
              opacity: '0',
              transition: 'all 0.2s',
            },
            '&:after': {
              opacity: '1',
              transition: 'all 0.2s',
            },
          },
          '& + .MuiSwitch-track': {
            // opacity: 0,
            backgroundColor:'rgb(5,49,80,0)',
          },
        },
      },
      '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        border:'solid 2px #000',
        backgroundColor:'rgb(5,49,80,0)',
        '&:before': {
          fontFamily:' HiraKakuProN-W6',
          content: '"非公開"',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          // width: '50%',
          height: 16,
          left: 35 ,
          color: 'black',
        },
        '&:after': {
          fontFamily:' HiraKakuProN-W6',
          content: '"公開"',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          // width: '50%',
          height: 16,
          right: 35,
          color: 'black',
        },
      },
      '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: '92px',
        height: '40px',
        margin: 0,
        borderRadius:' 16% 0% 0% 16%',
        border:'solid 1px',
        backgroundColor:' rgb(0 0 0 /1)',
        '&:before': {
          fontFamily:' HiraKakuProN-W6',
          content: '"非公開"',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          // width: '50%',
          height: 16,
          left: 35 ,
          color: 'white',
          opacity: 1,
        },
        '&:after': {
          fontFamily:' HiraKakuProN-W6',
          content: '"公開"',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          // width: '50%',
          height: 16,
          right: 35,
          color: 'white',
          // mixBlendMode: 'difference',
          opacity: 0,
        },
      },
    }));
  const StyledButton = styled(Button)(() => ({
      '&.btn':{
        // border:' none',
        borderRadius: '0px',
        fontFamily:' inherit',
        fontSize:' inherit',
        cursor:' pointer',
        padding:' 25px 80px',
        display:' inline-block',
        margin:' 15px 0px',
        textTransform:' uppercase',
        letterSpacing:' 1px',
        fontWeight:' 700',
        outline:' none',
        position:' relative',
        transition:' all 0.3s',
          '&.btn-3' :{
            // background: '#fcad26',
            borderBottom:'solid 1px',
            color: '#000',
            '&:hover': {
              // background: '#f29e0d',
            },
            '&:active' :{
              background: '#f58500',
              top: '2px',
            },
            '&:before' :{
              position:' absolute',
              height:' 100%',
              left:' 0',
              top:' -17px',
              lineHeight:'3',
              fontSize:'200%',
              width:' 22px',
            },
          },
          '&.btn-3e':{
            padding: '11px 49px 10px 18px',
            overflow: 'hidden',
            '&:hover:before':{
              right: '5px',
            },
            '&:before' :{
              content: '"➡︎"',
              left: 'auto',
              right: '10px',
              zindex: '2',
            },
          }

        },
    }));

  const inputlabel={
    style:{
      fontSize: 20,
      fontFamily:'IMPACT'
    }
    }

  const inputProps = {
    style:{
      fontSize: 15,
      fontWeight:600,
    }
    }

export default function MakeArticle() {

    const {control,handleSubmit,setValue,resetValue} = useArticleContext();
    const [checked, setChecked] = React.useState(true);
    const [status, setStatus] =React.useState("公開")
    const [submit, setSubmit] =React.useState("POST")

    React.useEffect(()=>{ 
      resetValue() 
    },[]);

    const handleChange = (event) => {
      setChecked(event.target.checked);
      if(event.target.checked==true){
        setStatus("公開")
        setSubmit("POST")
        setValue("status", 0);

      }else{
        setStatus("非公開")
        setSubmit("SAVE")
        setValue("status", 1);

      }

    };

    // データ送信
    const onSubmit = async(data) => {
      console.log(JSON.stringify(data.tag))
      data.tag = JSON.stringify(data.tag)
      console.log(data)
      const result = await api.post('/article/regist', new URLSearchParams(data))
      resetValue() 
    };


    return(
        <ContentBox>     
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <Item>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='main' style={{textAlign :"left",marginRight:"5%",marginLeft:"5%"}}>

                                    <div  style={{display:'flex'}}>
                                        {/* タイトル */}
                                      <Box  compoznent="form" sx={{'& > :not(style)': { m: 1, width: '78ch' },}} noValidate autoComplete="off">
                                          <Controller
                                              name="name"
                                              // propsとしてcontrolオブジェクトを渡す 
                                              control={control}
                                              render={({ field: { onChange, value, ref } }) => (
                                              <StyledTextField  InputLabelProps={inputlabel} inputProps={inputProps} id="name" name ="name" value={value} onChange={onChange} label="Title" variant="standard" />
                                              )}
                                          />
                                      </Box>
                                        {/* <p>状態</p> */}
                                        <Stack  style={{marginLeft:"auto"}}direction="row" spacing={1} alignItems="center">
                                            <Android12Switch
                                                checked={checked}
                                                onChange={handleChange}
                                                inputProps={{  }}
                                            />
                                            {/* 送信ボタン */}
                                          <div style={{margin:"4px",textAlign: "right"}} >
                                              <StyledButton className='btn btn-3 btn-3e icon-arrow-right' type='submit'>{submit}</StyledButton>
                                          </div>
                                        </Stack>
                                    </div>
                                {/* タグ */}
                                <div style={{margin:"6px"}}>
                                    <Tag></Tag>
                                </div>

                                {/* 本文 */}
                                    <div style={{marginTop:"48px"}} data-color-mode="light">
                                      <Controller
                                            name="body"
                                            // propsとしてcontrolオブジェクトを渡す 
                                            control={control}
                                            render={({ field: { onChange, value, ref } }) => (
                                                <MDEditor height={616}  value={value} onChange={onChange} />
                                            )}
                                        />
                                    </div>

                            </div>
                        </form>
                    </Item>
                </Grid> 
            </Grid>
        </ContentBox>
    )
}