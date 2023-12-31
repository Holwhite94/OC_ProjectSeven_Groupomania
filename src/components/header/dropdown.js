//bootstrap 
// import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

//react
import { Link } from 'react-router-dom';



function DropdownNav() {



  const handleLogout = () => {
    localStorage.removeItem('token'); 
    
  };

  const handleDeleteAccount = () => {
    const userId = localStorage.getItem('userId'); 
    const token = localStorage.getItem('token');

    return fetch(`http://localhost:5000/api/auth/user/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.ok) {
          console.log('Account deleted!');
          localStorage.removeItem('token');

        } else {
          throw new Error('Account deletion failed');
        }
      })
      .catch((error) => {
        console.error('Error deleting account:', error);
        
      });
  };

  return (
    <DropdownButton id="dropdown-item-button" title=". . .">
      <Link to="#">Profile</ Link>
      <Link to="/login" onClick={handleLogout}>Logout</Link>
      <Link to="/signup"  onClick={handleDeleteAccount}>Delete account</Link>
    </DropdownButton>
  );
}

export default DropdownNav;