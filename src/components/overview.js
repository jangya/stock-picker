import React, { useEffect, useState } from 'react';
import { detailQuery } from '../common/constants';
import { fetchData } from './search';
import { ReactComponent as RefreshIcon } from '../svg/refresh.svg';
import _ from 'lodash';

const Overview = (props) => {
  const [stock, setStock] = useState({});
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const symbol = props.symbol;
    let interval = null;
    const fetchStock = async () => {
      const stockDetail = await fetchData(detailQuery, symbol);
      if (_.isEmpty(stockDetail)) {
        props.dataHandler({});
      } else {
        setStock(stockDetail);
        props.dataHandler(stockDetail);
      }
    }
    fetchStock();
    if (timer) {
      interval = setInterval(() => {
        fetchStock();
        console.log('Interval', timer);
      }, timer*1000);
    }
    
    return () => clearInterval(interval);
  }, [props.symbol, timer])

  const timerChangeHandler = (e) => {
    const inputTimer = parseInt(e.target.value.trim(), 10);
    setTimer(inputTimer ? inputTimer : timer);
  }

  const Card = ({label, value}) => (
    <div className="rounded shadow p-3 w-52">
      <h3 className="text-gray-900 text-md">{label}</h3>
      <p className="text-sm text-indigo-500">{value}</p>
    </div>
  );
  return (
    <React.Fragment>
      { _.isEmpty(stock) ? '' : 
        <div className="mt-10">  
          <div className="flex justify-between pb-2 border-b">
            <h1 className="text-indigo-500 text-xl ">{stock.Symbol}</h1>
            <div>
              Refresh in 
              <input className="border-b w-10 text-center appearance-none focus:outline-none" name="timer" type="text" defaultValue={timer} onBlur={timerChangeHandler}/>
              seconds
              <button className="align-top ml-1" onClick={() => setTimer(timer)}><RefreshIcon/></button>
            </div>
          </div>
          <small className="text-sm text-gray-500">
            <b>Name:</b> {stock.Name}
            &nbsp;&nbsp;&nbsp;
            <b>Industry:</b> {stock.Industry}
          </small>
          <div className="flex justify-between my-5 flex-wrap">
            <Card label="PE Ratio" value={stock.PERatio + '%'}/>
            <Card label="Market Cap" value={stock.MarketCapitalization}/>
            <Card label="Price" value={'$' + stock.AnalystTargetPrice}/>
          </div>
          <h3 className="text-gray-900 text-md mt-2">About</h3>
          <p className="text-xs text-gray-500">{stock.Description}</p>
        </div>
      }
    </React.Fragment>
  )
}

export default Overview;
