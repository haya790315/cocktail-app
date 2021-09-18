import React,{useRef,useEffect} from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const {setSearchTerm} = useGlobalContext();
  const searchValue = useRef('');
  const searchCocktail = ()=>{
    setSearchTerm(searchValue.current.value)
  };
  useEffect(() => {
    searchValue.current.focus();
  }, []);

  const submitHandler  = (e)=>{
    e.preventDefault();
  }

  return (
    <section className="section search">
      <form  className="search-form" onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="name">search your favorite cocktail</label>
          <input type="text"id="name" ref={searchValue} onChange={searchCocktail}/>
        </div>
      </form>
    </section>
  )
}

export default SearchForm