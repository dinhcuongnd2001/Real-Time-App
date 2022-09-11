import { Alert, Avatar, Button, Form, Input, Tooltip } from 'antd';
import React, { useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import {UserAddOutlined} from '@ant-design/icons'
import Message from './Message';

import {AppContext} from '../../Context/AppProvider'
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../../Context/AuthProvider';
import useFirestore from '../../hooks/useFirestore';
import {formatRelative} from 'date-fns'

const WrapperStyled = styled.div`
    height: 100vh;
`;

const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    align-items:center;
    border-bottom: 1px solid rgb(230,230,230);

    .header{
        &__info{
            display:flex;
            flex-direction: column;
            justify-content: center;
        }

        &__title {
            margin: 0;
            font-weight: bold;
        }
        &__description {
            font-size: 12px;
        }
    }
`;

const ButtonGroupStyled = styled.div`
    display: flex;
    align-items: center;
`;

const ContentStyled = styled.div`
    display: flex;
    height : calc(100% - 56px);
    flex-direction: column;
    padding: 11px;
    justify-content: flex-end;
`;

const MessageListStyled = styled.div`
    max-height: 100%;
    overflow-y: auto;
`;

const FormStyled = styled(Form)`
    display: flex;
    justify-content: space-between;
    align-item: center;
    padding: 2px 2px 2px 0;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 2px;

    .ant-form-item{
        flex: 1;
        margin-bottom: 0;
    }
`;


function ChatWindown() {
    const {selectedRoom, members, setIsInviteMembersVisible} = useContext(AppContext);
    const {user : {uid, photoURL, displayName}} = useContext(AuthContext);
    // console.log({rooms, selectedRoomId});
    // chon ra phong duoc lua chon (chuyen vao trong appProvider)
    // const selectedRoom = useMemo(() => {
    //     return rooms.find((room) => room.id === selectedRoomId)
    // },[rooms, selectedRoomId])

    // console.log('mebers: ', {members});
    const [inputValue, setInputValue] = useState('');
    const[form] = Form.useForm();
    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleOnSubmit = () => {
        addDocument('message', {
            text: inputValue,
            uid,
            photoURL,
            roomId: selectedRoom.id,
            displayName
        })
        form.resetFields(['messages'])
    }

    const conditionMessage = useMemo(() => ({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoom.id
    }), [selectedRoom.id])

    const messages = useFirestore('message', conditionMessage);
    console.log({messages})     
  return (
    <WrapperStyled>
        {selectedRoom.id ? 
        <>        
        <HeaderStyled>
            <div className='header__info'>
                <p className='header__title'>{selectedRoom === undefined ? 'Select the Room' : selectedRoom.name}</p>
                <span className='header__description'>{selectedRoom === undefined ? 'Select the Room' : selectedRoom.description}</span>
            </div>
            <ButtonGroupStyled>
                <Button 
                    icon={< UserAddOutlined/>} 
                    type= 'text'
                    onClick={() => setIsInviteMembersVisible(true)}
                >
                    Invite
                </Button>
                <Avatar.Group size='small' maxCount={2}>
                    {members.map(member => <Tooltip key={member.id} title={member.displayName}>
                        <Avatar src={member.photoURL}>{member.photoURL ? '':  member.displayName?.charAt(0)}</Avatar>                        
                    </Tooltip>)}
                    {/* <Tooltip title='A'>
                        <Avatar>A</Avatar>
                    </Tooltip>

                    <Tooltip title='A'>
                        <Avatar>B</Avatar>
                    </Tooltip>

                    <Tooltip title='A'>
                        <Avatar>C</Avatar>
                    </Tooltip>     
                    
                    <Tooltip title='A'>
                        <Avatar>D</Avatar>
                    </Tooltip>   */}

                </Avatar.Group>
            </ButtonGroupStyled>
        </HeaderStyled>
        
        <ContentStyled>
            <MessageListStyled>
                    {messages.map(mes => 
                    <Message
                        key={mes.id}
                        text={mes.text}
                        displayName= {mes.displayName}
                        createdAt={mes.createdAt}
                        photoURL = {mes.photoURL}
                    >
                    </Message>)}
            </MessageListStyled>

            <FormStyled form={form} >
                <Form.Item name='messages'>
                    <Input 
                        onChange={handleInputChange}
                        onPressEnter = {handleOnSubmit}
                        bordered = {false} 
                        autoComplete = 'off'
                        placeholder='Typing message ...'
                    />
                </Form.Item>

                <Button type='primary' onClick={handleOnSubmit}>Send</Button>
            </FormStyled>
        </ContentStyled>
        </>
        : <Alert message= "Let's select Romm" type='info'showIcon style={{margin: 5}} closable/> 
        }


    </WrapperStyled>
  )
}

export default ChatWindown
