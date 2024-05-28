import { createContext, useState } from 'react'
import { useGetData } from '../hooks/useGetData';
import { useDebounce } from 'use-debounce'

export const DataContext = createContext();

// eslint-disable-next-line react/prop-types
export const GetDataContext = ({ children }) => {
  const [search, setSearch] = useState('')
  const [addNewData, setAddNewData] = useState(false)
  const [debounceValue] = useDebounce(search, 500)
  const { data, loading } = useGetData({ search: debounceValue })
  const [editData, setEditData] = useState({
    title: '',
    description: '',
    id: ''
  })
  
  return (
    <DataContext.Provider value={{ 
      data,
      loading,
      addNewData, 
      search,
      editData,
      setSearch,
      setAddNewData,
      setEditData
    }}>
      {children}
    </DataContext.Provider>
  )
};