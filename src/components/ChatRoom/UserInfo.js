import React, { useEffect }  from 'react'
import {Button, Avatar, Typography} from 'antd';
import styled from 'styled-components';
import {auth, db} from '../../firebase/config'

import { AuthContext } from '../../Context/AuthProvider';
import { useContext } from 'react';


const WrapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding:12px 6px;
    border-bottom: 1px solid rgba(82,38,83);
    
    .username{
        color: white;
        margin-left: 5px;
    }
`;
function UserInfo() {
  const {user: {photoURL, displayName }} = useContext(AuthContext);
  // console.log('useInfo:', userInfo);
  // useEffect(() => {
  //   let dataRef = db.collection('users');
  //   dataRef.onSnapshot((snapshot) => {
  //     const data = snapshot.docs.map(doc => ({
  //       ...doc.data(),
  //       id: doc.id
  //     }))

  //     console.log({dataRef,data, snapshot, docs : snapshot.docs});
  //   })
  // }, [])
  return (
    <WrapperStyled>
        <div>
            <Avatar src={photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
            <Typography.Text className='username'>{displayName}</Typography.Text>
        </div>
        <Button ghost onClick={() => auth.signOut()}> Sign Out </Button>
    </WrapperStyled>
  )
}

export default UserInfo
