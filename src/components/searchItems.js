import React, { useEffect, useState } from 'react';
import { ReactComponent as CloseIcon } from '../svg/close.svg';
import { getStorage, removeStorage, setStorage } from '../common/helper';

const SearchItems = (props) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log(props.storeItem);
    const storeItem = props.storeItem;
    const localStore = getStorage();
    setResults(localStore);
    if (!storeItem.symbol) {
      return;
    }
    if(localStore.some(s => s.symbol === storeItem.symbol)) {
      return;
    }
    setStorage(storeItem);
    setResults(getStorage());
  }, [props.storeItem])

  const clearItems = () => {
    removeStorage();
    setResults(getStorage());
  }
  return (
    <div className="mt-4">
      <div className="flex justify-between">
        <small className="border-b pb-1 text-sm">Recent Search</small>
        {results.length ? <button type="button" onClick={clearItems}><CloseIcon /></button> : '' }
      </div>
      
      <ul className="mt-4">
        {results.map(result => 
          <li key={result.symbol} class="border-b px-3 py-2 hover:bg-gray-200 rounded">
              <button className="w-full text-left" onClick={() => props.stockSelection(result.symbol)}>
                <div className="flex justify-between">
                  <span>{result.symbol}</span>
                  <span className="text-indigo-400">${result.price}</span>
                </div>
              </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default SearchItems;
