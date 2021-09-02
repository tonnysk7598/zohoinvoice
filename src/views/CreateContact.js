import React, { Component } from 'react'
import {
  Button, Card, CardHeader, CardBody, CardTitle, FormGroup, Form, Input, Row, Col,
  Badge,
} from "reactstrap";
import CardSubtitle from 'reactstrap/lib/CardSubtitle';
import swal from 'sweetalert';

export default class CreateContact extends Component {
  state = {
    contactName: '',
    companyName: '',
    mobile: '',
  }

  submit = async () => {
    const { contactName, companyName, mobile } = this.state;
    const handleData = { contactName, companyName, mobile }
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
    const { contactName, companyName, mobile } = this.state;
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
                  </Row>
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
