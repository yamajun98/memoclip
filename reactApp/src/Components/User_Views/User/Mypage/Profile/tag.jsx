import * as React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { api } from '../../../../../Function/api';
import { useContentContext } from '../../../../../provider/MypageProvide';


    const StyledTextField = styled(TextField)(() => ({
        '&.MuiInputLabel-root':{
        fontSize: "50px",
        }
        }));
    const inputlabel={
        style:{
            fontSize: 20,
            fontFamily:'IMPACT'
        }
    }

export default function Tag(props) {
    const fixedOptions = [];
    const [tags,setTags] =React.useState([]);
    const {control } = useContentContext();

    // tag取得
    useEffect(()=>{
        (async()=>{
            const result = await api.get('/tag/get',{responseType: "json"},{ ContentType: 'application/json'})
            setTags(...tags, result.data)
        })()
    },[]);

    return(
            <Controller
                name= "tag"           // propsとしてcontrolオブジェクトを渡す 
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                    <Autocomplete
                        multiple //複数可
                        clearOnBlur // 新規選択肢を追加可
                        id="fixed-tags-demo"
                        value={value}
                        onChange={(event, newValue) => {
                                        onChange([
                                        ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
                                        ]);
                                    }}
                        options={tags}      
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.name || "" }
                        renderTags={(tagValue, getTagProps) =>
                                tagValue?.map((option, index) => (
                                <Chip label={option.name} {...getTagProps({ index })} disabled={fixedOptions.indexOf(option) !== -1}/>
                                )
                        )}
                        style={{ width: 300 }}
                        renderInput={(params) => (
                            <StyledTextField {...params} InputLabelProps={inputlabel} variant="standard" label="Fixed tag" placeholder="Favorites" />
                        )}
                    /> 
                )}/>

    )
}