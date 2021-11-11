import { useState } from 'react'
import './Searchbar.css'
import { useNavigate } from 'react-router'

export default function Searchbar() {
  let navigate = useNavigate() // var to navigate
  const [term, setTerm] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/search?q=${term}`) // navigate to the given url
  }
  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          onChange={(e) => setTerm(e.target.value)}
          value={term}
          required
        />
      </form>
    </div>
  )
}
