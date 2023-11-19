import React, { createContext, useState } from 'react';
import { merge } from 'lodash';
import { MainSettings } from '../settings';


/*
プロバイダー
    初期値設定 
    {
        settings: 設定内容,
        updateSettings: 設定内容の更新(マージ),
    }
*/
const SearchContext = createContext({
    settings: '',
    updateSettings: () => {},
})

export const SearchProvider = ({ children }) => {

    const [searchKeyword, setSearchKeyword] = useState('')

    const UpdateSearchKeyword = (key) => {
            setSearchKeyword(key)
        }

    return (
        <SearchContext.Provider
            value={{
                searchKeyword: searchKeyword,
                updateKeyword: UpdateSearchKeyword,
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContext
