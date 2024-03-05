import { createContext, useContext } from "react"

export const AppContext = createContext()

export const useApp = () => {
    return useContext(AppContext)
}

export const AppProvider = (props) => {
    return (
        <AppContext.Provider value={props}>
            {props.children}
        </AppContext.Provider>
    )
}