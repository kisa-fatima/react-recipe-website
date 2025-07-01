import React, { useEffect } from 'react'
import '../styles/About.css'
import SignupSection from '../components/SignupSection'
import startHerePic from '../assets/images/start-here.png'
import SearchBar from '../components/SearchBar'

const StartHere = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div>
    <div className="about-container">
      <div className="about-image-col">
        <img
          src={startHerePic}
          alt="Start Here"
          className="about-image"
        />
      </div>
      <div className="about-text-col" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <h1 className="about-title">Welcome to Pinch of Yum</h1>
        <h2 className="about-subtitle">LET'S TALK FOOD<span className="about-bold">shall we?</span></h2>
        <p className="about-desc">
          I'm the voice, author, and creator behind Pinch of Yum. What started as a casual hobby over 14 years ago in 2010 while I was working as a fourth grade teacher has now grown into a full-blown business (!!) that reaches millions of people with fun recipes each month, with content that has been featured on The Kitchn, CNN, Refinery29, Brit + Co, POPSUGAR, Huffington Post, The Everymom, PureWow, and more.
        </p>
        <p className="about-desc">
        Well, we hope that's why you're here. Our recipes are designed for real, actual, every day life, and we try to focus on real foods and healthy recipes (which honestly means a lot of different things to us, including the perfect chocolate chip cookie and cheese on cheese on cheese, because health is all about balance, right?).

This is the place to find those recipes — everything from our most popular, to meal prep, to Instant Pot recipes, or if you just, like, have some sad greens in your fridge to use up and you need some inspiration.

You're here! Have fun. We hope you find something (many things) you love.
        </p>
      </div>
      
    </div>
    <SignupSection />
    <SearchBar />
    </div>
  )
}

export default StartHere;