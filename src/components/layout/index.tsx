import React from "react";
import type { MenuProps } from "antd";

import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  PieChartOutlined,
  QuestionCircleOutlined,
  InfoCircleOutlined,
  UserOutlined,
  GlobalOutlined,
  BarsOutlined,
  LineChartOutlined,
  TeamOutlined,
  BlockOutlined,
  } from "@ant-design/icons";
import { Breadcrumb, Layout as LayoutAntd, Menu, Image, Typography, theme } from "antd";
import { useState } from "react";

import styles from "./layout.module.css";

type MenuItem = Required<MenuProps>["items"][number];

const { Title } = Typography;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: any,
  children?: any,
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const items: MenuItem[] = [
  getItem(<Link to="/">Statistics Info</Link>, "1", <PieChartOutlined />),
  getItem(
    <Link className={styles.menuTitleLink} to="/students-main">Students</Link>,
    "sub1",
    <UserOutlined />,
    [
      getItem(
        <Link to="/students-main">Overview</Link>,
        "2",
        <UserOutlined />
      ),
      getItem(
        <Link to="/students-geography">Geography</Link>,
        "3",
        <GlobalOutlined />
      ),
      getItem(
        <Link to="/students-place-history">Place History</Link>,
        "4",
        <LineChartOutlined />
      ),
    ]
  ),
  getItem(<Link className={styles.menuTitleLink} to="/tasks-main">Tasks</Link>, "sub2", <BarsOutlined />, [
    getItem(<Link to="/tasks-main">Overview</Link>, "5", <BarsOutlined />),
    getItem(<Link to="/task-average">Average</Link>, "6", <LineChartOutlined />),
    getItem(
      <Link to="/task-score">Score</Link>,
      "7",
      <UserOutlined />
    ),
  ]),
  getItem(
    <Link className={styles.menuTitleLink} to="/mentors-main">Mentors</Link>,
    "sub3",
    <TeamOutlined />,
    [
      getItem(
        <Link to="/mentors-main">Overview</Link>,
        "8",
        <TeamOutlined />
      ),
      getItem(
        <Link to="/mentors-overview">Mentor Group</Link>,
        "9",
        <BlockOutlined />
      ),
    ]
  ),
  getItem(<Link to="/faq">Description</Link>, "10", <QuestionCircleOutlined />),
  getItem(<Link to="/about">About</Link>, "11", <InfoCircleOutlined />),
];

const pathKey: any = {
  '/': ['1', ''],
  '/students-main': ['2', 'sub1'],
  '/students-geography': ['3', 'sub1'],
  '/students-place-history': ['4', 'sub1'],
  '/tasks-main': ['5', 'sub2'],
  '/task-average': ['6', 'sub2'],
  '/task-score': ['7', 'sub2'],
  '/mentors-main': ['8', 'sub3'],
  '/mentors-overview': ['9', 'sub3'],
  '/faq': ['10', ''],
  '/about': ['11', ''],
}

const Layout: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <LayoutAntd
        style={{
          minHeight: "100vh",
        }}
      >
        <LayoutAntd.Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className={styles.logoCont}>
            <Image
              src="https://rs.school/images/rs_school_js.svg"
              width="90%"
              preview={false}
            />
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={[pathKey[location.pathname][0]]}
            defaultOpenKeys={[pathKey[location.pathname][1]]}
            mode="inline"
            items={items}
          />
        </LayoutAntd.Sider>
        <LayoutAntd className="site-layout">
          <LayoutAntd.Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <div className={styles.headerCont}>
              <Title className={styles.title} level={2}>JSFE2023Q1</Title>
              <div className={styles.lastUpdateText}>Last update: 07.09.23</div>
            </div>
             
          </LayoutAntd.Header>
          <LayoutAntd.Content
            style={{
              margin: "0 16px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            ></Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              <Outlet />
            </div>
          </LayoutAntd.Content>
          <LayoutAntd.Footer
            style={{
              textAlign: "center",
            }}
          >
            RSS Statistics © 2023
          </LayoutAntd.Footer>
        </LayoutAntd>
      </LayoutAntd>
    </>
  );
};

export default Layout;
