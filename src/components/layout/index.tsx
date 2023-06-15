import React from "react";
import type { MenuProps } from "antd";

import { Outlet, Link } from "react-router-dom";
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
import { Breadcrumb, Layout as LayoutAntd, Menu, Image, theme } from "antd";
import { useState } from "react";

import styles from "./layout.module.css";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
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
    ]
  ),
  getItem(<Link className={styles.menuTitleLink} to="/tasks-main">Tasks</Link>, "sub2", <BarsOutlined />, [
    getItem(<Link to="/tasks-main">Overview</Link>, "4", <BarsOutlined />),
    getItem(<Link to="/task-average">Average</Link>, "5", <LineChartOutlined />),
    getItem(
      <Link to="/task-individual">Individual</Link>,
      "6",
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
        "7",
        <TeamOutlined />
      ),
      getItem(
        <Link to="/mentors-overview">Students-mentor</Link>,
        "8",
        <BlockOutlined />
      ),
    ]
  ),
  getItem(<Link to="/faq">FAQ</Link>, "9", <QuestionCircleOutlined />),
  getItem(<Link to="/about">About</Link>, "10", <InfoCircleOutlined />),
];

const Layout: React.FC = () => {
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
            defaultSelectedKeys={["1"]}
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
          />
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
