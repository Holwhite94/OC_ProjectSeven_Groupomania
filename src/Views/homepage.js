import React from 'react';

import HomePageHeader from '../components/header/homepageheader';

import CreatePost from '../components/post/createpost';


import AllPosts from '../components/post/allposts';

import Footer from '../components/footer';

function HomePageView() {
    return (
 <div> 
    < HomePageHeader />
    < CreatePost />
    < AllPosts />
    < Footer />

 </div>
  );
}

export default HomePageView;