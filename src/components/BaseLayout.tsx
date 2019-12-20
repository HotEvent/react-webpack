import { Layout, Menu, Icon, Drawer } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../redux.config';
import { MenuData } from './menu.redux';

const { Header, Sider, Content } = Layout;

const BaseLayout:React.FC = () => {
  const dispatch = useDispatch();
  const menu = useSelector<AppState, MenuData>(state => state.menu);

    return (
      <Layout>
        <Sider trigger={null} width={menu.breakpoint?0:256} 
        breakpoint="md"
        collapsedWidth={menu.breakpoint?0:80}
        onBreakpoint={breakpoint => {
          dispatch({type:'set_breakpoint',payload:breakpoint});
          if(breakpoint){
            dispatch({type:'set_collapsed',payload:true});
          }else{
            dispatch({type:'set_collapsed',payload:false});
          }
        }}
        collapsible collapsed={menu.collapsed}>
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
        <Drawer
          // title="Basic Drawer"
          placement="left"
          closable={false}
          onClose={e => {
            dispatch({type:'set_collapsed',payload:true});
          }}
          visible={(!menu.collapsed)&&menu.breakpoint}
        >
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
        </Drawer>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={menu.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={e => {
                dispatch({type:'set_collapsed',payload:!menu.collapsed});
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