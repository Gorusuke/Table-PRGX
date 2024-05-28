import AddNewData from './components/AddNewData.jsx'
import DataTable from './components/DataTable.jsx'
import Header from './components/Header.jsx'
import { DataContext } from './context/DataContext.jsx'
import { useContext } from 'react'
import './App.css'

function App() {
  const {loading, addNewData} = useContext(DataContext)

  return (
    <>
      {addNewData && <AddNewData />}
      {!addNewData &&
        <>
          <Header />
          {loading && '....Loading'}
          {!loading && <DataTable />}
        </>
      }
    </>
  )
}

export default App
