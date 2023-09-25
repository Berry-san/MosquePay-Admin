import React, { useState } from 'react'

const Search = ({ onSearch, place }) => {
  const [search, setSearch] = useState('')

  const onInputChange = (value) => {
    setSearch(value)
    onSearch(value)
  }
  return (
    <input
      type="text"
      className="border-transparent form-control form-focus-none"
      placeholder={place}
      value={search}
      onChange={(e) => onInputChange(e.target.value)}
    />
  )
}

export default Search
