import React, { Component } from 'react'
import {
  Button, Card, CardHeader, CardBody, CardTitle, FormGroup, Form, Input, Row, Col,
} from "reactstrap";
import swal from 'sweetalert';

const statusOption = [
  { label: '', value: ''},
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' },
]
export default class CreateContact extends Component {
  state = {
    contactName: '',
    companyName: '',
    email: '',
    heading: '',
    mobile: '',
    selectedStatus: statusOption[0].value,
  }

  componentWillMount() {
    const editMode = sessionStorage.getItem("edit")
    if (editMode === 'true') {
      const contact = JSON.parse(sessionStorage.getItem("contact"))
      console.error(contact)
      this.setState({
        contactName: contact.contact_name,
        companyName: contact.company_name,
        email: contact.email,
        heading: 'Edit Contact',
        mobile: contact.mobile,
        status: contact.status,
        selectedStatus: { label: contact.status, value: contact.status }
      })
    } else {
      this.setState({ heading: 'Create Contact' });
    }
  }

  submit = async () => {
    const { contactName, companyName, email, mobile, status } = this.state;
    console.error(status)
    const editMode = sessionStorage.getItem("edit")
    const handleData = { contactName, companyName, email, mobile, status }
    if (editMode === 'true') {
      this.editContact(handleData);
    } else {
      this.createContact(handleData);
    }
  }

  editContact = async (handleData) => {
    const contact = JSON.parse(sessionStorage.getItem("contact"))
    const editData = {
      contactName: handleData.contactName,
      companyName: handleData.companyName,
      contactId: contact.contact_id,
      email: handleData.email,
      mobile: handleData.mobile,
      status: handleData.status,
    }
    console.error(editData)
    const putData = await fetch('/updateContact', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'put',
      body: JSON.stringify(editData)
    })
    const res = await putData.json();
    console.error(res)
    if (res.statusCode === 200) {
      swal({
        title: 'Success',
        text: 'Record Updated Successfully',
        icon: 'success',
        button: true,
      })
        .then(() => {
          window.location = '/'
        })
    }
  }

  createContact = async (handleData) => {
    const postData = await fetch('/createNewContact', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(handleData)
    })
    const res = await postData.json();
    if (res.statusCode === 201) {
      swal({
        title: 'Success',
        text: 'Record Created Successfully',
        icon: 'success',
        button: true,
      })
        .then(() => {
          window.location = '/'
        })
    }
  }

  changeStatus = async () => {
    const { status } = this.state;
    console.error(status)
    const contact = JSON.parse(sessionStorage.getItem("contact"))
    swal({
      title: 'Info',
      text: 'Are you sure? You are trying to change the status of the contact.',
      icon: 'info',
      buttons: ['No', 'Yes Proceed'],
    })
      .then(async (proceed) => {
        if(proceed) {
          const updateData = {
            status: status === 'active' ? 'inactive' : 'active',
            contactId: contact.contact_id,
          }
          console.error(updateData)
        const postData = await fetch('/updateStatus', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'post',
          body: JSON.stringify(updateData)
        })
        const res = await postData.json();
        console.error(res)
            //     .then(() => {
    //       window.location = '/'
    //     })
      }
    })
  }

  render() {
    const {
      contactName, companyName, heading, email, mobile, status
    } = this.state;
    const editMode = sessionStorage.getItem("edit")
    return (
      <div className="content">
        <Row>
          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">{heading}</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Contact Name</label>
                        <Input
                          placeholder="Contact Name"
                          type="text"
                          value={contactName}
                          onChange={(e) => this.setState({ contactName: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Company Name</label>
                        <Input
                          placeholder="Company Name"
                          type="text"
                          value={companyName}
                          onChange={(e) => this.setState({ companyName: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Email</label>
                        <Input
                          placeholder="abc@example.com"
                          type="text"
                          value={email}
                          onChange={(e) => this.setState({ email: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Mobile</label>
                        <Input
                          placeholder="xxxxx xxxxx"
                          type="text"
                          maxlength="10"
                          value={mobile}
                          onChange={(e) => this.setState({ mobile: e.target.value.replace(/\D/, '') })}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        onClick={() => this.submit()}
                      >
                        {editMode === 'true' ? 'Update Contact' : 'Creact Contact'}
                      </Button>
                    </div>
                    {editMode === 'true' && (
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        onClick={() => this.changeStatus()}
                      >
                        {status === 'active' ? 'Mark as In-Active' : 'Mark as Active'}
                      </Button>
                    </div>
                    )}
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
          {editMode === 'true' && (
            <Col md="4" lg={4}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Change Status</CardTitle>
                </CardHeader>
                <CardBody>
                  <Col>
                    <FormGroup>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          onClick={() => this.changeStatus()}
                        >
                          {status === 'active' ? 'Mark as In-Active' : 'Mark as Active'}
                        </Button>
                      </div>
                      {/* <Input
                        type="select"
                        value={selectedStatus}
                        onChange={(e) => this.changeStatus(e)}
                      >
                        {statusOption.map(d => (<option key={d.key} value={d.value}>{d.label}</option>))}
                      </Input> */}
                    </FormGroup>
                  </Col>
                </CardBody>
              </Card>
            </Col>
          )}
        </Row>
      </div>
    )
  }
}
