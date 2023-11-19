import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar'; 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import EnhancedTableToolbar from './Toolbar';
import EnhancedTableHead from './tableHead';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { useLocation,Link,useParams } from "react-router-dom";
import { api } from '../../../Function/api';
import { Button } from '@mui/material';
import EditDialog from './edit';
import DeleteDialog from './delete';



const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px 30px 30px 30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}



export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [open, setOpen] = React.useState(false);
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [tag, setTag] = React.useState([]);
  const [value, setValue] = React.useState([]);
  const [id, setId] = React.useState('');
  const [reload, setReload] = React.useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);

React.useEffect(()=>{
    (async()=>{
        const result = await api.post('admin/get/tag',new URLSearchParams({"page":page}))
        console.log(result)
        setTag(result.data)
    })()
   
    },[reload])

    const [deleteopen, setDeleteOpen] = React.useState(false);
    const [openAlart, setOpenAlart] = React.useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = tag.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };
  
  const onDelete = (id) => {
   setDeleteOpen(true)
   setId(id)
  };
  const reloadChange = () => {
    setReload(!reload)
   };

  const onEdit = (value) => {
    setOpen(true)
    setValue(value)
   };
 

  const isSelected = (id) => selected.indexOf(id) !== -1;

 

  return (
    <ContentBox>
        <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>

            <EnhancedTableToolbar setSelected={setSelected} selected={selected} reload={reloadChange}/>
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={tag.length}
                    />
                    {/* 配列 */}
                    <TableBody>
                        {stableSort(tag, getComparator(order, orderBy))
                            .map((value, index) => {

                            const isItemSelected = isSelected(value.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                hover
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={value.id}
                                selected={isItemSelected}
                                sx={{ cursor: 'pointer' }}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                        color="primary"
                                        checked={isItemSelected}
                                        onClick={(event) => handleClick(event, value.id)}
                                        inputProps={{
                                            'aria-labelledby': labelId,
                                        }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                        padding="none"
                                        align="center"
                                    >
                                        {value.id}
                                    </TableCell>
                                    
                                    <TableCell align="center">
                                        {value.image == undefined ?
                                        <Avatar src={"/image/userIcon.jpeg"} style={{margin:'auto'}}/>
                                        :
                                        <Avatar src={"/image/"+value?.image}  style={{margin:'auto'}}/>
                                        }
                                    </TableCell>
                                    <TableCell align="center">{value.name}</TableCell>  
                                    <TableCell align="center">{value.Tag_Article.length}</TableCell>    
                                    <TableCell align="center">{value.createdAt}</TableCell>
                                    <TableCell align="center">{value.updatedAt}</TableCell>
                                    <TableCell align="center">
                                        <Button onClick={()=>{
                                          onEdit(value)  
                                        }}>edit</Button>
                                        <Button  onClick={()=>{
                                          onDelete(value.id)  
                                        }} >delete</Button>
                                    </TableCell>
                                </TableRow>
                            );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
              <Pagination
              page={page}
            //   count={count}
              style={{marginLeft: "46%",height: 'min-content'}}
              renderItem={(item) => (
                  <PaginationItem
                  component={Link}
                  to={`${item.page === 1 ? '' : `?page=${item.page}`}`}
                  {...item}
                  />
              )}
              />
        </Paper>
        </Box>
        <EditDialog open = {open} setOpen={setOpen} value={value}></EditDialog>
        <DeleteDialog open = {deleteopen} setOpen={setDeleteOpen} id={id} reload={reloadChange}></DeleteDialog>
    </ContentBox>   
  );
}
