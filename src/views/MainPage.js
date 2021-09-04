import React from "react";
import {
  Card, CardBody, CardTitle, Row, Col, CardFooter, UncontrolledTooltip,
} from "reactstrap";
import 'jspdf-autotable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from "../Loading";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const capitalize = s => s && s[0].toUpperCase() + s.slice(1)

class MainPage extends React.Component {
  state = {
    allContacts: []
  }

  componentDidMount() {
    this.setState({ loading: true})
    setTimeout(() => {
      this.getAllContacts()
    }, 3000);
  }

  getAllContacts = async () => {
    this.setState({ loading: true})
    const response = await fetch('/getAllContacts');
    const contactsResponse = await response.json();
    console.error(contactsResponse)
    this.setState({ allContacts: contactsResponse, loading: false });
  }
  
  onCloseModal = () => {
    this.setState({ openModal: false })
  }

  deleteContact = (contactInfo) => {
    const { contact_id } = contactInfo;
    swal({
      title: 'Delete contact? Are you sure?',
      text: 'Once deleted, you will not be able to recover this data',
      icon: 'warning',
      buttons: ['No', 'Yes, delete'],
      dangerMode: true,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        this.setState({ loading: true });
        const postData = await fetch(`/deleteContact/${contact_id}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'delete',
        })
        await postData.json();
        swal({
          title: 'Poof...!',
          text: 'This contact has been deleted!',
          icon: 'success',
          button: true,
        })
          .then(() => {
            this.getAllContacts();
          });
      } else {
        return null;
      }
    })
  }

  createNewPage = () => {
    window.location = '/create'
  }
  
  viewContact = (contact) => {
    window.location = `/view/${contact.contact_id}`
  }

  render() {
    const { allContacts, loading } = this.state;
    return (
      <div className="content">
        {!loading ? (
          <React.Fragment>
        <Row>
          <Col lg="3" md="5" sm="5">
            <Card className="card-stats" onClick={() => this.createNewPage()} style={{ cursor: 'pointer' }}>
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-simple-add text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Create</p>
                      <CardTitle tag="p">New</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-info" /> Click to create new contact
                </div>
              </CardFooter>
            </Card>
          </Col>
          {allContacts && allContacts.length ? allContacts.map(contact => (
            <Col lg="3" md="5" sm="5">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-ruler-pencil text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers" onClick={() => this.viewContact(contact)} style={{ cursor: 'pointer' }}>
                        <p className="card-category" style={{color: contact.status === 'active' ? 'green' : 'red'}}>
                          {contact.status.toUpperCase()}
                        </p>
                        <CardTitle tag="p">{capitalize(contact.contact_name)}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-mobile" /> Phone: {contact.mobile || '---'}<br />
                    <i className="fas fa-address-book" /> Company: {capitalize(contact.company_name) || '---'}
                  </div>
                  <div className="text-right">
                    <Link to={`/edit/${contact.contact_id}`}>
                      <i id="edit" className="mt-sm-2 fas fa-edit text-success" />
                    </Link>
                    &ensp;&ensp;&ensp;
                    <Link to={`/clone/${contact.contact_id}`}>
                      <i id="clone" className="mt-sm-2 fas fa-copy text-info" />
                    </Link>
                    &ensp;&ensp;&ensp;
                    <i id="trash" className="mt-sm-2 fas fa-trash text-danger" onClick={() => this.deleteContact(contact)} style={{ cursor: 'pointer' }} />
                  </div>
                  <UncontrolledTooltip  placement="bottom" target="edit">
                    Edit
                  </UncontrolledTooltip>
                  <UncontrolledTooltip  placement="bottom" target="clone">
                    Clone
                  </UncontrolledTooltip>
                  <UncontrolledTooltip  placement="bottom" target="trash">
                    Delete
                  </UncontrolledTooltip>
                </CardFooter>
              </Card>
            </Col>
          )): ''}
        </Row>
        </React.Fragment>
        ): <Loading />}
      </div>
    );
  }
}

MainPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  searchrecord: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  searchrecord: state,
});

export default connect(mapStateToProps)(MainPage);
