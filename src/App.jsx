import './App.css';
import { Auth } from './components/auth';
import { db, auth } from './config/firebase.js'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { storage } from './config/firebase.js';
import { ref, uploadBytes } from 'firebase/storage';

function App() {
  const [movieList, setMovieList] = useState([])

  //newMovieStates
  const [newMovieTitle, setNewMovieTitle] = useState('')
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const [newRecievedOscar, setNewRecievedOscar] = useState(false)
  const [updateTitle, setUpdateTitle] = useState('')

  const [fileUpload, setFileUpload] = useState(null)

  const movieCollectionRef = collection(db, 'movies')

  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef)
      const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setMovieList(filteredData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    

    getMovieList()
  }, [])

  const onSubmitMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovieTitle, 
        releaseDate: newReleaseDate, 
        recievedAnOscar: newRecievedOscar,
        userId: auth?.currentUser?.uid
      })
      getMovieList()
    } catch (error) {
      console.log(error)
    }
  }

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, 'movies', id)
    await deleteDoc(movieDoc)
    getMovieList()
  }

  const updateMovie = async (id) => {
    const movieDoc = doc(db, 'movies', id)
    await updateDoc(movieDoc, {title: updateTitle})
    getMovieList()
  }

  const uploadFile = async () => {
    if (!fileUpload) return
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`)
    try {
      await uploadBytes(filesFolderRef, fileUpload)
    } catch (error) {
      console.log(error)
    }
  }
 

  return (
    <div className='App'>
      <Auth />
      <div>
        <input type="text" placeholder='Movie Title' onChange={(e) => setNewMovieTitle(e.target.value)} />
        <input type="number" placeholder='Release Date' onChange={(e) => setNewReleaseDate(Number(e.target.value))} />
        <input type="checkbox" checked={newRecievedOscar} onChange={(e) => setNewRecievedOscar(e.target.checked)} />
        <label> Recieved an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie!</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{color: movie.recievedAnOscar ? 'green' : 'red'}}>{ movie.title}</h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input type="text" name="" id="" placeholder='new title' onChange={(e) => setUpdateTitle(e.target.value)} />
            <button onClick={() => updateMovie(movie.id)}>update title</button>
          </div>
        ))}
      </div>

      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}> Upload File </button>
      </div>
    </div>
  );
}

export default App;
