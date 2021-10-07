import { ReactComponent as SearchIcon } from '../svg/search.svg';
import { ReactComponent as CloseIcon } from '../svg/close.svg';
import React, { useMemo, useEffect, useState, useRef } from 'react';
import { searchQuery, url } from '../common/constants';
import debounce from 'lodash.debounce';

export const fetchData = async (query, value) => {
  const path = `${url}/query?function=${query.function}&${query.key}=${value}&apikey=${process.env.REACT_APP_API_KEY}`;
  // Mock API
  // const path = query.function === searchQuery.function ? '/mock/search.json' : `/mock/overview-${value}.json`;
  try {
      let response = await (await fetch(path)).json();
      return response;
  } catch (error) {
      console.error('Error in fetching data', error);
      throw error;
  }
}

function Search(props) {
  const [searchTxt, setSearchTxt] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef();

  const changeHandler = (e) => {
    setSearchTxt(e.target.value.trim());
  }

  const submitHandler = (e) => {
    const symbol = inputRef.current.value;
    props.stockSelection(symbol);
    setResults([]);
    setSearchTxt('');
    e.preventDefault();
  }
  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 500)
  , []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const data = await fetchData(searchQuery, searchTxt);
      setResults(data.bestMatches ? data.bestMatches : []);
    }
    // const handler =debounce(fetchSearchResults, 300)
    if (searchTxt) {
      fetchSearchResults();
    } else{
      setResults([]);
      props.stockSelection('')
    }
    return () => {
      debouncedChangeHandler.cancel();
    }
  }, [searchTxt])
  
  const stockSelection = (symbol) => {
    props.stockSelection(symbol);
    inputRef.current.value = symbol;
    setResults([]);
  }
  return (
    <div className="w-full max-w-lg mx-auto relative">
      <form className="border-b border-gray-400 text-3xl" onSubmit={submitHandler}>
        <div className="relative text-gray-600 focus-within:text-gray-900">
          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input type="text" name="symbol" id="price" className="py-3 placeholder-gray-400 text-gray-900 appearance-none w-full block pl-9 focus:outline-none" placeholder="Search for stocks" autoComplete="off" onChange={debouncedChangeHandler} defaultValue={searchTxt} ref={inputRef}/>
          <div className="absolute inset-y-0 right-0 flex items-center">
            {
              searchTxt ? 
                <button type="button" onClick={() => { setSearchTxt(''); inputRef.current.value = '' }}>
                  <CloseIcon />
                </button> 
                : ''
            }
            {/* <button type="button" className="bg-transparent hover:bg-gray-900 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded">Search</button> */}
          </div>
          
        </div>
      </form>
      <ul className="mt-4 absolute w-full bg-gray-200 rounded shadow">
        { results.map(result => 
          <li key={result['1. symbol']} className="border-b pl-3 py-2 hover:bg-blue-300 rounded">
            <button className="w-full text-left" onClick={() => stockSelection(result['1. symbol'])}>{result['1. symbol']}</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Search;
