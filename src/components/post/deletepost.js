function deletePost(postId) {
    const token = localStorage.getItem('token');
  
    return fetch(`http://localhost:5000/api/auth/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to delete post');
      })
      .catch(error => {
        console.error('There was a problem deleting the post:', error);
      });
  }

 export default deletePost