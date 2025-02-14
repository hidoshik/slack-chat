import { Container, Row, Card, Col } from 'react-bootstrap';

type FormContainerProps = {
  children: React.ReactNode;
};

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md="8" className="col-12 col-xxl-6">
          <Card className="shadow-sm">{children}</Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
