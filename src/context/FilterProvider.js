import React, { useContext, useState } from 'react';

const FilterContext = React.createContext();

export const useFilter = () => (
    useContext(FilterContext)
)
const FilterProvider = ({ children }) => {

    const [filter, setFilter] = useState('')

    const changeFilter = (val) => {
        setFilter(val)
    }
    
    const value = {
        filter,
        changeFilter,
    }

    return (
        <FilterContext.Provider value={value}>
            { children }
        </FilterContext.Provider>
    )
}

export default FilterProvider
