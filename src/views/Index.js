import React from "react";
import {
  Card, CardHeader, CardBody, CardTitle, Row, Col,
} from "reactstrap";
import 'jspdf-autotable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SearchPage extends React.Component {
  state = {

  }

  render() {
    return (
      <div className="content">
        <Row>
          <Col md="8" lg={8}>
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Details</CardTitle>
              </CardHeader>
              <CardBody>
                Body
              </CardBody>
            </Card>
          </Col>
          <Col md="4" lg={4}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Recent Search</CardTitle>
              </CardHeader>
              <CardBody>
                Body
              </CardBody>
            </Card>
          </Col>
        </Row>
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
