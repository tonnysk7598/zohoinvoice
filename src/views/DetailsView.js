import Loading from 'Loading';
import React, { Component } from 'react'
import {
  Button, Card, CardHeader, CardBody, CardTitle, FormGroup, Form, Row, Col,
  Badge,
} from "reactstrap";
import CardSubtitle from 'reactstrap/lib/CardSubtitle';
import swal from 'sweetalert';

export default class DetailsView extends Component {
  state = {
    contactName: '',
    companyName: '',
    heading: '',
    mobile: '',
    invalidId: false,
    loading: true
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
          this.setState({
            contactName: contact.contact_name,
            companyName: contact.company_name,
            mobile: contact.mobile, contactId,
            invalidId: false, loading: false
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
        if(proceed){
            window.location = `/edit/${contactId}`
        }
    })
  }

  render() {
    const {
      contactName, companyName, mobile, loading, invalidId
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
                        <Col className="pr-1" md="6">
                          <FormGroup>
                            <label>Contact Name</label>
                            <h5>{contactName}</h5>
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <label>Company Name</label>
                            <h5>{companyName}</h5>
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
