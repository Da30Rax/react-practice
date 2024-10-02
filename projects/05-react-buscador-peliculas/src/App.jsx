import './App.css'
import { useMovies } from "./hooks/useMovies"
import { useSearch } from './hooks/useSearch'
import { useCallback, useState } from 'react'
import { Movies } from "./components/Movies"
import debounce from 'just-debounce-it'

function App() {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debounceGetMovies = useCallback(
    debounce(search => {
      console.log('search', search)
      getMovies({ search })
    }, 200)
    , [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debounceGetMovies(newSearch)
  }

  return (
    <div className='page'>

      <header>
        <h1>Buscador de peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars, The Matrix...' />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Cargando</p> : <Movies movies={movies}/>
        }
      </main>
    </div>
  )
}

export default App
