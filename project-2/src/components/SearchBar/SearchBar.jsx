import { useState } from 'react'

const SearchBar = ( props ) => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const trimmed = searchTerm.trim();
        if(trimmed) {
            props.onSearch(trimmed);  //send this search term that user has typed in the field back to the parent
        } else {
            props.onSearch('kpop');//default callback
        }

    };

    return (
        <form onSubmit = {handleSubmit}>
            <input 
            type ="text"
            placeholder = "Search Kpop news"
            value = {searchTerm}
            onChange={(event)=> setSearchTerm(event.target.value)}
            />
            <button type = "submit">Search</button>
        </form>

    );

};

export default SearchBar;
