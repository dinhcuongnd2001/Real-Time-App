import React, {useContext} from "react";
import {Form, Modal, Input} from 'antd';
import {db} from '../../firebase/config'
import { AppContext } from "../../Context/AppProvider";
import {addDocument} from '../../firebase/services'
import { AuthContext } from "../../Context/AuthProvider";
function AddRoomModal() {
    const {isAddRoomVisible,setIsAddRoomVisible} = useContext(AppContext);
    const {user: {uid}} = useContext(AuthContext);
    // duoc dung de lay du lieu trong form 
    const [form] = Form.useForm();
    const handleOk = () => {
        // Khi nhấn OK thì sẽ thêm phòng vào trong FireStore
        // console.log('form: ', form.getFieldsValue());
        addDocument('rooms', {...form.getFieldsValue(), members: [uid]})
        form.resetFields();
        // setIsAddRoomVisible(false)
    }

    const handleCancel = () => {
        setIsAddRoomVisible(false);
    }
  return (
    <div>
      <Modal
        title = 'Create Room'
        open = {isAddRoomVisible}
        onOk = {handleOk}
        onCancel= {handleCancel}
      >
        <Form
            layout="vertical"
            form={form}
        >
            <Form.Item 
                label='Room Name: '
                name='name'
            >
                <Input placeholder="Typing the room name" />
            </Form.Item>

            <Form.Item
                label= 'description'
                name='description'
            >
                <Input.TextArea placeholder="typing the description"/>
            </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AddRoomModal
