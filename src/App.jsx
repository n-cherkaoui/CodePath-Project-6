import { useState, useEffect } from 'react';
import viteLogo from '/vite.svg';
import './App.css';
import SideNav from "./routes/SideNav";
import Header from './Components/Header';
import { Link } from "react-router-dom";
import TypeChart from './Components/TypeChart.jsx';

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCity, setSelectedCity] = useState('All');
  const [cities, setCities] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [types, setTypes] = useState([]);
  const [totCount, setTotCount] = useState(0);
  const [mostPrev, setMostPrev] = useState('');
  const [typeCounts, setTypeCounts] = useState({});


  useEffect(() => {
    fetchAllBreweries().catch(console.error);
  }, []);

  useEffect(() => {
    if (filteredResults && filteredResults.length > 0) {
      const uniqueCities = getUniqueCities(filteredResults);
      setCities(uniqueCities);
      const uniqueTypes = getUniqueTypes(filteredResults);
      setTypes(uniqueTypes);
    }
  }, [filteredResults]);


  const handleDropdownChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleTypeDropdownChange = (e) => {
    setSelectedType(e.target.value);
  };

  const fetchAllBreweries = async () => {
    const response = await fetch(
      "https://api.openbrewerydb.org/v1/breweries?by_state=florida"
    );
    const json = await response.json();
    setList(json);

    const uniqueCities = getUniqueCities(json);
    const uniqueTypes = getUniqueTypes(json);
    setCities(uniqueCities);
    setTypes(uniqueTypes);
    setFilteredResults(json);
    setTotCount(json.length);

    const mostCommonType = findMostCommonType(json);
    setMostPrev(mostCommonType);
  };

  const findMostCommonType = (filteredData) => {
    const typeCounts = {};
    let mostCommonType = '';
    let maxCount = 0;

    filteredData.forEach((brew) => {
      const type = brew.brewery_type;
      typeCounts[type] = (typeCounts[type] || 0) + 1;

      if (typeCounts[type] > maxCount) {
        maxCount = typeCounts[type];
        mostCommonType = type;
      }
    });

    setTypeCounts(typeCounts);
    return mostCommonType;
  };

  const getUniqueCities = (filteredData) => {
    return Array.from(
      new Set(
        filteredData
          .filter((brew) => brew.name && brew.phone && brew.brewery_type)
          .map((brew) => brew.city)
      )
    );
  };

  const getUniqueTypes = (filteredData) => {
    return Array.from(
      new Set(
        filteredData
          .filter((brew) => brew.name && brew.phone && brew.city)
          .map((brew) => brew.brewery_type)
      )
    );
  };

  const filterBreweries = () => {
    if (selectedCity === 'All' && selectedType === 'All' && !searchInput) {
      setFilteredResults(list);
    } else {
      const filteredData = list.filter((brew) => {
        const cityMatch = selectedCity === 'All' || brew.city === selectedCity;
        const typeMatch = selectedType === 'All' || brew.brewery_type === selectedType;
        const searchMatch =
          !searchInput ||
          Object.values(brew)
            .join('')
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        return cityMatch && typeMatch && searchMatch;
      });
      console.log(filteredData);
      console.log(filteredData.length);
      setFilteredResults(filteredData);

    }
  };

  useEffect(() => {
    filterBreweries();
  }, [selectedCity, selectedType, searchInput]);

  return (
    <div>
      <div className="header-layout">
        <Header input={totCount} input2={mostPrev} />
      </div>
      <div className="whole-page" style={{ overflow: 'auto', maxHeight: '80vh' }}>
        <div>
          <input
            className='searchDiv'
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
          <label htmlFor="cityDropdown" className='dropdown'>City:</label>
          <select id="cityDropdown" value={selectedCity} onChange={handleDropdownChange}>
            <option value="All">All</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <label htmlFor="typeDropdown" className='dropdown'>Type:</label>
          <select id="typeDropdown" value={selectedType} onChange={handleTypeDropdownChange}>
            <option value="All">All</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        {filteredResults && filteredResults.length > 0 && (
          <table>
            <tbody>
              <tr>
                <td></td>
                <td><div className='table-header-blocks'>Name</div></td>
                <td><div className='table-header-blocks'>Type</div></td>
                <td><div className='table-header-blocks'>Address</div></td>
                <td><div className='table-header-blocks'>City</div></td>
                <td><div className='table-header-blocks'>Phone</div></td>
                <td></td>
              </tr>
              {filteredResults.map((brew) => (
                (brew.name && brew.address_1 && brew.brewery_type && brew.phone) && (
                  <tr key={brew.id}>
                    <Link
                      to={`/brewDetails/${brew.id}`}
                      key={brew.id} width="1%"
                      element={brew.id}>
                      <td width="40%" align='left'>
                        <div className='table-data-blocks'>{brew.name}</div>
                      </td>
                      <td width="20%" align='left'>
                        <div className='table-data-blocks'>{brew.brewery_type}</div>
                      </td>
                      <td width="25%" align='left'>
                        <div className='table-data-blocks'>{brew.address_1}</div>
                      </td>
                      <td width="20%" align='left'>
                        <div className='table-data-blocks'>{brew.city}</div>
                      </td>
                      <td width="20%" align='left'>
                        <div className='table-data-blocks'>{brew.phone}</div>
                      </td>
                      <td width="2%"></td>
                    </Link>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        )}
      </div>
      <TypeChart types={typeCounts} totalTypes={totCount}></TypeChart>
    </div>
  );
}

export default App;
