import React , {createContext, useEffect, useState} from 'react'
import {auth} from '../firebase/config'
import {useNavigate} from 'react-router-dom'
import {Spin} from 'antd'
// tao ra context API 
const AuthContext = createContext();

function AuthProvider({children}) {
  // Xu ly kiem tra xem user dang co thanh cong hay khong
  let navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const unsubcribed =  auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        // lay ra nhung thong tin can thiet tu doi tuong user
        const {displayName, email, uid, photoURL} = user;
        setUser({displayName, email, uid, photoURL});
        setIsLoading(false);
        navigate('/');
      }
      else{
        setIsLoading(false);
        navigate('/Login');
      }
    });

    // Clean function:
    return () => {
      unsubcribed();
    }
  }, [navigate])
  // console.log([children]);
  return (
    <AuthContext.Provider value={{user}}>
      {isLoading ? <Spin/> : children}
    </AuthContext.Provider>
  )
}
export {AuthContext};
export default AuthProvider;
