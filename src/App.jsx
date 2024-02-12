import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { UserDetail, UsersList } from './containers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/users' element={<UsersList />} />
        <Route path='/user/:id' element={<UserDetail />} />
        <Route path='/' element={<Navigate to='/users' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
