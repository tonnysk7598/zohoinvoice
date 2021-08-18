import React, { Component } from 'react'
import {
  Button, Card, CardHeader, CardBody, CardTitle, FormGroup, Form, Input, Row, Col,
} from "reactstrap";

export default class CreateContact extends Component {
  state = {
    contactName: '',
    companyName: '',
  }

  submit = async () => {
    const { contactName, companyName } = this.state;
    const dt = { contactName, companyName }
    const vl = JSON.stringify(dt)
    console.error(vl)
    const postData = await fetch('/createNewContact',{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(dt)
    })
    console.error(postData);
  }

  render() {
    const { contactName, companyName } = this.state;
  return (
    <div className="content">
    <Row>
      <Col md="8">
      <Card className="card-user">
        <CardHeader>
        <CardTitle tag="h5">Create Profile</CardTitle>
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
              onChange={(e) => this.setState({ contactName: e.target.value})}
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
              onChange={(e) => this.setState({ companyName: e.target.value})}
            />
            </FormGroup>
          </Col>
          </Row>
          {/* <Row>
          <Col md="12">
            <FormGroup>
            <label>Address</label>
            <Input
              placeholder="Home Address"
              type="text"
            />
            </FormGroup>
          </Col>
          </Row>
          <Row>
          <Col className="pr-1" md="4">
            <FormGroup>
            <label>City</label>
            <Input
              placeholder="City"
              type="text"
            />
            </FormGroup>
          </Col>
          <Col className="px-1" md="4">
            <FormGroup>
            <label>Country</label>
            <Input
              placeholder="Country"
              type="text"
            />
            </FormGroup>
          </Col>
          <Col className="pl-1" md="4">
            <FormGroup>
            <label>Postal Code</label>
            <Input placeholder="ZIP Code" type="number" />
            </FormGroup>
          </Col>
          </Row>
          <Row>
          <Col className="pr-1" md="5">
            <FormGroup>
            <label>Phone</label>
            <Input
              placeholder="Phone"
              type="text"
            />
            </FormGroup>
          </Col>
          <Col className="px-1" md="3">
            <FormGroup>
            <label>Pay Method</label>
            <Input
              placeholder="Pay"
              type="text"
            />
            </FormGroup>
          </Col>
          <Col className="pl-1" md="4">
            <FormGroup>
            <label htmlFor="exampleInputEmail1">
              Email address
            </label>
            <Input placeholder="Email" type="email" />
            </FormGroup>
          </Col>
          </Row>
          <Row>
          <Col md="12">
            <FormGroup>
            <label>About Me</label>
            <Input
              type="textarea"
            />
            </FormGroup>
          </Col>
          </Row> */}
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
      <Col md="4">
      <Card>
        <CardHeader>
        <CardTitle tag="h4">Active Students</CardTitle>
        </CardHeader>
        <CardBody>
        <ul className="list-unstyled team-members">
          <li>
          <Row>
            <Col md="2" xs="2">
            <div className="avatar">
              <img
              alt="..."
              className="img-circle img-no-padding img-responsive"
              src={require("assets/img/faces/ayo-ogunseinde-2.jpg")}
              />
            </div>
            </Col>
            <Col md="7" xs="7">
            DJ Khaled <br />
            <span className="text-muted">
              <small>Offline</small>
            </span>
            </Col>
            <Col className="text-right" md="3" xs="3">
            <Button
              className="btn-round btn-icon"
              color="success"
              outline
              size="sm"
            >
              <i className="fa fa-envelope" />
            </Button>
            </Col>
          </Row>
          </li>
          <li>
          <Row>
            <Col md="2" xs="2">
            <div className="avatar">
              <img
              alt="..."
              className="img-circle img-no-padding img-responsive"
              src={require("assets/img/faces/joe-gardner-2.jpg")}
              />
            </div>
            </Col>
            <Col md="7" xs="7">
            Creative Tim <br />
            <span className="text-success">
              <small>Available</small>
            </span>
            </Col>
            <Col className="text-right" md="3" xs="3">
            <Button
              className="btn-round btn-icon"
              color="success"
              outline
              size="sm"
            >
              <i className="fa fa-envelope" />
            </Button>
            </Col>
          </Row>
          </li>
        </ul>
        </CardBody>
      </Card>
      </Col>
    </Row>
    </div>
  )
  }
}
