const SearchFilter = ({ filterText, onChange }) => (
  <>
    Find countries:
    <input value={filterText} onChange={onChange}></input>  
  </>
)

export default SearchFilter;
