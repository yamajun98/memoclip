import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import {api} from '../../../Function/api'
import useAuth from '../../../Auth/useAuth';

export default function FavoriteButton(props){
    const [bloom, setBloom] = React.useState(props.favorite.length === 0 ? true : false);
    const {isGuest} = useAuth();
    const handleClickOpen = async() => {
        if(bloom){// 保存
            const result =  await api.post('/article/favorite/regist',new URLSearchParams({"article_id":props.id,"user_id":localStorage.getItem("id")}))
        }else{// 解除
            const result =  await api.post('/article/favorite/delete',new URLSearchParams({"article_id":props.id,"user_id":localStorage.getItem("id")}))
        }
        setBloom(!bloom);
    };

    return(
        <> 
        { isGuest != 'true' &&  
        <IconButton variant="outlined" onClick={handleClickOpen}> 
            {bloom ? <StarBorderIcon></StarBorderIcon>:<StarIcon></StarIcon> }
        </IconButton>
        }
        </>

    )
}