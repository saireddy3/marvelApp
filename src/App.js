import React, { useState, useCallback } from 'react';
import './App.css';
import { debounce } from "lodash";
import axios from 'axios';
import Profile from './Profile'
import loadinfGIF from './loading.gif'
import CryptoJS from 'crypto-js'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [resultsData, setResultsData] = useState(false);
  const [selectedValue, setSelectedValue] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [previousResults, setPreviousResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const MarvelPublicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
  const MarvelPrivateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
  const MarvelHash = CryptoJS.MD5(`1${MarvelPrivateKey}${MarvelPublicKey}`).toString();
  const getTypeName = (i) => {
    switch (i) {
      case 0: return 'Character';
      case 1: return 'Series';
      case 2: return 'Comic';
      default: return '';
    }
  }
  const getType = (i) => {
    switch (i) {
      case 'Character': return 0;
      case 'Series': return 1;
      case 'Comic': return 2;
      default: return false;
    }
  }
  const callApi = (value) => {
    
    const characters = axios.get(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${value}&apikey=${MarvelPublicKey}&ts=1&hash=${MarvelHash}&limit=3`);
    const series = axios.get(`https://gateway.marvel.com/v1/public/series?titleStartsWith=${value}&apikey=${MarvelPublicKey}&ts=1&hash=${MarvelHash}&limit=3`);
    const comics = axios.get(`https://gateway.marvel.com/v1/public/comics?titleStartsWith=${value}&apikey=${MarvelPublicKey}&ts=1&hash=${MarvelHash}&limit=3`);
    Promise.all([characters, series, comics]).then(function (values) {
      const temp = []
      setLoading(false)
      values.forEach((v, i) => {
        v.data.data.results.forEach((r) => {
          r.type = i;
          temp.push(r);
        })
      })
      setResultsData(temp)
      if (temp.length === 0) {
        alert('Nothing found with this search term')
      }
    });
  }
  const profileApi = async (id, type) => {
    let url = '';
    setLoading(true)
    if (type === 0) {
      url = `https://gateway.marvel.com/v1/public/characters/${id}?apikey=${MarvelPublicKey}&ts=1&hash=${MarvelHash}`
    }
    else if (type === 1) {
      url = `https://gateway.marvel.com/v1/public/series/${id}?apikey=${MarvelPublicKey}&ts=1&hash=${MarvelHash}`
    }
    else if (type === 2) {
      url = `https://gateway.marvel.com/v1/public/comics/${id}?apikey=${MarvelPublicKey}&ts=1&hash=${MarvelHash}`
    }
    const results = await axios.get(url);
    setLoading(false)
    const obj = { type, data: results.data.data.results[0] }
    let isExists = false;
    previousResults.forEach((p) => {
      if (p.data.id === obj.data.id && p.type === obj.type) {
        isExists = true;
      }
    })
    if (!isExists) {
      let temp = [...previousResults]
      temp.push(obj);
      temp = temp.reverse();
      setPreviousResults(temp)

    }
    setProfileData(obj);
    setSelectedValue(true)
  }
  const handler = useCallback(debounce(callApi, 1000), []);
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value)
    if (value && value.indexOf('#') >= 0) {
      let id = value.split(' ')[0].split('#')[1];
      let type = getType(value.split(' ')[1].trim())
      profileApi(id, type)
    }
    else if (value && value.length > 2) {
      setLoading(true)
      handler(value);
    }
  }
  const reset = () => {
    setSelectedValue(false)
    setSearchTerm('')
    setResultsData([])
    document.title = 'Search Marvels'
  }
  const loadPrev = (val) => {
    setProfileData(val);
    setSelectedValue(true)
  }
  return (
    <div >
      {selectedValue ?
        <div className="main">
          <button className="button" onClick={reset} >Go back to Search</button>
          <Profile data={profileData} />
        </div>
        :
        <div className="App">
          <div>
            <input type="text" id="username" className="searchInput" placeholder="Search here" value={searchTerm}
              onChange={handleChange}
              autoComplete="off" list="languageList" />
            <datalist id="languageList">
              {resultsData && resultsData.length > 0 && resultsData.map((r) => (
                <option key={r.id} value={`#${r.id} ${getTypeName(r.type)}`}>{r.type === 0 ? r.name : r.title}</option>
              ))}

            </datalist>
          </div>
          {loading && <div><img src={loadinfGIF} alt="loading..." />
            <h6>Loading</h6></div>}
          <div>
            <h5>Last 5 searchs</h5>
            <div>
              {previousResults.map((p, i) => (i < 5 && <div><a href="#" rel="noreferrer"  key={i} onClick={() => loadPrev(p)} >{p.type === 0 ? p.data.name : p.data.title} ({getTypeName(p.type)})</a><br /><br /></div>))}
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
