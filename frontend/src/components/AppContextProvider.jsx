import React, { useEffect, useState, createContext } from "react";

export const AppContext = createContext({})

const AppContextProvider = ({children}) => {
  const [initialized, setInitialized] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); 

  /*
  useEffect(() => {
    AsyncStorage
      .getItem('appSettings')
      .then(data => {
        // If data is returned, the storage item existed already and we set the appSettings state to that.
        if (data) {
          setAppSettings(JSON.parse(data))
        }
        // If data is null, the appSettings keeps the default value (in this case an empty object)/

        // We set appSettingsInitialized to true to signal that we have successfully retrieved the initial values.
        setAppSettingsInitialized(true)
      })
  }, [])
  */

  /*
  const setSettings = (key, value) => {
    const mergedSettings = {
      ...appSettings,
      [key]: value
    }
    // First, merge the current state with the new value
    setAppSettings(mergedSettings)

    // Then update the AsyncStorage item
    AsyncStorage.setItem('appSettings', JSON.stringify(mergedSettings))
  }
  */

  return (
    <AppContext.Provider value={[loggedIn, setLoggedIn]}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;