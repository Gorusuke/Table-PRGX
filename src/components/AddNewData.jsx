import { useState } from 'react'
import '../App.css'

const AddNewData = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    if(!formData.title || !formData.description) {
      alert('All fields are required')
      return
    }
    const newData = JSON.parse(window.localStorage.getItem('new-data')) || []
    const addNewData = [{...formData, id: (newData.length ? newData.at(-1)[0].id : 100) + 1}]
    newData.push(addNewData)
    window.localStorage.setItem('new-data', JSON.stringify(newData))
    setFormData({ title: '', description: '' })
  }

  return (
    <>
      <form className='form' onSubmit={handleOnSubmit}>
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
        <button>Enviar</button>
      </form>
    </>
  )
}

export default AddNewData