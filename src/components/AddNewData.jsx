import { useContext, useState } from 'react'
import { DataContext } from '../context/DataContext'
import { Button } from '@mui/material'
import { URL } from '../constants'
import '../App.css'

const AddNewData = () => {
  const { setAddNewData, editData, setEditData } = useContext(DataContext)
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
    const updatePostUrl = `${URL}/posts/${editData.id}`
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
    const result = await response.json()
    console.log(result)

    // option 2
    if(editData.id) {
      // update localStorage
      console.log('hola')
    } else {
      const newData = JSON.parse(window.localStorage.getItem('new-data')) || []
      const addNewData = [{...formData, id: (newData.length ? newData.at(-1)[0].id : 100) + 1}]
      newData.push(addNewData)
      window.localStorage.setItem('new-data', JSON.stringify(newData))
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