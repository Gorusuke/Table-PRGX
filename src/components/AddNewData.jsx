import { useContext, useState } from 'react'
import { DataContext } from '../context/DataContext'
import { Button } from '@mui/material'
import { URL } from '../constants'
import '../App.css'

const AddNewData = () => {
  const { setAddNewData, editData, setEditData, setDataFromLocalStorage, data } = useContext(DataContext)
  const [formData, setFormData] = useState({
    title: editData.title ?? '',
    description: editData.description ?? ''
  })

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    if(!formData.title || !formData.description) {
      alert('All fields are required')
      return
    }
    // best option
    const createNewPostUrl = `${URL}/posts`
    const id = editData.id === 1 ? editData.id : 100 // This 'cause editData.id === 0 OR 101 do not exist 
    const updatePostUrl = `${URL}/posts/${id}`
    const finalUrl = editData.id ? updatePostUrl : createNewPostUrl

    const response = await fetch(finalUrl, {
      method: editData.id ? 'PUT' : 'POST',
      body: JSON.stringify({
        title: formData.title,
        body: formData.description,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    await response.json()

    // option 2
    if(editData.id) {
      const allData = data.map(data => {
        const isSameID = data.id === editData.id
        if (isSameID) {
          return {
            ...data,
            title: formData.title,
            body: formData.description
          };
        }
        return data;
      })
      window.localStorage.setItem('data', JSON.stringify(allData.slice(0, 100)))
      window.localStorage.setItem('new-data', JSON.stringify(allData.slice(100)))
      setDataFromLocalStorage(allData)
    } else {
      const addNewData = {
        title: formData.title,
        body: formData.description,
        id: data.at(-1).id + 1, 
        userId: 11
      }
      window.localStorage.setItem('new-data', JSON.stringify([...data.slice(100), addNewData]))
      setDataFromLocalStorage([...data, addNewData])
    }
    setFormData({ title: '', description: '' })
    setEditData({title: '', description: '', id: ''})
    setAddNewData(false)
  }

  const handleCancel = () => {
    setEditData({title: '', description: '', id: ''})
    setAddNewData(false)
  }

  return (
    <>
      <h2>{editData.title ? 'Update' :'Add New'} Row</h2>
      <form className='form'>
        <div className='input-container'>
          <label htmlFor="title">Title:</label>
          <input 
            className='input'
            id='title' 
            type="text" 
            value={formData.title}
            onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
          />
        </div>
        <div className='input-container'>
          <label htmlFor="description">Description:</label>
          <input 
            className='input'
            id='description' 
            type="text" 
            value={formData.description}
            onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
          />
        </div>
        <div className='buttons-container'>
          <Button size='small' color='error' variant='contained' onClick={handleCancel}>Cancelar</Button>
          <Button size='small' variant='contained' onClick={handleOnSubmit}>Enviar</Button>
        </div>
      </form>
    </>
  )
}

export default AddNewData