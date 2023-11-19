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
const SettingsContext = createContext({
    settings: MainSettings,
    updateSettings: () => {},
})

export const SettingsProvider = ({ settings, children }) => {

    const [currentSettings, setCurrentSettings] = useState(
            settings || MainSettings
        )

    const handleUpdateSettings = (update = {}) => {
            const marged = merge({}, currentSettings, update)
            setCurrentSettings(marged)
        }

    return (
        <SettingsContext.Provider
            value={{
                settings: currentSettings,
                updateSettings: handleUpdateSettings,
            }}
        >
            {children}
        </SettingsContext.Provider>
    )
}

export default SettingsContext
