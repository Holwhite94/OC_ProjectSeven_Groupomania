// get all posts 

function getAllPosts(token) {
    return fetch("http://localhost:5000/api/auth/posts/all", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    })
      .then(response => response.json())
      .catch(error => {
        console.error('There was a problem fetching the posts:', error);
        // if error return empty array
        return [];
      });
  }

  export default getAllPosts