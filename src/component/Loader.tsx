import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';

const LoadingSpinner = styled(Spinner)`
  width: 3rem;
  height: 3rem;
`;

const Loader = () => (
  <div>
    <LoadingSpinner animation="border" variant="primary" />
    <LoadingSpinner animation="border" variant="secondary" />
    <LoadingSpinner animation="border" variant="success" />
    <LoadingSpinner animation="border" variant="danger" />
    <LoadingSpinner animation="border" variant="warning" />
    <LoadingSpinner animation="border" variant="info" />
    <LoadingSpinner animation="border" variant="light" />
    <LoadingSpinner animation="border" variant="dark" />
  </div>
);

export default Loader;
