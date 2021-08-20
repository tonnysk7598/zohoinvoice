import React, { Component } from 'react'
import {
  Button, Card, CardHeader, CardBody, CardTitle, FormGroup, Form, Input, Row, Col,
} from "reactstrap";
import swal from 'sweetalert';

export default class CreateContact extends Component {
  state = {
    contactName: '',
    companyName: '',
    email: '',
    heading: ''
  }

  componentWillMount() {
    const editMode = sessionStorage.getItem("edit")
    if(editMode === 'true'){
      const contact = JSON.parse(sessionStorage.getItem("contact"))
      this.setState({
        contactName: contact.contact_name,
        companyName: contact.company_name,
        email: contact.email,
        heading: 'Edit Contact'
      })
    } else {
      this.setState({ heading: 'Create Contact' });
    }
  }

  submit = async () => {
    const { contactName, companyName } = this.state;
    const editMode = sessionStorage.getItem("edit")
    const dt = { contactName, companyName }
    if(editMode === 'true'){
      this.editContact(dt);
    } else {
      this.createContact(dt);
    }
  }

  editContact = async (dt) => {
    const contact = JSON.parse(sessionStorage.getItem("contact"))
    const editData = {
      contactName: dt.contactName,
      companyName: dt.companyName,
      contactId: contact.contact_id
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
    // if (res.statusCode === 201) {
    //   swal({
    //     title: 'Success',
    //     text: 'Record Created Successfully',
    //     icon: 'success',
    //     button: true,
    //   })
    //     .then(() => {
    //       window.location = '/'
    //     })
    // }
  }

  createContact = async (dt) => {
    const postData = await fetch('/createNewContact', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(dt)
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

  render() {
    const { contactName, companyName, heading } = this.state;
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
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        onClick={() => this.submit()}
                      >
                        Update Profile
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
