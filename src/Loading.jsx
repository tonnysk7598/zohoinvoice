import React, { Component } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { Container, Col, Row } from 'reactstrap'

export default class Loading extends Component {
  render() {
    return (
      <Container>
        <Row style={{ marginTop: '3%' }}>
          <Col md={3}>
            <SkeletonTheme color="#FBFFF080" highlightColor="#FFFFFF">
              <Skeleton height={180} />
            </SkeletonTheme>
          </Col>
          <Col md={3}>
            <SkeletonTheme color="#FBFFF080" highlightColor="#FFFFFF">
              <Skeleton height={180} />
            </SkeletonTheme>
          </Col>
          <Col md={3}>
            <SkeletonTheme color="#FBFFF080" highlightColor="#FFFFFF">
              <Skeleton height={180} />
            </SkeletonTheme>
          </Col>
          <Col md={3}>
            <SkeletonTheme color="#FBFFF080" highlightColor="#FFFFFF">
              <Skeleton height={180} />
            </SkeletonTheme>
          </Col>
        </Row>
        <Row style={{ marginTop: '3%' }}>
          <Col md={4}>
            <SkeletonTheme color="#FBFFF080" highlightColor="#FFFFFF">
              <Skeleton height={180} />
            </SkeletonTheme>
          </Col>
          <Col md={4}>
            <SkeletonTheme color="#FBFFF080" highlightColor="#FFFFFF">
              <Skeleton height={180} />
            </SkeletonTheme>
          </Col>
          <Col md={4}>
            <SkeletonTheme color="#FBFFF080" highlightColor="#FFFFFF">
              <Skeleton height={180} />
            </SkeletonTheme>
          </Col>
        </Row>
        <Row style={{ marginTop: '3%' }}>
          <Col md={6}>
            <SkeletonTheme color="#FBFFF080" highlightColor="#FFFFFF">
              <Skeleton height={180} />
            </SkeletonTheme>
          </Col>
          <Col md={6}>
            <SkeletonTheme color="#FBFFF080" highlightColor="#FFFFFF">
              <Skeleton height={180} />
            </SkeletonTheme>
          </Col>
        </Row>
      </Container>
    )
  }
}
