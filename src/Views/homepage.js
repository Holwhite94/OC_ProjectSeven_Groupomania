import React, { useState, useEffect } from 'react';

//import components
import HomePageHeader from '../components/header/homepageheader';
import CreatePost from '../components/post/createpost';
import AllPosts from '../components/post/posts';
import Footer from '../components/footer';

// import fetch posts function
import getAllPosts from '../components/post/getallposts';

function HomePageView({ setLoggedIn }) {
 

   // refresh logic to be passed to child components 
 const [posts, setPosts] = useState([]);

 const refreshPosts = async () => {
    try {
      const data = await getAllPosts();
      setPosts(data);
    } catch (error) {
      console.error('There was a problem fetching the posts:', error);
    }
  };

 useEffect(() => {
    refreshPosts(); 
  }, [refreshPosts]);

  // components to be rendered and passing down functions to be used
 return (
 <div> 
    < HomePageHeader setLoggedIn={setLoggedIn} />
    < CreatePost posts={posts} refreshPosts={refreshPosts} />
    < AllPosts posts={posts} refreshPosts={refreshPosts} />
    < Footer />

 </div>
  );
}

export default HomePageView;