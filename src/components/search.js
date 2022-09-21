import React from 'react'

const Search = (props) =>{
  return(
    <form>
        <h3>Search:</h3>
        <input value={props.searchInput} onChange={props.searchListener} />
        <button type='submit'>Search</button>
      </form>
  )
}
export default Search 