import React, {useContext, useMemo} from 'react'
import {Button, Collapse, Typography} from 'antd'
import styled from 'styled-components';
import {PlusSquareOutlined} from '@ant-design/icons'
import useFirestore from '../../hooks/useFirestore';
import { AuthContext } from '../../Context/AuthProvider';
import { AppContext } from '../../Context/AppProvider';

const {Panel} = Collapse;
const PanelStyle = styled(Panel)`
    &&& {
        .ant-collapse-header, p {
            color:white;
        }
        .ant-collapse-content-box{
            padding: 0 40px;
        }
        .add-room{
            color: white;
            padding 0;
        }
    }
`;

const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    color: white;
`;

function RoomList() {
    console.log('re-render roomlist')
    // ----- chuyen qua luu tru o trang AppProvider.js
    // const {user : {uid}} = useContext(AuthContext);
    // // console.log('roomList:', userInfo);
    // /* 
    //     Cấu trúc của một documents room lưu trên firebase;
    //     {
    //         name: 'room-name',
    //         description: '...',
    //         members: [uid1, uid2,...]
    //     }

    // */

    // const roomCondition = useMemo(() => {
    //     return {
    //         fieldName: 'members',
    //         operator: 'array-contains',
    //         compareValue: uid
    //     }
    // }, [uid])

    // const rooms = useFirestore('rooms', roomCondition);
    const {rooms, setIsAddRoomVisible, setSelectedRoomId} = useContext(AppContext);
    const handCreateRoom =  () => {
        setIsAddRoomVisible(true);
    }
    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyle header= "List Room" key='1'>
                {
                    rooms.map(room => {
                        return <LinkStyled onClick={() => {setSelectedRoomId(room.id)}} key={room.id}>{room.name}</LinkStyled>
                    })
                }
                <Button onClick={handCreateRoom} type='text' icon= {<PlusSquareOutlined />} className='add-room' >Create Room</Button>
            </PanelStyle>
        </Collapse>
    )
}

export default RoomList
