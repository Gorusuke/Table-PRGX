import {useEffect, useState} from 'react'
import { URL } from '../constants'

export const useGetData = ({ search }) => {
  const [data, setData] = useState([]) // -> just to have all data from API
  const [loading, setLoading] = useState(false)
  const [dataFromLocalStorage, setDataFromLocalStorage] = useState(() => {
    const dataStorage = JSON.parse(window.localStorage.getItem('data')) ?? []
    const newDataStorage = JSON.parse(window.localStorage.getItem('new-data')) ?? []
    return [...dataStorage, ...newDataStorage]
  })

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      const response = await fetch(`${URL}/posts`)
      const result = await response.json()
      setData(result)
      setLoading(false)
      window.localStorage.setItem('data', JSON.stringify(result))
    }
    getData()
  }, [])

  // const dataStorage = [...data, ...dataFromLocalStorage] // good option but no the best

  const dataCallback = dataFromLocalStorage.length ? dataFromLocalStorage : data // just for the first render
  const filteredData = dataCallback.filter(data => {
    return data.title.toLowerCase().includes(search.toLowerCase())
  })
  const isSearching = !search || !search.trim()
  const realData = isSearching ? dataCallback : filteredData

  return { data: realData, loading, setDataFromLocalStorage }
}