import React, {createContext, useContext, useMemo,  useState} from 'react'
import { AuthContext } from './AuthProvider';
import useFirestore from '../hooks/useFirestore';

const AppContext = createContext();
function AppProvider({children}) {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [isInviteMembersVisible, setIsInviteMembersVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const {user : {uid}} = useContext(AuthContext);

// lay ra nhung phong thuoc user
    const roomCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid
        }
    }, [uid])

    const rooms = useFirestore('rooms', roomCondition);

    // tim ra phong duoc lua chon
    const selectedRoom = useMemo(() => {
        return rooms.find((room) => room.id === selectedRoomId ) || {}
    },[rooms, selectedRoomId])
    // Lay ra nhung user cua 1 phong
    // dang bi loi do selectedRoom la undefined

    const usersCondition = useMemo(() => {
        // console.log('goi ham useCondition: ', [selectedRoom.members])
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members,
        }
    }, [selectedRoom, uid])

    const members = useFirestore('users', usersCondition);
    // console.log('member: ', {members});
    // console.log(selectedRoomId);
    return (
    <AppContext.Provider 
        value={{
            rooms, 
            members,
            selectedRoom,
            isAddRoomVisible, 
            setIsAddRoomVisible,
            isInviteMembersVisible,
            setIsInviteMembersVisible,
            selectedRoomId,
            setSelectedRoomId
        }}
    >
        {children}
    </AppContext.Provider>
    )
}

export {AppContext}
export default AppProvider
