import { useContext, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Stack, TablePagination } from '@mui/material';
import { DataContext } from '../context/DataContext.jsx';
import { EditICon, TrashICon } from '../icons/AllIcons.jsx';
import { URL } from '../constants.js';

const DataTable = () => {
  const { data, setAddNewData, setEditData, setShowDataDetails, setRowDetails, setDataFromLocalStorage, debounceValue } = useContext(DataContext)
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteRow = async (e, id) => {
    e.stopPropagation()
    e.preventDefault()

    // best option
    await fetch(`${URL}/posts/${id}`, { method: 'DELETE' });

    // option 2
    const filteredData = data.filter(row => row.id !== id)
    window.localStorage.setItem('data', JSON.stringify(filteredData.filter(x => x.id <= 100)))
    window.localStorage.setItem('new-data', JSON.stringify(filteredData.filter(x => x.id > 100)))
    setDataFromLocalStorage(filteredData)
  }

  const handleEditRow = (e, row) => {
    e.stopPropagation()
    e.preventDefault()
    setAddNewData(true)
    setEditData({
      title: row.title,
      description: row.body,
      id: row.id
    })
  }

  const handleShowDataDetails = (rowData) => {
    setShowDataDetails(true)
    setRowDetails(rowData)
  }

  const filteredData = data.filter(data => {
    if(!debounceValue || !debounceValue.trim()) return data
    return data.title.toLowerCase().includes(debounceValue.toLowerCase())
  })
  const dataPerPage = filteredData.slice(page * rowsPerPage, rowsPerPage * (page + 1))

  const ellipsiStyles = {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    padding: '8px'
  }

  return (
    <Paper sx={{ width: '1000px' }}>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size='small' aria-label="simple table">
        <TableHead >
          <TableRow>
            <TableCell style={{fontSize: '14px', fontWeight: '600', padding: '12px 8px'}}>ID</TableCell>
            <TableCell style={{fontSize: '14px', fontWeight: '600', padding: '12px 8px', width: '200px'}} className='title' align="left">Title</TableCell>
            <TableCell style={{fontSize: '14px', fontWeight: '600', padding: '12px 8px', width: '550px'}} className='description' align="left">Description</TableCell>
            <TableCell style={{fontSize: '14px', fontWeight: '600', padding: '12px 8px'}} align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataPerPage.map((row) => (
            <TableRow
              style={{cursor: 'pointer'}}
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => handleShowDataDetails(row)}
            >
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell style={{...ellipsiStyles, maxWidth: '250px'}} align="left">{row.title}</TableCell>
              <TableCell style={{...ellipsiStyles, maxWidth: '550px'}} align="left">{row.body}</TableCell>
              <TableCell align="center">
                <Stack direction='row' spacing={1}>
                  <IconButton onClick={(e) => handleEditRow(e, row)} size='small' color='secondary' aria-label='update row'>
                    <EditICon />
                  </IconButton>
                  <IconButton onClick={(e) => handleDeleteRow(e, row.id)} size='small' color='error' aria-label='eliminate row'>
                    <TrashICon />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default DataTable