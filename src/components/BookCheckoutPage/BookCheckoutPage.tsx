import { useEffect, useState } from "react"
import BookModel from "../models/BookModel"
import { title } from "process";
import { StarReview } from "../Utils/StarReview";
import { CheckOutAndReviewBox } from "./CheckOutAndReviewBox";
import ReviewModel from "../models/ReviewModel";
import { LatestReviews } from "./LatestReviews";
import { useOktaAuth } from "@okta/okta-react";

export const BookCheckoutPage = () =>{
    const {authState} = useOktaAuth();
   const [book,setBook] = useState<BookModel>();
   const [isLoadingBook,setIsLoadingBook] = useState(true);
   const[httpError,setHttpError] = useState(null);
   const bookId = (window.location.pathname).split('/')[2];
   //checkout state
   const [currentLoansCount,setCurrentLoansCount] = useState(0);
   const [isLoadingCurrentLoans,setIsLoadingCurrentLoans] = useState(true);
   //Review State
   const [reviews,setReviews] = useState<ReviewModel[]>([]);
   const [totalStars,setTotalStars]= useState(0);
   const [isLoadingReview,setIsLoadingReview]=useState(true);
   useEffect (()=>{
    const fetchBooks = async()=>{
        const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;
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
useEffect(()=>{
    const fetchBookReviews = async()=>{
        const reviewUrl: string= `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;
        const responseReviews= await fetch(reviewUrl);
        if(!responseReviews.ok){
            throw new Error('Something went wrong');
        }
        const responseJsonReviews = await responseReviews.json();
        const responseData = responseJsonReviews._embedded.reviews;
        const loadedReviews: ReviewModel[]=[];
        let weightedStarReviews:number=0;
        for(const key in responseData){
            loadedReviews.push({
                id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    book_id: responseData[key].bookId,
                    reviewDescription: responseData[key].reviewDescription,
            })
            weightedStarReviews = weightedStarReviews + responseData[key].rating;
        }
        if (loadedReviews) {
            const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
            setTotalStars(Number(round));
        }
        setReviews(loadedReviews);
        setIsLoadingReview(false);
        };
        fetchBookReviews().catch((error:any)=>{
            setIsLoadingReview(false);
            setHttpError(error.message);
        })
},[]);
useEffect(()=>{
    const fetchUserCurrentLoansCount = async ()=>{
        if(authState && authState.isAuthenticated){
            const url ='http://localhost:8080/api/books/secure/currentLoans/count';
            const requestOptions = {
                method :'GET',
                headers :{
                    Authorization :`Bearer ${authState.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
                }
            };
            const currentLoansCountResponse = await fetch(url,requestOptions);
            if(!currentLoansCountResponse.ok){
                throw new Error('Something went wrong');
            }
            const currentLoansCountResponseJson = await currentLoansCountResponse.json();
            setCurrentLoansCount(currentLoansCountResponseJson);
        }
        setIsLoadingCurrentLoans(false);
    }
    fetchUserCurrentLoansCount().catch((error:any)=>{
        setIsLoadingCurrentLoans(false);
        setHttpError(error.message);
    })
})
if(isLoadingBook || isLoadingReview || isLoadingCurrentLoans){
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
                              <StarReview rating={totalStars} size={32}/>
                          </div>
                    </div>
                    <CheckOutAndReviewBox book={book} mobile={false} currentLoansCount={currentLoansCount}/>
                </div>
                <hr/>
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
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
                        <StarReview rating={totalStars} size={32}/>
                    </div>
                </div>
                <CheckOutAndReviewBox book={book} mobile={false} currentLoansCount={currentLoansCount}/>
                  <hr/>
                  <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
            </div>
        </div>
    )
}