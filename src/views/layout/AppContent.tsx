import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

const { Content } = Layout;

function AppContent() {
    return (
        <Layout>
            <Content style={{ padding: 15, margin: 0, minHeight: 280 }}>
                <Outlet />
            </Content>
        </Layout>
    );
}

export default AppContent;
