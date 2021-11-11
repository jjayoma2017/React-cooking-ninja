import './Search.css'
import { useLocation } from 'react-router'
import { useFetch } from '../../hooks/useFetch'
import RecipeList from '../../components/RecipeList'

function Search() {
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const term = queryParams.get('q')
  const { data, isPending, error } = useFetch(
    `http://localhost:3000/recipes?q=${term}`,
  )
  return (
    <div>
      <h2 className="page-title">Recipes including "{term}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}

export default Search
