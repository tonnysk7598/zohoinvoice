import React from "react";
import {
  Card, CardBody, CardTitle, Row, Col, CardFooter, Modal,
} from "reactstrap";
import 'jspdf-autotable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from "../Loading";
import swal from "sweetalert";

class SearchPage extends React.Component {
  state = {
    openModal: false,
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

  render() {
    const { openModal, allContacts, loading } = this.state;
    console.error(allContacts)
    return (
      <div className="content">
        {!loading ? (
          <React.Fragment>
        <Row>
          <Col lg="4" md="6" sm="6">
            <Card className="card-stats" onClick={() => this.setState({ openModal: true })} style={{ cursor: 'pointer' }}>
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
                      <div className="numbers" onClick={() => this.setState({ openModal: true })} style={{ cursor: 'pointer' }}>
                        <p className="card-category">{contact.company_name}</p>
                        <CardTitle tag="p">{contact.contact_name}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-envelope" /> {contact.email}<br />
                    <i className="fas fa-address-book" /> Status: {contact.status}
                  </div>
                  <div className="text-right">
                    <i className="mt-sm-1 fas fa-trash text-danger" onClick={() => this.deleteContact(contact)} style={{ cursor: 'pointer' }} />
                  </div>
                </CardFooter>
              </Card>
            </Col>
          )): ''}
        </Row>
        <Modal
          isOpen={openModal}
          toggle={this.onCloseModal}
          className="card-modal--primary"
          style={{ maxWidth: '80%' }}
        >
          <div className="modal__header">
            <i className="fas fa-times"><button className="lnr lnr-cross modal__close-btn" type="button" onClick={this.onCloseModal} /></i>
            <h4 className="bold-text  modal__title">Create Contact</h4>
          </div>
          <div className="modal__body">
            <hr /><br />

          </div>
        </Modal>
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
