import { Carousel } from "./Carousel"
import { ExploreTopBooks } from "./ExploreTopBooks"
import { Hero } from "./Hero"
import { LibraryServices } from "./LibraryServices"

export const Homepage = ()=>{
    return (
        <>
        <ExploreTopBooks/>
      <Carousel/>
      <Hero/>
      <LibraryServices/>
        </>
    )
}