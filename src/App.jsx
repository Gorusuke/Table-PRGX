import { useContext } from 'react'
import { DataContext } from './context/DataContext.jsx'
import AddNewData from './components/AddNewData.jsx'
import DataTable from './components/DataTable.jsx'
import Header from './components/Header.jsx'
import RowDetails from './components/RowDetails.jsx'
import './App.css'

function App() {
  const {loading, addNewData, showDataDetails} = useContext(DataContext)

  return (
    <>
      {showDataDetails && <RowDetails />}
      {!showDataDetails && addNewData && <AddNewData />}
      {!showDataDetails && !addNewData &&
        <>
          <h1>Data Table</h1>
          <Header />
          {loading && '....Loading'}
          {!loading && <DataTable />}
        </>
      }
    </>
  )
}

export default App
