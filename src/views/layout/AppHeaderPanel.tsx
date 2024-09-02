import { useState } from "react";
import { Button, Modal, Form, Input, message, Popconfirm, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../../stores/reducers/auth";
import { OAuthLogout, OAuthUpdatePassword } from "../../api/requestOAuth";
import { LockOutlined, QuestionCircleOutlined, PoweroffOutlined } from "@ant-design/icons";
import { RootState } from "../../stores";
import { RequestOAuthUpdatePasswordData } from "../../types";

const AppHeaderPanel = () => {
    const [CPDialogVisible, setCPDialogVisible] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => `${state.auth.ACCESS_TOKEN}`);
    const [messageApi, contextHolder] = message.useMessage();
    const [fromChangePass] = Form.useForm();
    const onConfirmLogout = async () => {
        try {
            const res = await OAuthLogout(token);
            if (res.code) {
                messageApi.open({
                    type: "success",
                    content: "Success",
                    duration: 1,
                    onClose: () => {
                        dispatch(clearToken());
                    },
                });
            }
        } catch (error) {
            console.log(error, "error");
            messageApi.destroy();
            messageApi.open({ type: "error", content: "Logint out Failed" });
        }
    };
    const onClickCPDialogVisibleToggle = () => {
        setCPDialogVisible(!CPDialogVisible);
    };
    const onOkCPDialog = () => {
        // prettier-ignore
        fromChangePass.validateFields()
            .then((fields) => {
                messageApi.open({ type: "loading", content: "Loading..", duration: 0 });
                const dataToken = `${token}`;
                const data: RequestOAuthUpdatePasswordData = { 
                    oldPassword: `${fields.oldPassword}`, 
                    newPassword: `${fields.newPassword}` 
                };
                OAuthUpdatePassword(dataToken, data)
                    .then(
                        (res) => {
                            if (res.code) {
                                messageApi.destroy();
                                messageApi.open({
                                    type: "success",
                                    content: "Success. Please Relogin.",
                                    duration: 2,
                                    onClose: () => {
                                        setCPDialogVisible(false);
                                        OAuthLogout(token);
                                        dispatch(clearToken());
                                    },
                                });
                            }
                        },
                        (error) => {
                            console.log(error);
                            messageApi.destroy();
                            messageApi.open({ type: "error",  duration: 2, content: error.message });
                        },
                    )
                    .catch((error) => {
                        console.log(error);
                        messageApi.destroy();
                        messageApi.open({
                            type: "error",
                            duration: 2,
                            content: error.message,
                        });
                    });
            }).catch((error) => {
                if (error instanceof Error) {
                    messageApi.open({ type: "error", duration: 1, content: error.message });
                }
            });
    };
    const onCancelCPDialog = () => {
        fromChangePass.resetFields();
        messageApi.destroy();
        setCPDialogVisible(false);
    };
    return (
        <div>
            {contextHolder}
            <Space style={{ marginRight: "10px" }}>
                <Button onClick={onClickCPDialogVisibleToggle}>
                    <LockOutlined /> Change Pass
                </Button>
                <Popconfirm title="Warning" description="Are you sure to do this?" icon={<QuestionCircleOutlined style={{ color: "red" }} />} onConfirm={onConfirmLogout}>
                    <Button>
                        <PoweroffOutlined />
                        Logout
                    </Button>
                </Popconfirm>
            </Space>
            <Modal title={<div style={{ marginBottom: "20px" }}>Change Password</div>} open={CPDialogVisible} onOk={onOkCPDialog} onCancel={onCancelCPDialog}>
                <Form form={fromChangePass} autoComplete="off">
                    <Form.Item name="oldPassword" rules={[{ required: true, message: "Please input your old password." }]}>
                        <Input size="large" prefix={<LockOutlined />} placeholder="Please input old password" autoComplete="new-password" />
                    </Form.Item>
                    <Form.Item name="newPassword" rules={[{ required: true, message: "Please input your new password." }]}>
                        <Input size="large" prefix={<LockOutlined />} placeholder="Please input new password" autoComplete="new-password" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AppHeaderPanel;
