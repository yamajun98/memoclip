const Layout1 = () => {
    return(
    <>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start"  >
        <ListItemButton  component={Link} to={value?.roomName}   state={{ id: value.id,roomName:value?.roomName }}>
            <Avatar alt="Cindy Baker" src={"/image/"+value.User.image} sx={{ width: 56, height: 56 }}/>
            <ListItemText
            style={{marginLeft:"20px"}}
            primary={
            <div style={{display:"flex"}}>
                <div>
                    {value.User.name}
                </div>
                <div style={{marginLeft:"auto"}}>
                    {formatDate(value)} 
                </div>
            </div> 
            }
            secondary={
                <React.Fragment> 
                        {value.ChatText[0]?.text}
                </React.Fragment>
            }
            /> 
            <ListItemAvatar>
            
            </ListItemAvatar>
        </ListItemButton>

        </ListItem>     
    </>

    )
}

export default Layout1;