import React, { useEffect, useState, useContext } from 'react'
import { Form, Input, Button, Table, Popconfirm, notification, message,Modal, Dropdown } from 'antd'
import scene from '../sceneReal.png'
import Helmet from 'react-helmet'
import 'antd/dist/antd.css';
import { saveAs } from 'file-saver'
import { CandidateContext } from '../CandidateContext'

const OfficeForm = () => {

    const [form] = Form.useForm()
    const { candidateList, setCandidateList,isModalVisible,setIsModalVisible } = useContext(CandidateContext)

    const [columns, setColumns] = useState([
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            sorter: (a, b) => a.username.localeCompare(b.username),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => a.age.localeCompare(b.age),
        },
        {
            title: 'Phone Number',
            dataIndex: 'number',
            key: 'number',
            sorter: (a, b) => a.number.localeCompare(b.number),
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: record => (
                <span>
                    <Button
                        // onClick={()=>{setIsModalVisible(true)}}
                        className="btn btn-sm btn-light mr-2"
                    >
                        <a href={record.link}>
                        <i className='fa fa-info mr-2' />
                        LinkedIn
                        </a>
                    </Button>
                    <Button
                        onClick={()=>downloadResume(record.resume)}
                        className="btn btn-sm btn-light mr-2"
                    >
                        <i className='fa fa-download mr-2' />
                        Resume
                    </Button>
                    <Popconfirm
                        placement="topRight"
                        title="Are you sure to delete this record?"
                        onConfirm={() => deleteCandidate(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            className="btn btn-sm btn-light"

                        >
                            <i className='fa fa-trash mr-2' />
                            Delete
                        </Button>
                    </Popconfirm>
                </span>

            ),
        },
    ])

    const deleteCandidate = (record) => {
        const tempCandidateList = candidateList
        for (let i = 0; i < candidateList.length; i += 1) {
            if (record.number === candidateList[i].number) {
                tempCandidateList.splice(i, 1)
            }
        }
        setCandidateList([...tempCandidateList])
    }

    const downloadResume=(file)=>{
        console.log(file.originFileObj)
        saveAs(file.originFileObj)
    }

    console.log(isModalVisible,candidateList)
    return (
        <div>
            <Helmet title='YouKraft' />
            <div className='row' style={{ justifyContent: "center", marginTop: "2rem" }}>
                <div className='col-lg-10'>
                    <div className="card" style={{ margin: "auto", marginBottom: "2rem" }}>
                        <div className="card-header card-header-flex" style={{ color: "#FF4D01", fontWeight: "bolder", padding: "1rem", fontSize: "2rem", textAlign: "center" }}>
                            Candidate List
                        </div>
                        <div className="card-body" style={{ padding: "2rem" }}>
                            {candidateList.length > 0 ? <Table dataSource={candidateList} columns={columns} pagination={5} /> :
                                <img src={scene} alt='Backup' style={{ width: "-webkit-fill-available" }} />}
                            <div className='row'>
                                <div className='col-lg-2 offset-md-10' style={{ textAlign:"end", marginTop: "2rem" }}>
                                    <Form.Item>
                                        <Button style={{ background: "#183B56", color: "white", borderRadius: "0.3rem" }}>
                                            <a href='https://www.youkraft.com/'>Go to Website</a>
                                        </Button>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OfficeForm