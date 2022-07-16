import React from 'react'
import {createStore} from './Store'
import { useLocalObservable } from 'mobx-react'

const StoreContext = React.createContext(null)

export const StoreProvider = ({children}) => {
  const notesStore = useLocalObservable(createStore)

  return <StoreContext.Provider value={notesStore}>
    {children}
  </StoreContext.Provider>
}

export const useStore = () => React.useContext(StoreContext)
