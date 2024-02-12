import {
  Avatar,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// To authenticate
localStorage.setItem('access_token', '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');
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
axios.defaults.headers.common['Accept'] = `application/vnd.github+json`;
axios.defaults.headers.common['X-GitHub-Api-Version'] = `2022-11-28`;

const ListComponent = () => {
  const rowsPerPage = 8;
  const [loading, setLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);
  const [page, setPage] = useState(1);
  const [cachedUsers, setCachedUsers] = useState({}); // Store fetched users data
  const navigate = useNavigate();

  const getUsersList = async () => {
    try {
      const last_id = page > 1 ? cachedUsers[page - 1][rowsPerPage - 1].id : 0;
      const response = await axios.get(
        `https://api.github.com/users?per_page=${rowsPerPage}&since=${last_id}`,
      );
      if (response.data.length > 0) {
        // Fetch additional information for each user
        const detailedUserPromises = response.data.map(async (user) => {
          const userDetailsResponse = await axios.get(user.url);
          const userDetails = await userDetailsResponse;
          return { ...user, ...userDetails.data };
        });

        // Wait for all detailed user requests to complete
        const detailedUsers = await Promise.allSettled(detailedUserPromises);

        // Format user data
        const usersData = detailedUsers.map((detailedUser) =>
          detailedUser.status === 'fulfilled' ? detailedUser.value : {},
        );

        // Update users state with detailed user information
        setUsersList(usersData);

        // Store fetched users data in the cachedUsers state
        setCachedUsers((prevState) => ({
          ...prevState,
          [page]: usersData,
        }));
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let isMounted = true;
    // Check if users for the current page are already cached
    if (cachedUsers[page]) {
      setUsersList(cachedUsers[page]);
      setLoading(false);
    } else {
      setLoading(true);
      getUsersList();
    }
    return () => {
      isMounted = false;
    };
  }, [page, cachedUsers, loading]);

  // Navigate to details page for the selected user
  const handleClick = (user) => {
    navigate(`/user/${user.login}`, {
      state: user,
    });
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <Typography variant='h4' gutterBottom align='center'>
        GitHub Users
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {usersList?.map((user) => (
            <ListItemButton key={user.id}>
              <ListItem key={user.id} onClick={() => handleClick(user)}>
                <ListItemAvatar>
                  <Avatar alt={user.login} src={user.avatar_url} />
                </ListItemAvatar>
                <ListItemText primary={`${user.login}`} secondary={`${user.name || '-'}`} />
              </ListItem>
            </ListItemButton>
          ))}
        </List>
      )}
      <div style={{ marginTop: '20px' }}>
        <Button onClick={handlePrevPage} disabled={page === 1}>
          Previous Page
        </Button>
        <Button onClick={handleNextPage}>Next Page</Button>
      </div>
    </div>
  );
};

export default ListComponent;
