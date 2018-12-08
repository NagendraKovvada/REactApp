import { Modal, Form, Tooltip , Button, Input, Icon, Cascader    } from 'antd';
import React, { Component } from 'react'
import './../styles/model.css';


const FormItem = Form.Item;


class Model extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
        // this.showModal = this.showModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this); 
    }



    showModal() {
        this.setState({
            visible: true,
        });
    }

    closeModal() {
      debugger;
      this.setState({
        visible: false,
      },()=> {
        this.props.handleCancel();
      });
    }



    handleOk() {
        // console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel() {
        this.setState({
          visible: false,
        },()=> {
          this.props.handleClick();
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.props, "this.propsthis.propsthis.propsthis.propsthis.props");
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.addContact(values, ()=>{
                  this.handleCancel();
                });
            }
        });
    }


  render() {

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };

    return (
      <div>
        {/* <Button type="primary" onClick={value => this.showModal()}> */}
        <Modal
          title="Add a contact"
          visible={this.state.visible}
          onOk={value => this.handleOk()}
          onCancel={value => this.handleCancel()}
          className="model"
        >
          <Form onSubmit={this.handleSubmit}>
       
          <FormItem
          {...formItemLayout}
          label={(
            <span>
              Type
            </span>
          )}
        >
          {getFieldDecorator('Type', {
            rules: [{ required: true, message: 'Please input your type!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
       
       
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Name
            </span>
          )}
        >
          {getFieldDecorator('Name', {
            rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Title
            </span>
          )}
        >
          {getFieldDecorator('Title', {
            rules: [{ required: true, message: 'Please input your title!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
       
        <FormItem
          {...formItemLayout}
          label="Phone"
        >
          {getFieldDecorator('Phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Ext"
        >
          {getFieldDecorator('Ext', {
            rules: [{ required: true, message: 'Please input your EXt!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>


        <FormItem
          {...formItemLayout}
          label="Fax"
        >
          {getFieldDecorator('Fax', {
            rules: [{ required: true, message: 'Please input your Fax!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
       
        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('Email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>
       
        <FormItem>
          <Button type="primary" htmlType="submit">Save</Button>
        </FormItem>
      </Form>
        </Modal>
      </div>
    );
  }
}


const ContactForm = Form.create()(Model);

export default ContactForm