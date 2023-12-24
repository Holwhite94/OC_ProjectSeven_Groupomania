//bootstrap 
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

//react
import { Link } from 'react-router-dom';



function DropdownNav() {


// const [loggedIn, setLoggedIn] = useState(true); 

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    //  setLoggedIn(false);
    
  };

  const handleDelete = () => {
    const userId = localStorage.getItem('userId'); 
    const token = localStorage.getItem('token');

    return fetch(`http://localhost:5000/api/auth/posts/${userId}`, {
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
      <Dropdown.Item as="button">Profile</Dropdown.Item>
      <Link to="/login" onClick={handleLogout}>Logout</Link>
      <Dropdown.Item as="button"  onClick={handleDelete}>Delete account</Dropdown.Item>
    </DropdownButton>
  );
}

export default DropdownNav;