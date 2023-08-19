import {createContext, useContext, useState} from "react";

const StateContext=createContext({
    currentUser:{},
    userToken:null,
    questionTypes: [],
    setCurrentUser: () => {},
    setUserToken: () => {},
    surveys:{},


});

// eslint-disable-next-line react/prop-types
export const ContextProvider=({children}) => {
    const [currentUser,setCurrentUser]=useState({});
    const [userToken,_setUserToken]=useState(localStorage.getItem('TOKEN')||'');
    const [surveys,setSurveys]=useState();
    const [questionTypes] = useState(['text', "select", "radio", "checkbox", "textarea"])
    const [toast, setToast] = useState({message: '', show: false})

    const setUserToken= (token)=> {
        if (token){
            localStorage.setItem('TOKEN',token);
        } else {
            localStorage.removeItem('TOKEN')
        }
        _setUserToken(token)
    }
    const showToast = (message) => {
        setToast({ message, show: true })
        setTimeout(() => {
            setToast({message: '', show: false})
        }, 2000)
    }
    return(
        <StateContext.Provider value={{
            currentUser,
            setCurrentUser,
            userToken,
            questionTypes,
            setUserToken,
            surveys,
            toast,
            showToast,
        }}>
            {children}
        </StateContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext= ()=> useContext(StateContext);
