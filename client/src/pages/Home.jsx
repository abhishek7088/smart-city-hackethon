import React from 'react'
import HeroSection from '../sections/HeroSection'
import FeaturesSection from '../sections/features'
import Feedback from '../sections/feedback'


const Home = () => {
  return (
    <div className="w-full h-full flex flex-col bg-background text-text overflow-x-hidden ">
    
    <HeroSection/>
    <FeaturesSection/>
    <Feedback/>
    
    </div>
  )
}

export default Home