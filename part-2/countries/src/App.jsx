import { useDebounce } from 'use-debounce';
import { useState, useEffect } from 'react';

import countryService from './services/countries';
import SearchFilter from './components/SeachFilter';
import Results from './components/Results';

function App() {
  const [filterText, setFilterText] = useState('');
  const [filterTextDebounced] = useDebounce(filterText, 300);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (filterTextDebounced === '') {
      setMatches([]);
      return;
    }

    countryService
      .getAllNames()
      .then(countryNames => {
        const filteredNames = countryNames.filter(name => 
          name.toLowerCase().includes(filterTextDebounced.toLowerCase()));

        setMatches(filteredNames);
      });
  }, [filterTextDebounced]);

  const handleFilterChange = event => {
    const searchValue = event.target.value;
    setFilterText(searchValue);
  }

  return (
    <>
      <SearchFilter filterText={filterText} onChange={handleFilterChange} />
      <Results resultsToShow={matches} />
    </>
  )
}

export default App;
