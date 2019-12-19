import { Layout, Menu, Icon } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../redux.config';

const { Header, Sider, Content } = Layout;

const BaseLayout:React.FC = () => {
  const dispatch = useDispatch();
  const menu = useSelector<AppState, {collapsed: boolean}>(state => state.menu);

    return (
      <Layout>
        <Sider trigger={null} width={256} collapsible collapsed={menu.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={menu.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={e => {
                dispatch({type:'toogle_menu'});
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }

export default BaseLayout;