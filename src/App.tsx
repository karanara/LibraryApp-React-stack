import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { ExploreTopBooks } from './components/ExploreTopBooks';
import { Carousel } from './components/Carousel';
import { Hero } from './components/Hero';
import { LibraryServices } from './components/LibraryServices';
import { Footer } from './components/Footer';
import { Homepage } from './components/Homepage';
import { SearchBooksPage } from './components/SearchBooksPage';
import { Redirect, Route,Switch ,useHistory} from 'react-router-dom';
import { BookCheckoutPage } from './components/BookCheckoutPage/BookCheckoutPage';
import { oktaConfig } from './lib/oktaConfig';
import {OktaAuth,toRelativeUrl} from '@okta/okta-auth-js';
import { LoginCallback, Security } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import { ReviewListPage } from './components/BookCheckoutPage/ReviewListPage';
const oktaAuth = new OktaAuth(oktaConfig);
export const  App=() =>{

  const customAuthHandler =() =>{
    history.push('/login');
  }
  const history= useHistory();
  const restoreOriginalUri = async(_oktaAuth:any,originalUri:any)=>{
    history.replace(toRelativeUrl(originalUri || '/',window.location.origin));
  };

  return (
    <div className='d-flex flex-column min-vh-100'>
     <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
      <Navbar/>
      <div className='flex-grow-1'>
      <Switch>
      <Route path='/' exact>
        <Redirect to='/home'/>
      </Route>
      <Route path='/home'>
        <Homepage/>
      </Route>
      <Route path='/search'>
      <SearchBooksPage/>
      </Route>
      <Route path='/reviewList/:bookId'>
        <ReviewListPage/>
      </Route>
      <Route path='/checkout/:bookid'>
        <BookCheckoutPage/>
      </Route>
      <Route path='/login' render={()=><LoginWidget config={oktaConfig}/>}/>
      <Route path='/login/callback' component={LoginCallback}/>
      </Switch>
      </div>
      
      <Footer/>
      </Security>
    </div>
     
  );
}

