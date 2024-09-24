import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    navigate(`/products?search=${searchTerm}`)
    setSearchTerm('')
  }

  const handleInput = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }
  return (
    <>
      <form>
        <input
          value={searchTerm}
          onKeyDown={handleInput}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search..."
        />
      </form>
    </>
  )
}

export default Search
