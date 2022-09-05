import React from 'react' ;
import {Row, Col, Button, Typography} from 'antd' ;
import {useNavigate} from 'react-router-dom'
import firebase , {auth} from '../../firebase/config'

const {Title} = Typography;

const fbProvider = new firebase.auth.FacebookAuthProvider();

function Login() {
    let navigate = useNavigate();
    // xử lý sự kiện đăng nhập vào trang web bằng facebook
    const handleFbLogin = () => {
        auth.signInWithPopup(fbProvider);
    }

    // Xứ lý kiểm tra xem đã đăg nhập thành công chưa:
    auth.onAuthStateChanged((user) => {
        console.log(user);
        if(user){
            navigate('/');
        }
    });
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
