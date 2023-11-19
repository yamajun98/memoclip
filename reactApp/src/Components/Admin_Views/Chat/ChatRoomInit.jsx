import * as React from 'react';
import { styled } from '@mui/material/styles';
import Title  from './Title';

    const ContentBox = styled('div')(({ theme }) => ({
            width:'100%',
            height:'100%',
            borderLeft:'solid 2px #484848'
    }));

    const StyledItem = styled('div')(({ theme }) => ({
        border: 'none',
        borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
        borderRadius: '4px',
        height: 'fit-content',
            overflow: 'hidden',
        '&.title_box':{
            position: 'relative',
            withd:'100%',
            top:'30%',
            borderRadius: '0px',
            textAlign: 'center',
        }
    }));

    const Btnripple = styled('div')(({url}) => ({

    }));

export default function ChatRoom(){   
    return (
            <ContentBox>
                        <StyledItem className='title_box'>
                            <Title></Title>
                            <Btnripple className='btnripple'></Btnripple>
                            <Btnripple className='btnripple2'></Btnripple>
                            <Btnripple className='btnripple3'></Btnripple>
                        </StyledItem>    
            </ContentBox>

    )
}   
