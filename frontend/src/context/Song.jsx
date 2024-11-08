import { createContext, useContext } from "react";

// created a context 
const SongContext = createContext();

// created a song provider 
export const SongProvider = ({children}) => {
    return <SongContext.Provider value={}>
        {children}
    </SongContext.Provider>
}

// export songData to use further in different files 
export const SongData = () =>{
    useContext(SongContext)
}