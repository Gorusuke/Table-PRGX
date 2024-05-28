import {useEffect, useState} from 'react'
import { URL } from '../constants'

export const useGetData = ({ search }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      const response = await fetch(`${URL}/posts`)
      const result = await response.json()
      setData(result)
      setLoading(false)
    }
    getData()
  }, [])

  const filteredData = data.filter(data => {
    return data.title.toLowerCase().includes(search.toLowerCase())
  })
  const isSearching = !search || !search.trim()
  const getData = isSearching ? data : filteredData

  return { data: getData, loading }
}