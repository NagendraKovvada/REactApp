import React, { Component } from 'react'
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import { Table, Icon, Button, Tooltip   } from 'antd';
import axios from 'axios';
import  ContactForm from './model'
import './../styles/style.css'



class Contacts extends React.Component {

    constructor(props) {
        super(props);
        this.state  = { 
            contacts : [],
            columns: [],
            isOpen: false
        }
        this.rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }),
          };

          this.handleClick = this.handleClick.bind(this);
          this.addContact = this.addContact.bind(this);
          this.deleteContact = this.deleteContact.bind(this);
       
    }


    componentDidMount() {
        axios
        .get('src/assets/contacts.json')
        .then(({ data })=> {
          console.log(data);
          const columns =[{
            title: 'Type',
            dataIndex: 'Type',
            render: text => <a href="javascript:;">{text}</a>,
          }, {
            title: 'Name',
            dataIndex: 'Name',
          }, {
            title: 'Title',
            dataIndex: 'Title',
          },
          {
            title: 'Phone',
            dataIndex: 'Phone',
          },
          {
            title: 'Ext',
            dataIndex: 'Ext',
          },
          {
            title: 'Fax',
            dataIndex: 'Fax',
          },
          {
            title: 'Email',
            dataIndex: 'Email',
          },
          {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <Tooltip title="Delete a Contact">
              <span>
                <a><Icon type="delete" className="font_25"  className="delete_contact" onClick={()=>{this.deleteContact(record)}}/></a>
              </span>
              </Tooltip>
            ),
          }
        ]
          this.setState({
              contacts: data,
              columns: columns
          });
        })
        .catch((err)=> {})
    }

    handleClick() {
        this.setState({ isOpen: !this.state.isOpen });
    }


    addContact(props, cb) {
      let { contacts } = this.state;
      props['Id'] = this.state.contacts.length;
      contacts.push(props);
      this.setState({contacts: contacts}, function() {
        cb();
      });
    }

    deleteContact(record) {
      let { contacts, details, } = this.state;
      contacts.splice(record.Id, 1);
      this.setState(contacts);
    }

    render() {
      console.log(this.state.isOpen,"isOpennnnnn");
        return(
            <div>
                {this.state.isOpen ?  <ContactForm addContact={this.addContact} isOpen={this.state.isOpen} handleClick={this.handleClick}/> : '' }

                <Button className="add_contact" type="primary" onClick={this.handleClick}>Add a Contact</Button>
                <Table  columns={this.state.columns} dataSource={this.state.contacts} />
            </div>
            
        );
    }

}

export default Contacts