const AppSettingsContext = React.createContext({})

const AppSettingsContextProvider = ({children}) => {
  const [appSettingsInitialized, setAppSettingsInitialized] = useState(false)
  const [appSettings, setAppSettings] = useState({}) // could use some default values instead of empty object

  // On mount, get the current value of `appSettings` in AsyncStorage
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

  // setSettings sets the local state and AsyncStorage
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

  return (
    <AppSettingsContext.Provider value={{
      appSettings,
      appSettingsInitialized,
      setSettings,
    }}>
      {children}
    </AppSettingsContext.Provider>
  )
}