import React, { Component } from 'react'
import {
  Button, Card, CardHeader, CardBody, CardTitle, FormGroup, Form, Input, Row, Col,
  Badge,
} from "reactstrap";
import CardSubtitle from 'reactstrap/lib/CardSubtitle';
import swal from 'sweetalert';
import { salutation } from '../helper';

export default class CreateContact extends Component {
  state = {
    contactName: '',
    companyName: '',
    mobile: '',
    firstName: '',
    lastName: '',
    salutationType: 'Mr.',
    website: '',
  }

  submit = async () => {
    const {
      contactName, companyName, mobile, firstName,
      lastName, salutationType, website,
    } = this.state;
    const handleData = {
      contactName, companyName, mobile, firstName,
      lastName, salutationType, website,
    }
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
    } else {
      const errorMesage = JSON.parse(res.body);
      swal('Error', `${errorMesage.message}`, 'error')
    }
  }

  render() {
    const {
      contactName, companyName, mobile, firstName,
      lastName, salutationType, website,
    } = this.state;
    return (
      <div className="content">
        <Row>
          <Col md="2" />
          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Create</CardTitle>
                <CardSubtitle tag="h6"><Badge>Create new contact</Badge></CardSubtitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="2">
                      <FormGroup>
                        <label>Salutation</label>
                        <Input
                          type="select"
                          value={salutationType}
                          onChange={(e) => this.setState({ salutationType: e.target.value })}
                        >
                          {salutation.map(d => (<option key={d.label} value={d.value}>{d.value}</option>))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          placeholder="First Name"
                          type="text"
                          value={firstName}
                          onChange={(e) => this.setState({ firstName: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          placeholder="Last Name"
                          type="text"
                          value={lastName}
                          onChange={(e) => this.setState({ lastName: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
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
                        <label>Website</label>
                        <Input
                          placeholder="www.example.com"
                          type="text"
                          value={website}
                          onChange={(e) => this.setState({ website: e.target.value })}
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
                  <div className="update ml-auto mr-auto text-right">
                    <Button
                      className="btn-round"
                      color="secondary"
                      href="/"
                    >
                      Close
                    </Button>
                    <Button
                      className="btn-round"
                      color="primary"
                      onClick={() => this.submit()}
                    >
                      Creact Contact
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col md="2" />
        </Row>
      </div>
    )
  }
}
