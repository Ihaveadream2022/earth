import { Layout, Menu, Button } from "antd";
import type { MenuProps } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import AppHeaderLogo from "./AppHeaderLogo";
import AppHeaderPanel from "./AppHeaderPanel";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../../stores/reducers/collapse";
import { RootState } from "../../stores";

const { Header } = Layout;
const items = [
    { label: "Youtube", key: "https://www.youtube.com" },
    { label: "CNN", key: "https://www.cnn.com" },
];

function AppHeader() {
    const isCollapse = useSelector((state: RootState) => state.collapse.isCollapse);
    const dispatch = useDispatch();
    const to: MenuProps["onClick"] = (item) => {
        window.open(item.key, "_blank");
    };
    const toggleCollapse = () => {
        dispatch(toggle());
    };
    return (
        <Header style={{ display: "flex", alignItems: "center", padding: "0", height: "50px", backgroundColor: "#fff" }}>
            <AppHeaderLogo />
            <Button type="text" icon={isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={toggleCollapse} style={{ fontSize: "16px", width: 50, height: 50, color: "#000", borderRadius: "0" }} />
            <Menu onClick={to} style={{ flex: "1", minWidth: "0", height: "50px", lineHeight: "50px" }} theme="light" mode="horizontal" items={items} />
            <AppHeaderPanel />
        </Header>
    );
}

export default AppHeader;
