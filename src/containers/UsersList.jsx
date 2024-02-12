import styled from '@emotion/styled';
import { Container, Paper } from '@mui/material';
import { ListComponent } from 'components';

const CenteredContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 50vw;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  width: 100%;
`;

const UsersList = () => {
  return (
    <CenteredContainer maxWidth='md'>
      <StyledPaper elevation={3}>
        <ListComponent />
      </StyledPaper>
    </CenteredContainer>
  );
};

export default UsersList;
