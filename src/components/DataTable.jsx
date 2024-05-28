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
  const { data, setAddNewData, setEditData} = useContext(DataContext)
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteRow = async (id) => {
    // best option
    await fetch(`${URL}/posts/${id}`, { method: 'DELETE' });

    // option 2
    const filteredData = data.filter(row => row.id === id) // <- poner el !
    // update localStorage
    console.log(filteredData)
  }

  const handleEditRow = (row) => {
    setAddNewData(true)
    setEditData({
      title: row.title,
      description: row.body,
      id: row.id
    })
  }

  const dataPerPage = data.slice(page * rowsPerPage, rowsPerPage * (page + 1))

  return (
    <Paper sx={{ width: '1000px' }}>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size='small' aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataPerPage.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="center">{row.body.slice(0, 20)}</TableCell>
              <TableCell align="center">
                <Stack direction='row' spacing={1}>
                  <IconButton onClick={() => handleEditRow(row)} size='small' color='secondary' aria-label='update row'>
                    <EditICon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteRow(row.id)} size='small' color='error' aria-label='eliminate row'>
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
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>

  )
}

export default DataTable