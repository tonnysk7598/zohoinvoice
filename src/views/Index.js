import React from "react";
import {
  Card, CardBody, CardTitle, Row, Col, CardFooter, UncontrolledTooltip,
} from "reactstrap";
import 'jspdf-autotable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from "../Loading";
import swal from "sweetalert";

const capitalize = s => s && s[0].toUpperCase() + s.slice(1)

class SearchPage extends React.Component {
  state = {
    allContacts: []
  }

  componentDidMount() {
    sessionStorage.setItem("edit", false);
    sessionStorage.setItem("clone", false);
    this.setState({ loading: true})
    setTimeout(() => {
      this.getAllContacts()
    }, 3000);
  }

  getAllContacts = async () => {
    this.setState({ loading: true})
    const response = await fetch('/getAllContacts');
    const contactsResponse = await response.json();
    this.setState({ allContacts: contactsResponse, loading: false });
  }
  
  onCloseModal = () => {
    this.setState({ openModal: false })
  }

  deleteContact = (contactInfo) => {
    const data = {
      contactId: contactInfo.contact_id
    }
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
        const postData = await fetch('/deleteContact', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'post',
          body: JSON.stringify(data)
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
    sessionStorage.setItem("edit", false);
    sessionStorage.setItem("clone", false);
    window.location = '/admin/create'
  }

  editContact = (editData) => {
    sessionStorage.setItem("contact", JSON.stringify(editData));
    sessionStorage.setItem("edit", true);
    window.location = '/admin/create'
  }

  cloneContact = (cloneData) => {
    sessionStorage.setItem("contact", JSON.stringify(cloneData));
    sessionStorage.setItem("clone", true);
    window.location = '/admin/create'
  }

  render() {
    const { allContacts, loading } = this.state;
    return (
      <div className="content">
        {!loading ? (
          <React.Fragment>
        <Row>
          <Col lg="4" md="6" sm="6">
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
            <Col lg="4" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-ruler-pencil text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers" onClick={() => this.editContact(contact)} style={{ cursor: 'pointer' }}>
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
                    <i id="clone" className="mt-sm-2 fas fa-copy text-info" onClick={() => this.cloneContact(contact)} style={{ cursor: 'pointer' }} />
                    &ensp;&ensp;&ensp;
                    <i id="trash" className="mt-sm-2 fas fa-trash text-danger" onClick={() => this.deleteContact(contact)} style={{ cursor: 'pointer' }} />
                  </div>
                  <UncontrolledTooltip  placement="bottom" target="trash">
                    Delete
                  </UncontrolledTooltip>
                  <UncontrolledTooltip  placement="bottom" target="clone">
                    Clone
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

SearchPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  searchrecord: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  searchrecord: state,
});

export default connect(mapStateToProps)(SearchPage);
