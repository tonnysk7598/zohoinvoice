import React from "react";
import {
  Card, CardBody, CardTitle, Row, Col, CardFooter, Modal,
} from "reactstrap";
import 'jspdf-autotable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SearchPage extends React.Component {
  state = {
    openModal: false,
  }

  componentDidMount() {
    setTimeout(async () => {
      const response = await fetch('/getAllContacts');
      const body = await response.json();
      console.error(body)
    }, 3000);
  }

  onCloseModal = () => {
    this.setState({ openModal: false })
  }

  render() {
    const { openModal } = this.state;
    return (
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats" onClick={()=> this.setState({ openModal: true })} style={{ cursor: 'pointer'}}>
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
