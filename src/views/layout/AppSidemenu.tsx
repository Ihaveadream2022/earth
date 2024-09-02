import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { UserOutlined, HomeOutlined, BookOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../../stores/reducers/collapse";
import { RootState } from "../../stores";

const { Sider } = Layout;
const items = [
    {
        label: "Home",
        key: "/home",
        icon: <HomeOutlined />,
    },
    {
        label: "Auth",
        key: "Auth",
        icon: <UserOutlined />,
        children: [
            { key: "/user", label: "User" },
            { key: "/role", label: "Role" },
        ],
    },
    {
        label: "Item",
        key: "Item",
        icon: <BookOutlined />,
        children: [{ key: "/item", label: "Item" }],
    },
];

function AppSidemenu() {
    const dispatch = useDispatch();
    const isCollapse = useSelector((state: RootState) => state.collapse.isCollapse);
    const navigate = useNavigate();
    const to: MenuProps["onClick"] = (item) => {
        navigate(item.key);
    };
    const toggleCollapse = () => {
        dispatch(toggle());
    };
    return (
        <Sider width={200} collapsible collapsed={isCollapse} onCollapse={toggleCollapse}>
            <Menu onClick={to} style={{ height: "calc(100vh - 98px)", borderRight: "0" }} theme="dark" mode="inline" defaultSelectedKeys={["/home"]} items={items} />
        </Sider>
    );
}

export default AppSidemenu;
