import React from "react";
import { Layout } from "antd";
import AppHeader from "./AppHeader";
import AppSidemenu from "./AppSidemenu";
import AppContent from "./AppContent";
import "../../styles/common.scss";
import "../../styles/ant.scss";
import Guard from "../hoc/Guard";

const App = () => {
    return (
        <Guard>
            <Layout>
                <AppHeader />
                <Layout>
                    <AppSidemenu />
                    <AppContent />
                </Layout>
            </Layout>
        </Guard>
    );
};

export default App;
