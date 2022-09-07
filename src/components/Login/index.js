import React from 'react' ;
import {Row, Col, Button, Typography} from 'antd' ;
import {useNavigate} from 'react-router-dom'
import firebase , {auth, db} from '../../firebase/config'
import { addDocument } from '../../firebase/services';

const {Title} = Typography;

const fbProvider = new firebase.auth.FacebookAuthProvider();

function Login() {
    // xử lý sự kiện đăng nhập vào trang web bằng facebook
    const handleFbLogin = async () => {
      // lay mot so du lieu o trong data de luu tru vao database
      // B1: kiem tra xem user nay da dang nhap hay chua, neu chua thi tien hanh
      // luu vao csdl
        const {additionalUserInfo, user} = await auth.signInWithPopup(fbProvider);
        // kiem tra xem co phai nguoi dung moi khong
        if(additionalUserInfo?.isNewUser) {
          addDocument('users', {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.displayName,
            providerId: additionalUserInfo.providerId
          })
        }
      }

  return (
    <div>
      <Row justify='center' style={{height:800}}>
        <Col span={8}>
            <Title style = {{textAlign : 'center'}} level = {3}> Fun Chat</Title>
            <Button style={{width: '100%', marginBottom: 5}}>
                Đăng nhập bằng Google
            </Button>
            
            <Button 
                style={{width: '100%'}}
                onClick={handleFbLogin}
            >
                Đăng nhập bằng Facebook
            </Button>
        </Col>
      </Row>
    </div>
  )
}

export default Login
