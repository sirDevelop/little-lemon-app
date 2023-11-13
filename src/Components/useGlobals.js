import React, { useContext, useState, useEffect, useMemo } from "react"
import axios from "axios"

const GlobalsContent = React.createContext()

export function useGlobals() {
    return useContext(GlobalsContent)
}

const GlobalsComponent = ({ children }) => {
    const [cart, setCart] = useState([])
    const axiosApi = useMemo(() => {
        return axios.create({ baseURL: "http://localhost:9000/api/" })
    }, [])

    const [menuOptions, setMenuOptions] = useState([])

    useEffect(() => {
        axiosApi
            .get("/menuOptions/getMenuOptions")
            .then((response) => {
                setMenuOptions(response.data.getAllMenuOptions)
            }).catch((error) => {
                alert("something went wrong")
            })
    }, [])
    return (
        <GlobalsContent.Provider
            value={{
                cart, setCart,
                menuOptions, setMenuOptions,
                axiosApi
            }}
        >
            {children}
        </GlobalsContent.Provider>
    )
}

export default GlobalsComponent
