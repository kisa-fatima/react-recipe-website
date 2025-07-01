import React, { useEffect } from 'react'
import '../styles/About.css'
import lindsayKitchen from '../assets/images/home-lindsay-kitchen.png'
import SignupSection from '../components/SignupSection'
import lindsayAbout from '../assets/images/lindsay-hero.png'

const About = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div>
    <div className="about-container">
      <div className="about-image-col">
        <img
          src={lindsayAbout}
          alt="Lindsay smiling with a bowl"
          className="about-image"
        />
      </div>
      <div className="about-text-col">
        <h1 className="about-title">About Me</h1>
        <h2 className="about-subtitle">HI, MY NAME IS <span className="about-bold">lindsay!</span></h2>
        <p className="about-intro">And Pinch of Yum is my little corner of the internet!</p>
        <p className="about-desc">
          I'm the voice, author, and creator behind Pinch of Yum. What started as a casual hobby over 14 years ago in 2010 while I was working as a fourth grade teacher has now grown into a full-blown business (!!) that reaches millions of people with fun recipes each month, with content that has been featured on The Kitchn, CNN, Refinery29, Brit + Co, POPSUGAR, Huffington Post, The Everymom, PureWow, and more.
        </p>
        <p className="about-desc">
          I live in Saint Paul, MN with my husband Bjork and our dog Sage. My favorite things in life are a big plate of pad Thai, sunny days, and going to the dog park.
        </p>
      </div>
      
    </div>
    <SignupSection />
    </div>
  )
}

export default About;