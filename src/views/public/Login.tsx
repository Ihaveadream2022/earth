import React, { useState, useCallback } from "react";
import { Row, Col, Card, Button, Form, Input, Space, message } from "antd";
import type { FormProps } from "antd";
import { useDispatch } from "react-redux";
import { setToken } from "../../stores/reducers/auth";
import { OAuthLogin, OAuthCaptcha } from "../../api/requestOAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined, MobileOutlined } from "@ant-design/icons";
import universe from "../../assets/images/universe.png";
import LoginLogo from "./LoginLogo";
import "./Login.scss";
import { RequestOAuthLoginParams } from "../../types";

const Login: React.FC = () => {
    const [captcha, setCaptcha] = useState(``);
    const [UUID, setUUID] = useState(``);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const loadCaptcha = useCallback(async () => {
        try {
            const res = await OAuthCaptcha();
            setCaptcha(`data:image/gif;base64,${res.data.image}`);
            setUUID(res.data.uuid);
        } catch (error) {
            console.log("error", error);
            messageApi.destroy();
            messageApi.open({ type: "error", content: "Captcha Loading Failed" });
        }
    }, []); // eslint-disable-line
    type FieldType = {
        username: string;
        password: string;
        code: number;
    };
    const onSubmit: FormProps<FieldType>["onFinish"] = async (values) => {
        try {
            setLoading(true);
            const data: RequestOAuthLoginParams = {
                username: `${values.username}`,
                password: `${values.password}`,
                code: values.code,
                uuid: `${UUID}`,
            };
            const res = await OAuthLogin(data);
            if (res.code) {
                setLoading(false);
                dispatch(setToken(res));
                messageApi.open({
                    type: "success",
                    content: "Success",
                    duration: 1,
                    onClose: () => {
                        navigate("/home");
                    },
                });
            }
        } catch (error) {
            console.log("error", error);
            setLoading(false);
            loadCaptcha();
            if (error instanceof Error) {
                messageApi.open({ type: "error", duration: 1, content: error.message });
            }
        }
    };
    const onSubmitFailed: FormProps<FieldType>["onFinishFailed"] = (error) => {
        console.log("Failed:", error);
        messageApi.open({ type: "error", duration: 1, content: "Please enter correct information." });
    };
    useEffect(() => {
        loadCaptcha();
    }, []); // eslint-disable-line

    return (
        <Row style={{ height: "100vh" }}>
            {contextHolder}
            <Col span={18} style={{ backgroundColor: "#001529", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundImage: "url(" + universe + ")" }}>
                <LoginLogo />
            </Col>
            <Col span={6}>
                <Card title="Welcome" style={{ width: "400px", margin: "150px auto" }}>
                    <Form onFinish={onSubmit} onFinishFailed={onSubmitFailed} autoComplete="off">
                        <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
                            <Input size="large" prefix={<UserOutlined />} placeholder="Please input username" autoComplete="new-password" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                            <Input.Password size="large" prefix={<LockOutlined />} placeholder="Please input password" autoComplete="new-password" />
                        </Form.Item>
                        <Space.Compact direction="horizontal">
                            <Form.Item name="code" rules={[{ required: true, message: "Please input code!" }]}>
                                <Input size="large" prefix={<MobileOutlined />} placeholder="Please input captcha" autoComplete="new-password" />
                            </Form.Item>
                            <img src={captcha} onClick={loadCaptcha} alt="captcha" style={{ height: "40px", width: "130px", cursor: "pointer" }} />
                        </Space.Compact>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" size="large" loading={loading} block>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default Login;
