import React, {createContext, useContext, useMemo,  useState} from 'react'
import { AuthContext } from './AuthProvider';
import useFirestore from '../hooks/useFirestore';

const AppContext = createContext();
function AppProvider({children}) {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
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
    <AppContext.Provider value={{rooms, isAddRoomVisible, setIsAddRoomVisible}}>
        {children}
    </AppContext.Provider>
    )
}

export {AppContext}
export default AppProvider
