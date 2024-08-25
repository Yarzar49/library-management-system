import { NavLink, useLocation } from 'react-router-dom';
import book from '../assets/book1.jpg'
import useFetch from '../hooks/useFetch'
import ClipLoader from 'react-spinners/ClipLoader';

const BookList = () => {

  let location = useLocation();
  let params = new URLSearchParams(location.search); 
  let searchTitle =params.get('title')

    let { data : books, loading, error }= useFetch(`http://localhost:5000/books${searchTitle ? `?title=${searchTitle}` : ''}`);
    if (error) {
        return <p>{error}</p>
    }
  return (
    <>
    {loading &&  
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ClipLoader color="#3498db" loading={loading} size={150} />
      </div>
    }
    {!!books && (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 my-3'>
        {books.map((b) => (
          <NavLink to={`/books/${b.id}`}  key={b.id}>
             <div className='p-4 border border-1'>
             <img src={book} alt="" />
             <div className='text-center space-y-2 mt-3'>
             <h1>{b.title}</h1>
             <p>{b.description}</p>
             {/** genres */}
             <div className='flex flex-wrap'>
                {
                b.categories.map(c => (
                    <span key={c} className='mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-blue-500'>
                        {c}
                    </span>        
                ))
                }
             </div>    
             </div>
         </div>
          </NavLink>
        ))}
        {
          books && !books.length && <p className='text-center text-xl text-gray-500'>No Search Results Found!</p>
        }
     </div>
    )}
    </>
  )
}

export default BookList