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

export const  App=() =>{
  return (
    <div>
      <Navbar/>
      <SearchBooksPage/>
      <Footer/>
    </div>
     
  );
}

