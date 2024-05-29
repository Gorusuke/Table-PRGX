// import React from 'react'

import { useContext } from "react"
import { DataContext } from "../context/DataContext"
import { Button } from "@mui/material"
// import { URL } from "../constants"

const RowDetails = () => {
  const { rowDetails, setShowDataDetails, setRowDetails } = useContext(DataContext)
  // const [rowDetail, setRowDetail] = useState({})

  // useEffect(() => {
  //   // Do it because is a test requirement, but better if we use rowDetails
  //   const getRowDetail = async () => {
  //     const response = await fetch(`${URL}/posts/${rowDetails.id}`)
  //     const result = await response.json()
  //     setRowDetail(result)
  //   }
  //   getRowDetail()
  // }, [rowDetails.id])

  const handleClickExit = () => {
    setShowDataDetails(false)
    setRowDetails({})
  }

  return (
    <section className="row-detail-form">
      <Button variant="contained" color="error" onClick={handleClickExit}>&#10005;</Button>
      <div>
        <h3>ID: {rowDetails.id}</h3>
      </div>
      <div>
        <h3>Title:</h3>
        <p>{rowDetails.title}</p>
      </div>
      <div>
        <h3>Description:</h3>
        <p>{rowDetails.body}</p>
      </div>
    </section>
  )
}

export default RowDetails