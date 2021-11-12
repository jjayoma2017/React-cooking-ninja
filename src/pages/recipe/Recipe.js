import './Recipe.css'
import { useFetch } from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'

function Recipe() {
  const { id } = useParams()
  const { mode } = useTheme()

  const { data: recipe, isPending, error } = useFetch(
    `http://localhost:3000/recipes/${id}`,
  )
  return (
    <div className={`recipe ${mode}`}>
      <h2>Recipe</h2>
      {isPending && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing} </li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  )
}

export default Recipe
