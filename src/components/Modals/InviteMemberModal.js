import React, {useContext, useMemo, useState} from 'react'
import {AppContext} from '../../Context/AppProvider'
import {Avatar, Form, Modal, Select, Spin} from 'antd';
import {addDocument} from '../../firebase/services'
import {debounce} from 'lodash'
import { db } from '../../firebase/config';

function DebounceSelect({fetchOptions, debounceTimeout= 300,curMembers, ...props}){
    // tao ra mot cai cờ kiểm cha xem có đang lấy dữ liệu trong db hay ko 
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    
    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);
            // function API được gọi từ phía bên ngoài vào
            fetchOptions(value, props.curMembers)
            .then(newOptions => {
                setOptions(newOptions);
                setFetching(false);
            })
        }
        return debounce(loadOptions, debounceTimeout)
    }, [debounceTimeout, fetchOptions])

    return (
        <Select
            labelInValue 
            filterOption = {false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size='small'/> : null}
            {...props}
        >
            {
                // options [{label: , value, photoURL}]
                options.map(opt => (
                    <Select.Option 
                        key={opt.value}
                        value={opt.value}
                        title= {opt.label}
                    >
                        <Avatar size='small' src={opt.photoURL}>
                            {opt.photoURL ? '' : opt.label?.charAt(0).toUpperCase()}
                        </Avatar>
                        {`${opt.label}`}
                    </Select.Option>
                ))
            }
        </Select>

    )
}

async function fetchUserList(search, curMembers) {
    return  db.collection('users')
            .where('keywords', 'array-contains' , search)
            .orderBy('displayName')
            .limit(20)
            .get()
            .then(snapshot => {
                return snapshot.docs.map(doc => ({
                    label: doc.data().displayName,
                    value: doc.data().uid,
                    photoURL: doc.data().photoURL
                })).filter(opt => !curMembers.includes(opt.value))
            })
}

function InviteMemberModal() {
    const {selectedRoomId, isInviteMembersVisible, setIsInviteMembersVisible, selectedRoom} = useContext(AppContext);

    // const {user: {uid}} = useContext(AuthContext);
    // // duoc dung de lay du lieu trong form 
    const [form] = Form.useForm();
    const [value, setValue] = useState([]);
    const handleOk = () => {
        // Khi nhấn OK thì sẽ thêm phòng vào trong FireStore
        form.resetFields();
        setValue([]);
        // update members in current room
        const roomRef = db.collection('rooms').doc(selectedRoomId);

        roomRef.update({
            members: [...selectedRoom.members, ...value.map((val) => val.value)],
        });

        setIsInviteMembersVisible(false);
    }

    const handleCancel = () => {
        form.resetFields();
        setValue([]);
        setIsInviteMembersVisible(false);
    }

  return (
    <div>
        <Modal
            title = 'Invite Members'
            open = {isInviteMembersVisible}
            onOk = {handleOk}
            onCancel= {handleCancel}
        >
            <Form
                layout="vertical"
                form={form}
            >
                <DebounceSelect
                    mode='multiple'
                    label = 'Members Name'
                    value = {value}
                    placeholder = 'Typing the Members Name'
                    fetchOptions={fetchUserList}
                    onChange = {newValue => setValue(newValue)}
                    style= {{width: '100%'}}
                    curMembers= {selectedRoom.members}
                />
            </Form>
        </Modal>
    </div>
  )
}

export default InviteMemberModal
