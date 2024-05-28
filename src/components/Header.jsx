import { useContext } from 'react'
import { Button } from '@mui/material'
import { DataContext } from '../context/DataContext'
// import searchImg from '../assets/search.svg'

const Header = () => {
  const {setAddNewData, search, setSearch} = useContext(DataContext)

  return (
    <div className='header'>
      <>
        <input
          className=''
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search by title'
          type="text"
        />
        {/* <img src="../assets/search.svg" alt="search-icon" /> */}
      </>
      <Button onClick={() => setAddNewData(true)} size='small' variant='outlined' >Add New Data</Button>
    </div>
  )
}

export default Header