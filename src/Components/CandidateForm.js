import React, { useContext, useEffect, useState } from 'react'
import { Form, Input, Button, notification, message, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import Helmet from 'react-helmet'
import 'antd/dist/antd.css';
import { CandidateContext } from '../CandidateContext';

const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
        onSuccess('ok')
    }, 0)
}

const OfficeForm = () => {

    const [form] = Form.useForm()
    const { candidateList, setCandidateList } = useContext(CandidateContext)
    const [fileList, setFileList] = useState([])

    const onFinish = (values) => {
        values.resume = fileList[0]
        const tempFileList=[]
        setFileList([...tempFileList])
        let userNameExists = false
        let userIndex = null
        for (let i = 0; i < candidateList.length; i += 1) {
            if (candidateList[i].username === values.username) {
                userNameExists = true
                userIndex = i
            }
        }
        if (userNameExists) {
            const key = `open${Date.now()}`
            const btn = (
                <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                        const tempCandidateList = candidateList
                        tempCandidateList[userIndex] = values
                        setCandidateList([...tempCandidateList])
                        notification.close(key)
                        form.resetFields()
                        message.success("Candidate Added")
                    }}
                >
                    Yes
                </Button>
            )
            notification['warning']({
                message: 'Confirm Submission',
                description: 'Username already exists. Do you want to replace the candidate?',
                btn,
                key,
                duration: 0,
            })
        }
        else {
            setCandidateList([...candidateList, values])
            form.resetFields()
            message.success("Candidate Added")
        }

    }
    const resetAllFields = () => {
        form.resetFields()
    }

    const onChange = info => {
        console.log(info)
        let tempFileList = fileList
        switch (info.file.status) {
            case 'uploading':
                tempFileList = info.fileList
                setFileList([...tempFileList])
                break
            case 'done':
                tempFileList = info.fileList
                setFileList([...tempFileList])
                break
        }
    }

    console.log(candidateList, fileList)
    return (
        <div>
            <Helmet title='YouKraft' />
            <div className='row form-main-row'>
                <div className='col-lg-6'>
                    <div className="card form-main-card">
                        <div className="card-header card-header-flex" style={{ color: "#FF4D01", fontWeight: "bolder", padding: "1rem", fontSize: "2rem", textAlign: "center" }}>
                            Interview Form
                        </div>
                        <div className="card-body" style={{ padding: "2rem" }}>
                            <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onFinish={onFinish}>
                                <Form.Item name="username" label="Username" rules={[{ required: true, message: "Username containing no special characters is required.", pattern: new RegExp(/^[a-zA-Z0-9_]*$/) }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true, message: "Email is required." }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="age" label="Age" >
                                    <Input type="number" min={22} max={60} />
                                </Form.Item>
                                <Form.Item name="number" label="Phone Number" rules={[{required: true, message: "10 digit Phone Number is required.", pattern: new RegExp(/^[6-9]\d{9}$/) }]}>
                                    <Input type="number" />
                                </Form.Item>
                                <Form.Item name="link" label="LinkedIn url">
                                    <Input type="url" />
                                </Form.Item>
                                <Form.Item name="resume" label="Resume">
                                    <Upload
                                        onChange={onChange}
                                        fileList={fileList}
                                        customRequest={dummyRequest}
                                        accept='.pdf'
                                    >
                                        <Button
                                            icon={<UploadOutlined />}
                                            style={{ margin: 'auto' }}
                                            disabled={fileList.length>0}
                                        >
                                            Upload Resume
                                        </Button>
                                    </Upload>
                                </Form.Item>


                                <div className='row'>
                                    <div className='col-lg-2'>
                                        <Form.Item>
                                            <Button style={{ background: "#183B56", color: "white", borderRadius: "0.3rem" }} onClick={resetAllFields}>
                                                Reset
                                            </Button>
                                        </Form.Item>
                                    </div>
                                    <div className='col-lg-2 offset-md-8'>
                                        <Form.Item>
                                            <Button style={{ background: "#183B56", color: "white", borderRadius: "0.3rem" }} htmlType="submit">
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </div>
                                </div>

                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OfficeForm