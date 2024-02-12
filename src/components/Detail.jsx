import styled from '@emotion/styled';
import { Typography, Grid, Avatar, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const StyledAvatar = styled(Avatar)`
  && {
    width: 100px;
    height: 100px;
    margin: auto;
  }
`;

const UserDetailItem = styled(ListItem)`
  && {
    padding: 8px 0;
  }
`;

const UserDetailText = styled(Typography)`
  && {
    margin-bottom: 8px;
  }
`;

const StyledLink = styled(Link)`
  && {
    color: #1976d2;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Detail = ({ user }) => {
  return (
    <div>
      <Typography variant='h4' gutterBottom align='center'>
        User Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <StyledAvatar alt={user.login} src={user.avatar_url} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant='h5' gutterBottom>
            {user.name || user.login}
          </Typography>
          <UserDetailText variant='body1'>
            <strong>Company:</strong> {user.company || 'N/A'}
          </UserDetailText>
          <UserDetailText variant='body1'>
            <strong>Bio:</strong> {user.bio || 'N/A'}
          </UserDetailText>
          <List>
            <UserDetailItem>
              <ListItemText primary={<strong>Followers:</strong>} secondary={user.followers} />
            </UserDetailItem>
            <UserDetailItem>
              <ListItemText primary={<strong>Following:</strong>} secondary={user.following} />
            </UserDetailItem>
            <UserDetailItem>
              <ListItemText
                primary={<strong>Public Repositories:</strong>}
                secondary={user.public_repos}
              />
            </UserDetailItem>
          </List>
          <UserDetailText variant='body1'>
            <strong>Location:</strong> {user.location || 'N/A'}
          </UserDetailText>
          {user.blog && (
            <UserDetailText variant='body1'>
              <strong>Website:</strong> <StyledLink to={user.blog}>{user.blog}</StyledLink>
            </UserDetailText>
          )}
          {user.twitter_username && (
            <UserDetailText variant='body1'>
              <strong>Twitter:</strong>{' '}
              <StyledLink to={`https://twitter.com/${user.twitter_username}`}>
                @{user.twitter_username}
              </StyledLink>
            </UserDetailText>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

Detail.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string,
    company: PropTypes.string,
    bio: PropTypes.string,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    public_repos: PropTypes.number.isRequired,
    location: PropTypes.string,
    blog: PropTypes.string,
    twitter_username: PropTypes.string,
    followers_url: PropTypes.string,
    following_url: PropTypes.string,
    repos_url: PropTypes.string,
  }).isRequired,
};

export default Detail;
