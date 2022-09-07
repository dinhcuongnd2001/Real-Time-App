import React, {createContext, useContext, useMemo} from 'react'
import { AuthContext } from './AuthProvider';
import useFirestore from '../hooks/useFirestore';

const AppContext = createContext();
function AppProvider({children}) {

    const {user : {uid}} = useContext(AuthContext);

    const roomCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid
        }
    }, [uid])

    const rooms = useFirestore('rooms', roomCondition);

    return (
    <AppContext.Provider value={{rooms}}>
        {children}
    </AppContext.Provider>
    )
}

export {AppContext}
export default AppProvider
