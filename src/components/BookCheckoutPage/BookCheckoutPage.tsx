import { useEffect, useState } from "react"
import BookModel from "../models/BookModel"
import { title } from "process";
import { StarReview } from "../Utils/StarReview";
import { CheckOutAndReviewBox } from "./CheckOutAndReviewBox";

export const BookCheckoutPage = () =>{
   const [book,setBook] = useState<BookModel>();
   const [isLoadingBook,setIsLoadingBook] = useState(true);
   const[httpError,setHttpError] = useState(null);
   const bookId = (window.location.pathname).split('/')[2];
   useEffect (()=>{
    const fetchBooks = async()=>{
      const baseUrl : string = `http://localhost:8080/api/books/${bookId}`;
      const response = await fetch(baseUrl);
      if(!response.ok){
          throw new Error('Something went wrong');
      }
      const responseJson = await response.json();
      const loadedBook : BookModel ={
        id : responseJson.id,
        title : responseJson.title,
        author : responseJson.author,
        description : responseJson.description,
        copies : responseJson.copies,
        copiesAvailable : responseJson.copiesAvailable,
        category : responseJson.category,
        img:responseJson.img
      };
      

      setBook(loadedBook);
      setIsLoadingBook(false);
    };
    fetchBooks().catch((error:any)=>{
      setIsLoadingBook(false);
      setHttpError(error.message);
    })

},[]);
if(isLoadingBook){
    return (
        <div className="container m-5">
            <p>Loading....</p>
        </div>
    )
}
if(httpError){
    return(
        <div className="container m-5">
            <p>{httpError}</p>
        </div>
    )
}
    return (
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {book ?. img ? 
                         <img src={book?.img} width='226' height='349' alt='Book'/>:
                         <img src={require('./../../Images/BookImages/book-luv2code-1000.png')} width="226" height="349" alt="Book"/>
                         }                         
                    </div>
                    <div className="col-4 col-md-4 container" >
                          <div className="ml-2">
                              <h2>{book?.title}</h2>
                              <h5 className="text-primary">{book?.author}</h5>
                              <p className="lead">{book?.description}</p>
                              <StarReview rating={4} size={32}/>
                          </div>
                    </div>
                    <CheckOutAndReviewBox book={book} mobile={false}/>
                </div>
            </div>
            <div className="container d-lg-none mt-5">
                 <div className="d-flex justify-content-center align-items-center">
                   {book ?. img ? 
                         <img src={book?.img} width='226' height='349' alt='Book'/>:
                         <img src={require('./../../Images/BookImages/book-luv2code-1000.png')} width="226" height="349" alt="Book"/>
                    } 
                 </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 className="text-primary">{book?.author}</h5>
                        <p className="lead">{book?.description}</p>
                        <StarReview rating={4} size={32}/>
                    </div>
                </div>
                <CheckOutAndReviewBox book={book} mobile={false}/>
                  <hr/>
            </div>
        </div>
    )
}