import './Create.css'
import { useRef, useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useNavigate } from 'react-router'

function Create() {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const ingredientInput = useRef(null)
  let navigate = useNavigate()

  const { postData, data: recipe, error } = useFetch(
    'http://localhost:3000/recipes',
    'POST',
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    await postData({
      title,
      ingredients,
      method,
      cookingTime: cookingTime + ' minutes',
    })

    if (recipe) {
      await navigate('/')
    }
  }

  const handleAdd = (e) => {
    e.preventDefault()
    console.log(newIngredient)
    const ing = newIngredient.trim()
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing])
    }
    setNewIngredient('')
    ingredientInput.current.focus()
  }

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe ingredients</span>
          <div className="ingredients">
            <input
              type="text"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              ref={ingredientInput}
            />
            <button className="btn" onClick={handleAdd}>
              add
            </button>
          </div>
        </label>
        <p>
          Current ingredients:
          {ingredients.map((i) => (
            <em key={i}>{i}, </em>
          ))}
        </p>

        <label>
          <span>Recipe Method</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>Cooking time (minutes)</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className="button">Submit</button>
      </form>
    </div>
  )
}

export default Create
