import { PureComponent } from "react";
import './index.scss'
import { Table, Divider, Tag, Modal, notification, Button } from 'antd';

const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Notification Title',
      description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };
// const dataSource = [{
//     key: '1',
//     id:1,
//     name: '超市',
//     address: '西湖区湖底公园1号'
//   }, {
//     key: '2',
//     name: '小店',
//     address: '西湖区湖底公园1号'
//   }];
  const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },{
    key: '4',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  }, {
    key: '5',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  }, {
    key: '6',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  }];
  
  


class Firstshop extends PureComponent{
    constructor(){
        super()
    }
    
columns = [{
    title: '名字',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  }, {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
        <span>
            {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
        </span>
        ),
    }, 
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
        <span>
            <a href="javascript:;">Invite {record.name}</a>
            <Divider type="vertical" />
            <a href="javascript:;">Delete</a>
        </span>
        ),
    },
    {
        title: 'More',
        key: 'more',
        render: (text, record) => (
        <span>
            <a href="javascript:;">data:{JSON.stringify(record)}</a>
            <Divider type="vertical" />
            <a href="javascript:void(0);" onClick={this.showModal}>Edit</a>
        </span>
        ),
    }];
    state = {
        visible: false
    }
    
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    hideModal = () => {
        this.setState({
            visible: false,
        });
    }
    render(){
        return (
            <div>
                <Table dataSource={data} columns={this.columns} />
            </div>
        )
    }
}

export default Firstshop