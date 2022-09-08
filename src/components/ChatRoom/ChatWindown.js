import { Avatar, Button, Form, Input, Tooltip } from 'antd';
import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';
import {UserAddOutlined} from '@ant-design/icons'
import Message from './Message';

import {AppContext} from '../../Context/AppProvider'

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
    const {selectedRoom, members} = useContext(AppContext);
    // console.log({rooms, selectedRoomId});
    // chon ra phong duoc lua chon (chuyen vao trong appProvider)
    // const selectedRoom = useMemo(() => {
    //     return rooms.find((room) => room.id === selectedRoomId)
    // },[rooms, selectedRoomId])

    console.log('mebers: ', {members});
  return (
    <WrapperStyled>
        <HeaderStyled>
            <div className='header__info'>
                <p className='header__title'>{selectedRoom === undefined ? 'Select the Room' : selectedRoom.name}</p>
                <span className='header__description'>{selectedRoom === undefined ? 'Select the Room' : selectedRoom.description}</span>
            </div>
            <ButtonGroupStyled>
                <Button icon={< UserAddOutlined/>} type= 'text'>
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
                <Message text= 'test' displayName='Cuong' createAt= '12121212123' photoURL={null}></Message>
                <Message text= 'test' displayName='Cuong' createAt= '12121212123' photoURL={null}></Message>
                <Message text= 'test' displayName='Cuong' createAt= '12121212123' photoURL={null}></Message>
                <Message text= 'test' displayName='Cuong' createAt= '12121212123' photoURL={null}></Message>
            </MessageListStyled>

            <FormStyled>
                <Form.Item>
                    <Input 
                        bordered = {false} 
                        autoComplete = 'off'
                        placeholder='Typing message ...'
                    />
                </Form.Item>

                <Button>Send</Button>
            </FormStyled>
        </ContentStyled>

    </WrapperStyled>
  )
}

export default ChatWindown
