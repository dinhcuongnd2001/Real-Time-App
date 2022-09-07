import React from 'react';
import {Row, Col} from 'antd';
import UserInfo from './UserInfo';
import RoomList from './RoomList';
import styled from 'styled-components';

// khi ma chuong trinh bien dich, gap component nay se bien dich ra mot the div tuong ung
// o tren cay DOM, the div nay se co mot class do component generate va class nay se co cac
// style do minh tao ra
const SidebarStyle = styled.div`
    background: #3f0e40;
    color: white;
    height: 100vh;
`;



function Sidebar() {
  return (
    <SidebarStyle>
        <Row>
            <Col span={24}>
                <UserInfo/>
            </Col>
            <Col span={24}>
                <RoomList/>
            </Col>
        </Row>
    </SidebarStyle>
  )
}

export default Sidebar
