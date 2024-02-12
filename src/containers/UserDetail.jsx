import styled from '@emotion/styled';
import { Paper } from '@mui/material';
import { Detail } from 'components';
import { useLocation } from 'react-router-dom';

const StyledPaper = styled(Paper)`
  && {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    margin-top: 20px;
  }
`;

const UserDetail = () => {
  const { state } = useLocation();
  return (
    <StyledPaper>
      <Detail user={state} />
    </StyledPaper>
  );
};

export default UserDetail;
