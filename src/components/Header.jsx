import { useContext } from 'react'
import { Button } from '@mui/material'
import { DataContext } from '../context/DataContext'
import { SearchICon } from '../icons/AllIcons'
import '../App.css'

const Header = () => {
  const {setAddNewData, search, setSearch} = useContext(DataContext)

  return (
    <div className='header'>
      <div className='search-container'>
        <input
          className='search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search by title'
          type="text"
        />
        <SearchICon />
      </div>
      <Button onClick={() => setAddNewData(true)} size='small' variant='outlined' >Add New Data</Button>
    </div>
  )
}

export default Header