import Loading from 'Loading';
import React, { Component } from 'react'
import {
  Button, Card, CardHeader, CardBody, CardTitle, FormGroup, Form, Row, Col,
  Badge,
} from "reactstrap";
import CardSubtitle from 'reactstrap/lib/CardSubtitle';
import swal from 'sweetalert';

const capitalize = s => s && s[0].toUpperCase() + s.slice(1)

export default class DetailsView extends Component {
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
    email: '',
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
            email: contact_persons[0].email,
          })
        }
      })
  }

  submit = async () => {
    const { contactId } = this.state;
    swal({
      title: 'Are you sure?',
      text: 'Your are trying to edit this contact..!',
      icon: 'info',
      buttons: ['No', 'Yes, Proceed'],
    })
      .then((proceed) => {
        if (proceed) {
          window.location = `/edit/${contactId}`
        }
      })
  }

  changeStatus = async () => {
    const { contactId, status } = this.state;
    swal({
      title: 'Are you sure?',
      text: 'You are trying to change the status of the contact..!',
      icon: 'info',
      buttons: ['No', 'Yes Proceed'],
    })
      .then(async (proceed) => {
        if (proceed) {
          const updateData = {
            status: status === 'active' ? 'inactive' : 'active',
          }
          const postData = await fetch(`/updateStatus/${contactId}`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(updateData)
          })
          const res = await postData.json();
          if (res.statusCode === 200) {
            const successMesage = JSON.parse(res.body);
            swal({
              title: 'Success',
              text: `${successMesage.message}`,
              icon: 'success',
              button: true,
            })
              .then(() => {
                if (status === 'active') {
                  window.location = '/'
                } else {
                  this.setState({ status: 'active' })
                }
              })
          } else {
            const errorMesage = JSON.parse(res.body);
            swal('Error', `${errorMesage.message}`, 'error')
          }
        }
      })
  }

  render() {
    const {
      contactName, companyName, mobile, loading, invalidId, status,
      firstName, lastName, salutationType, email,
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
                    <CardTitle tag="h5">Details View</CardTitle>
                    <CardSubtitle tag="h6"><Badge>Create new contact</Badge></CardSubtitle>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col className="pr-1" md="12">
                          <FormGroup>
                            <label>Primary Contact Name</label>
                            <h5>{`${salutationType} ${capitalize(firstName)} ${capitalize(lastName)}`}</h5>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <FormGroup>
                            <label>Contact Name</label>
                            <h5>{capitalize(contactName)}</h5>
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <label>Company Name</label>
                            <h5>{capitalize(companyName)}</h5>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <FormGroup>
                            <label>Mobile</label>
                            <h5>{mobile}</h5>
                          </FormGroup>
                        </Col>
                        <Col className="pr-1" md="6">
                          <FormGroup>
                            <label>E-Mail</label>
                            <h5>{email}</h5>
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
                          onClick={() => this.changeStatus()}
                        >
                          {status === 'active' ? 'Mark as In-Active' : 'Mark as Active'}
                        </Button>
                        <Button
                          className="btn-round"
                          color="primary"
                          onClick={() => this.submit()}
                          disabled={status === 'active' ? false : true}
                        >
                          Edit Contact
                        </Button>
                      </div>
                    </Form>
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
