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
import { Redirect, Route,Switch } from 'react-router-dom';
import { BookCheckoutPage } from './components/BookCheckoutPage/BookCheckoutPage';

export const  App=() =>{
  return (
    <div className='d-flex flex-column min-vh-100'>
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
      <Route path='/checkout/:bookid'>
        <BookCheckoutPage/>
      </Route>
      </Switch>
      </div>
      
      <Footer/>
    </div>
     
  );
}

