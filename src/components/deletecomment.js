function deleteComment(commentId) {
    const token = localStorage.getItem('token');
  
    return fetch(`http://localhost:5000/api/auth/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to delete comment');
      })
      .catch(error => {
        console.error('There was a problem deleting the comment:', error);
      });
  }
  
  export default deleteComment;