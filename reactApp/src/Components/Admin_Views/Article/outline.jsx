import { styled } from '@mui/material/styles';

const StyledList = styled('li')(() => ({
    listStyle:'none',
     '&.class1':{
        fontWeight: '300',
        '&:before':{
            background: '#81c9f670',
            width: '10px',
            content: '""',
            position: 'absolute',
            left: '6px',
            height: '10px',
            borderRadius: '10px',
            marginTop: '5px',
            border:'solid 2px white'
        }
     },
     '&.class2':{
        fontWeight: '300',
        '&:before':{
            background: '#81c9f670',
            width: '8px',
            content: '""',
            position: 'absolute',
            left: '7px',
            height: '8px',
            borderRadius: '10px',
            marginTop: '8px',
            border:'solid 2px white'
        }
     },
     '&.active':{
        fontWeight: '600',
        '&.class1':{
            '&:before':{
                background: '#00ceff',
            }
        },
        '&.class2':{
            '&:before':{
                background: '#00ceff',
            }
        }
    },
}));

const StyledUl= styled('ul')(() => ({
    position:'relative',
    width:"100%",
    height:"100%",
    margin: '10px 0px 0px',
    paddingLeft: '31px',
    '&:before':{
        background: '#eaebeb',
        width: '4px',
        content: '""',
        position: 'absolute',
        left: '9px',
        height: '87%',
        borderRadius: '10px',
        marginTop: '10px',
    }
    }));
const ContentBox= styled('div')(() => ({
    padding: '13px',
    boxShadow:'0px 0px 0px 1px rgb(0 0 0 / 10%)',
    }));

export default function Outline($props) {
        const {values} = $props
        return(
            <ContentBox>
                <div style={{fontFamily: 'monospace'}}>目次</div>
                <StyledUl >
                    {values?.map((value)=>(
                        <StyledList  className={'class'+value.level+' '+value.id}>
                            <a href={'#'+value.id} onClick={()=>{
                               
                                Array.from(document.querySelectorAll(".class1, .class2"))
                                    .map((elem) => (
                                        elem.classList.remove('active')
                                    ))
                                document.querySelector("."+value.id).classList.add('active');
                            }}>
                                {value.text}
                            </a>
                        </StyledList>
                    ))}
                </StyledUl>                    
            </ContentBox>
        )
    }