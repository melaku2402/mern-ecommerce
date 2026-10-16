import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsLetterBox from "../components/NewsLetterBox";
import Carousel from '../components/Carousel/CarouselEffect'
const Home = () => {
  return (
    <div>
      <Hero />
      <Carousel/>
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetterBox />
    </div>
  );
}

export default Home