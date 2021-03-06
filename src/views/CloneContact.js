import { salutation } from 'helper';
import Loading from 'Loading';
import React, { Component } from 'react'
import {
  Button, Card, CardHeader, CardBody, CardTitle, FormGroup, Form, Input, Row, Col,
  Badge,
} from "reactstrap";
import CardSubtitle from 'reactstrap/lib/CardSubtitle';
import swal from 'sweetalert';

export default class CloneContact extends Component {
  state = {
    contactName: '',
    companyName: '',
    heading: '',
    mobile: '',
    status: 'active',
    invalidId: false,
    loading: true,
    firstName: '',
    lastName: '',
    salutationType: 'Mr.',
    website: '',
  }

  componentWillMount(props) {
    const contact_id = this.props.match.params.id
    this.getContactInfoByContactId(contact_id);
  }

  getContactInfoByContactId = async (contactId) => {
    fetch(`/getContact/${contactId}`)
      .then(res => res.json())
      .then(response => {
        const { statusCode, body } = response;
        if (statusCode !== 200) {
          this.setState({ invalidId: true, loading: false });
        } else {
          const contactDetails = JSON.parse(body);
          const { contact } = contactDetails;
          const { contact_persons } = contact;
          this.setState({
            contactName: contact.contact_name,
            companyName: contact.company_name,
            mobile: contact.mobile, contactId,
            invalidId: false, loading: false,
            status: contact.status,
            firstName: contact_persons[0].first_name,
            lastName: contact_persons[0].last_name,
            salutationType: contact_persons[0].salutation,
            website: contact.website,
          })
        }
      })
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
    const {
      contactName, companyName, mobile, loading, invalidId,
      firstName, lastName, salutationType, website,
    } = this.state;
    return (
      <div className="content">
        {loading ? (
          <Loading />
        ) : (
          !invalidId ? (
            <Row>
              <Col md="2" />
              <Col md="8">
                <Card className="card-user">
                  <CardHeader>
                    <CardTitle tag="h5">Clone</CardTitle>
                    <CardSubtitle tag="h6"><Badge>Clone & Create New Contact</Badge></CardSubtitle>
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
                    </Form>
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
                        Create Contact
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col md="2" />
            </Row>
          ) :
            <Row>
              <Col md="2" />
              <Col md="8">
                <Card className="card-user">
                  <CardBody>
                    <Row><Col><h1> No Record Found ...!</h1></Col></Row>
                    <Row><Col><p>back to &ensp;&ensp;<a href="/">Home</a></p></Col></Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md="2" />
            </Row>
        )}
      </div>
    )
  }
}
