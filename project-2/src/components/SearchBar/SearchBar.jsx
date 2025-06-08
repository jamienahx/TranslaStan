import { useState } from 'react'

const SearchBar = ({ onSearch}) => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const trimmed = searchTerm.trim();
        if(trimmed) {
            onSearch(trimmed);
        } else {
            onSearch('kpop');//default callback
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
