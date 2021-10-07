import React, { useEffect, useState } from 'react';
import { getStorage, setStorage } from '../common/helper';
import Overview from './overview';
import Search from './search';
import SearchItems from './searchItems';
import _ from 'lodash';

const Home = (props) => {
  const [symbol, setSymbol] = useState('');
  const [storeItem, setStoreItem] = useState({symbol:'', price:0});

  const selectStock = (symbol) => setSymbol(symbol);
  const stockDataHandler = (stock) => {
    if (_.isEmpty(stock)) {
      setSymbol('');
    }
    else {
      setStoreItem({
        ...storeItem,
        ...{symbol: stock.Symbol, price: stock.AnalystTargetPrice}
      })
    }
  }

  const NotFound = () => (
    <div className="flex items-center mt-36">
      <div className="mx-auto">
        <h2 className="text-3xl text-indigo-700 text-center">No Data Found</h2>
        <div className="text-md text-indigo-700 text-center">Please try again</div>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <div className="flex mt-4">
        <aside className="w-1/6 rounded h-screen">
          <h1 className="text-3xl text-indigo-700 text-left">{props.title}</h1>
          <small className="text-gray-600">- Power by Alphavantage</small>
          <SearchItems storeItem={storeItem} stockSelection={selectStock}/>
        </aside>
        <main className="w-5/6 ml-4">
          <header className="w-full mx-auto">
            <Search stockSelection={selectStock}/>
          </header>
          <section className="p-3 mt-8">
            {symbol ? <Overview symbol={symbol} dataHandler={stockDataHandler}/> : <NotFound/> }
          </section>
        </main>
      </div>
    </React.Fragment>
  );
}

export default Home;
