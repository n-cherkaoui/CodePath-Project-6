import { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedType, setSelectedType] = useState('All');
  const [types, setTypes] = useState([]);
  const [totalCount, settotalCount] = useState(0);
  const [mostType,setmostType]= useState('');


  useEffect(() => {
    fetchAllBreweries().catch(console.error);
  }, []);

  useEffect(() => {
    if (filteredResults && filteredResults.length > 0) {
      const uniqueTypes = getUniqueTypes(filteredResults);
      setTypes(uniqueTypes);
    }
  }, [filteredResults]);

  const handleTypeDropdownChange = (e) => {
    setSelectedType(e.target.value);
  };

  const fetchAllBreweries = async () => {
    const response = await fetch(
      "https://api.openbrewerydb.org/v1/breweries?by_state=Florida"
    );
    const json = await response.json();
    setList(json);

    const uniqueTypes = getUniqueTypes(json);
    setTypes(uniqueTypes);
    setFilteredResults(json); 
    settotalCount(json.length);

    const mostCommonType = findMostCommonType(json);
    setmostType(mostCommonType);
    console.log(mostType);
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

    return mostCommonType;
  };
  
  const getUniqueTypes = (filteredData) => {
    return Array.from(
      new Set(
        filteredData
          .filter((brew) => brew.name)
          .map((brew) => brew.brewery_type)
      )
    );
  };

  const filterBreweries = () => {
    if (selectedType === 'All' && !searchInput ) {
      setFilteredResults(list); 
    } else {
      const filteredData = list.filter((brew) => {
        const typeMatch = selectedType === 'All' || brew.brewery_type === selectedType;
        const searchMatch =
          !searchInput ||
          Object.values(brew)
            .join('')
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        return typeMatch && searchMatch;
      });
      console.log(filteredData);
      console.log(filteredData.length);
      setFilteredResults(filteredData);
    }
  };

  useEffect(() => {
    filterBreweries();
  }, [selectedType, searchInput]);

  return (
    <div>
      <div className="header-layout">
      <Header input={totalCount} input2={mostType} />
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
        <div>
        </div>
        {filteredResults && filteredResults.length > 0 && (
          <table>
            <tbody>
              <tr>
                <td></td>
                <td><div className='table-header-blocks'>Name</div></td>
                <td><div className='table-header-blocks'>Type</div></td>
                <td></td>
              </tr>
              {filteredResults.map((brew) => (
                (brew.name && brew.address_1 && brew.brewery_type && brew.phone) && (
                  <tr key={brew.id}>
                    <td width="1%"></td>
                    <td width="40%" align='left'>
                      <div className='table-data-blocks'>{brew.name}</div>
                    </td>
                    <td width="20%" align='left'>
                      <div className='table-data-blocks'>{brew.brewery_type}</div>
                    </td>
                    <td width="2%"></td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
