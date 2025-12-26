import React,{createContext,useState,useContext} from 'react'

const AuthContext = createContext();

export const  AuthContextProvider=({children})=> {
    const [isLogin,setIsLogin] = useState(true);
    const[role,setRole] = useState('student')
    const[user,setUser] = useState();
  return (
    <AuthContext.Provider value = {{isLogin,setIsLogin,role,setRole,user,setUser}}>
        {children}
    </AuthContext.Provider >
  )
}

// making our constom hook which give the status of login
export default function useAuth (){
    return useContext(AuthContext);
}