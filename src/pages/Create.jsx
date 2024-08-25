import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { useNavigate } from 'react-router-dom';

const Create = () => {
  let [ title, setTitle ] = useState('');
  let [ description, setDescription ] = useState('');
  let [ newCategory, setNewCategory ] = useState('');
  let [ categories, setCategories ] = useState([]);

  let { setPostData, data : book }= useFetch('http://localhost:5000/books', 'POST');
  let navigate = useNavigate();

  let addCategory = (e) => {
    e.preventDefault();
    if(newCategory && categories.includes(newCategory)) {
      setNewCategory('')
      return;
    }
    setCategories(prev => [newCategory, ...prev]);
    setNewCategory('');    
  }

  let addBook = (e) => {
    e.preventDefault();
    let data = {
      title, 
      description,
      categories
    }    
    setPostData(data)
  }

  useEffect(() => {
    if(book) {
      navigate('/');
    }
  }, [book])

  return (
    <div>
      <form className="w-full max-w-lg mx-auto mt-5" onSubmit={ addBook }>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
              Book Title
            </label>
            <input value={title} onChange={ e => setTitle(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Book Title" />
            <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
              Book Description
            </label>
            <textarea value={description} onChange={ e => setDescription(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Book Description" />
            <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
              Categories 
            </label>
            <div className='flex items-center space-x-2'>
              <input value={newCategory} onChange={ e => setNewCategory(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Book Category" />
              <button onClick={addCategory} className='bg-primary p-1 rounded-lg mb-3'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6  text-white p-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
          </div>
          <div className='flex flex-wrap'>         
            {
            categories && categories.map(c => (
                <span key={c} className='mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-primary'>
                    {c}
                </span>        
            ))
            }
        </div> 
        </div>
        {/** Create book button */}
        <button className='flex items-center justify-center gap-1 text-white bg-primary px-3 py-2 rounded-2xl w-full'>
          
          <span className='hidden md:block'>Create book</span>
        </button>
    </form>
    </div>
  )
}

export default Create