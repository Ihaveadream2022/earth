import { useEffect, useState } from "react";
import { Table, Input, Button, Modal, Form, Space, Row, Col, message, Popconfirm } from "antd";
import type { PaginationProps, GetProps } from "antd";
import { itemList, itemAdd, itemEdit, itemDelete } from "../../api/request";
import "./index.scss";
import { PlusCircleOutlined, QuestionCircleOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { RequestItemParams, RequestItemData, RequestItemDataDelete } from "../../types";
const { Column } = Table;
const { Search } = Input;
type SearchProps = GetProps<typeof Input.Search>;
function Item() {
    const [AddDialogVisible, setAddDialogVisible] = useState(false);
    const [titleDialog, setTitleDialog] = useState("Add Item");
    const [dataQueryParams, setDataQueryParams] = useState<RequestItemParams>({ pageNo: 1, pageSize: 10 });
    const [dataTableListTotal, setDataTableListTotal] = useState(0);
    const [dataTableList, setDataTableList] = useState([]);
    const [dataTableLoading, setDataTableLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const getTableList = async (queryParams: RequestItemParams) => {
        try {
            setDataTableLoading(true);
            const res = await itemList(queryParams);
            if (res.code) {
                setDataTableLoading(false);
                setDataTableListTotal(res.data.total);
                setDataTableList(res.data.list);
                setDataQueryParams(queryParams);
            }
        } catch (error) {
            if (error instanceof Error) {
                messageApi.destroy();
                messageApi.open({ type: "error", duration: 2, content: error.message });
            }
        }
    };
    // 包括翻页和每页数变化
    const onChangePage: PaginationProps["onChange"] = (current, pageSize) => {
        getTableList({ pageNo: current, pageSize: pageSize });
    };
    const onSearch: SearchProps["onSearch"] = (value) => {
        getTableList({ ...dataQueryParams, keyword: `${value}` });
    };
    const onClickAdd = () => {
        setAddDialogVisible(true);
    };
    const onClickEdit = (record: RequestItemData) => {
        setTitleDialog("Edit Item");
        setAddDialogVisible(true);
        const data = JSON.parse(JSON.stringify(record));
        form.setFieldsValue(data);
    };
    const onOkAddDialog = () => {
        form.validateFields()
            .then((fields) => {
                messageApi.open({ type: "loading", content: "Loading..", duration: 0 });
                const data: RequestItemData = {
                    id: titleDialog === "Add Item" ? null : parseInt(fields.id),
                    name: `${fields.name}`,
                    common: `${fields.common}`,
                    verb: `${fields.verb}`,
                    noun: `${fields.noun}`,
                    adjective: `${fields.adjective}`,
                    adverb: `${fields.adverb}`,
                    conjunction: `${fields.conjunction}`,
                    preposition: `${fields.preposition}`,
                };
                const promise = titleDialog === "Add Item" ? itemAdd(data) : itemEdit(data);
                promise
                    .then(
                        (res) => {
                            if (res.code) {
                                messageApi.destroy();
                                messageApi.open({
                                    type: "success",
                                    content: "Success.",
                                    duration: 2,
                                    onClose: () => {
                                        setAddDialogVisible(false);
                                        getTableList({ pageNo: 1, pageSize: 10 });
                                    },
                                });
                            }
                        },
                        (error) => {
                            if (error instanceof Error) {
                                messageApi.destroy();
                                messageApi.open({ type: "error", duration: 2, content: error.message });
                            }
                        },
                    )
                    .catch((error) => {
                        if (error instanceof Error) {
                            messageApi.destroy();
                            messageApi.open({ type: "error", duration: 2, content: error.message });
                        }
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const onCancelAddDialog = () => {
        setAddDialogVisible(false);
        setTitleDialog("Add Item");
        form.resetFields();
        messageApi.destroy();
    };
    const onConfirmDelete = async (id: number | undefined | null) => {
        try {
            messageApi.open({ type: "loading", content: "Loading..", duration: 0 });
            const dataID = id === undefined ? null : id;
            const data: RequestItemDataDelete = { id: dataID };
            const res = await itemDelete(data);
            if (res.code) {
                messageApi.destroy();
                messageApi.open({
                    type: "success",
                    content: "Success.",
                    duration: 2,
                    onClose: () => {
                        getTableList({ ...dataQueryParams });
                    },
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                messageApi.destroy();
                messageApi.open({ type: "error", duration: 2, content: error.message });
            }
        }
    };
    useEffect(() => {
        getTableList(dataQueryParams);
    }, []); // eslint-disable-line

    return (
        <div>
            {contextHolder}
            <Row className="title">
                <h4>Item Management</h4>
            </Row>
            <Row>
                <Space className="panel" style={{ marginBottom: "10px" }}>
                    {/* prettier-ignore */}
                    <Button onClick={onClickAdd}><PlusCircleOutlined /> Add</Button>
                    {/* prettier-ignore */}
                    <Search placeholder="input search text" allowClear suffix={<SearchOutlined />} enterButton="Search" onSearch={onSearch} style={{width: 230}} />
                </Space>
            </Row>
            <Table dataSource={dataTableList} rowKey={"id"} scroll={{ y: 620 }} loading={dataTableLoading} pagination={{ position: ["bottomLeft"], current: dataQueryParams.pageNo, pageSize: dataQueryParams.pageSize, total: dataTableListTotal, onChange: onChangePage }} bordered>
                <Column title="Name" dataIndex="name" key="name" width={"150px"} align="center" render={(text) => <span style={{ fontWeight: "bold" }}>{text}</span>} />
                <Column title="Common" dataIndex="common" key="common" width={"150px"} align="center" />
                <Column title="verb" dataIndex="verb" key="verb" width={"200px"} align="center" ellipsis />
                <Column title="noun" dataIndex="noun" key="noun" width={"200px"} align="center" ellipsis />
                <Column title="adj" dataIndex="adjective" key="adjective" width={"200px"} align="center" ellipsis />
                <Column title="adv" dataIndex="adverb" key="adverb" width={"200px"} align="center" ellipsis />
                <Column title="conj" dataIndex="conjunction" key="conjunction" width={"50px"} align="center" ellipsis />
                <Column title="prep" dataIndex="preposition" key="preposition" width={"50px"} align="center" ellipsis />
                {/* prettier-ignore */}
                <Column title="Action" dataIndex="action" key="action" width={"300px"} align="center" 
                     render={(_: any, record: RequestItemData) => (
                        <Space>
                            <Button type="primary" onClick={() => onClickEdit(record)} ghost><EditOutlined /> Edit</Button>
                            <Popconfirm title="Warning" description="Are you sure to do this?" icon={<QuestionCircleOutlined style={{ color: "red" }} />} onConfirm={() => onConfirmDelete(record.id)}>
                                <Button type="primary" danger ghost><DeleteOutlined />Delete</Button>
                            </Popconfirm>
                        </Space>  
                    )}
                />
            </Table>
            <Modal title={<div style={{ marginBottom: "20px" }}>{titleDialog}</div>} open={AddDialogVisible} onOk={onOkAddDialog} onCancel={onCancelAddDialog} width={1000} centered>
                <Form form={form} autoComplete="off" style={{ fontSize: "12px" }}>
                    <Row gutter={10}>
                        <Col span={8}>
                            <Form.Item name="id" hidden>
                                <Input />
                            </Form.Item>
                            <Form.Item name="name" rules={[{ required: true, message: "Please input word name" }]}>
                                <Input size="middle" placeholder="单词" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="pronounce">
                                <Input size="middle" placeholder="发音" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="common">
                                <Input size="middle" placeholder="常见含义" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={8}>
                            <Form.Item name="nounPlural">
                                <Input size="middle" placeholder="复数" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="verbThirdPersonSingular">
                                <Input size="middle" placeholder="第三人称" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={8}>
                            <Form.Item name="verbPastTense">
                                <Input size="middle" placeholder="过去式" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="verbPastParticiple">
                                <Input size="middle" placeholder="过去分词" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="verbPresentParticiple">
                                <Input size="middle" placeholder="现在分词" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={12}>
                            <Form.Item name="noun">
                                <Input.TextArea size="middle" placeholder="名词" autoSize={{ minRows: 4, maxRows: 4 }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="verb">
                                <Input.TextArea size="middle" placeholder="动词" autoSize={{ minRows: 4, maxRows: 4 }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={12}>
                            <Form.Item name="adjective">
                                <Input.TextArea size="middle" placeholder="形容词" autoSize={{ minRows: 4, maxRows: 4 }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="adverb">
                                <Input.TextArea size="middle" placeholder="副词" autoSize={{ minRows: 4, maxRows: 4 }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={12}>
                            <Form.Item name="preposition">
                                <Input.TextArea size="middle" placeholder="介词" autoSize={{ minRows: 4, maxRows: 4 }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="conjunction">
                                <Input.TextArea size="middle" placeholder="连词" autoSize={{ minRows: 4, maxRows: 4 }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={12}>
                            <Form.Item name="comment">
                                <Input.TextArea size="middle" placeholder="Comment" autoSize={{ minRows: 4, maxRows: 4 }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="paste">
                                <Input.TextArea size="middle" placeholder="Paste" autoSize={{ minRows: 4, maxRows: 4 }} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
}

export default Item;
