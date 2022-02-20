import './input.css'
import Axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  //Set up the initial states
  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState([]);

  useEffect(() => {
    Axios.get(`https://api.coinstats.app/public/v1/coins?skip=0&limit=100&currency=SGD`)
    .then((res) => {
      setCrypto(res.data.coins);
    });
  }, []);

  return (
    <div className="container mx-auto font-sans">
      <h1 className="text-3xl font-bold text-cyan-600 text-center py-5">All Cryptocurrencies</h1>
      <div className="items-center align-middle text-center py-5">
        <input className="text-xl w-6/12 py-2 px-2"
          type = "text"
          placeholder='Search'
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          />
      </div>

      <ul role="list" className="grid mt-6 grid-cols-4 gap-8">
      {crypto
            .filter((val) => {
              return val.name.toLowerCase().includes(search.toLowerCase());
            })
            .map((val, id) => {
              return (
                  <li key={id} className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-300">
                    <div className="flex-1 flex flex-col p-8">
                      <a href={val.websiteUrl}>
                        <img className="flex w-10 h-10 items-center" src={val.icon} alt="logo"/>
                        <h3 className="flex mt-4 text-gray-900 text-lg font-medium">{val.name}</h3>
                        <h4 className="flex">Symbol: {val.symbol}</h4>
                        <h4 className="flex">Price: ${val.price.toFixed(2)}</h4>
                        <h4 className="flex">Market Cap: {val.marketCap.toFixed(2)}</h4>
                      </a>
                    </div>
                  </li>
              );
            })}
      </ul>

    </div>
  );
}

export default App;
