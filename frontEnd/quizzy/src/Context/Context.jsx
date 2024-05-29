import React,{createContext, useEffect, useState} from 'react'

export const userContext = createContext();

export const UserContextProvider = ({children}) =>{
    let [account, setAccount] = useState(null);
    useEffect( ()=>{
       const userInfo = JSON.parse(localStorage.getItem('userInfo'));
       console.log(userInfo);
       if(userInfo){
        setAccount(userInfo);
       }
    },[])
    return (
        <userContext.Provider  value={{account, setAccount}}>
          {children}
        </userContext.Provider>
    )
}