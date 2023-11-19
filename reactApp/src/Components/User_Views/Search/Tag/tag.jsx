import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useLocation,Link,useParams,useSearchParams } from "react-router-dom";

const StyledItem = styled('div')(({ theme }) => ({
        textAlign:"center",
        border: 'solid 0.5px',
        borderRadius: '7px',
        padding:'5%',
        width: 'inherit',
        '&:hover':{
            backgroundColor:'#f6f6f6',
        }
    }));
    const ImageBox = styled('div')(({ url }) => ({
        '&.image':{
                width: '100%',  
                height: '80px', 
                margin: 'auto',
                backgroundImage: 'url(/image/'+url+')',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat:' no-repeat',
                zIndex: '1',
                position: 'relative',
            },
        }));
export default function Tag(props) {
    const {name,id,image} = props

    return(
            <Grid xs={4} md={3} lg={2}  >
                <Button style={{width:'-webkit-fill-available'}} component={Link} to= {`/tag/`+name}  state={{ Id:id,image:image}}>
                    <StyledItem >
                            <ImageBox className='image' url={image} />
                            <div> {name} </div>
                    </StyledItem>
                </Button>

            </Grid>            
    );
}
