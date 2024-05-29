import React from "react";
import "./Welcome.css"
import { IoIosArrowBack,IoIosArrowForward  } from "react-icons/io";

const Welcome = () => {
    return (
        <div className="welcome-container">
            <div className="welcome-box">
                <div className="left-part">
                    <div className="row-I"><h1>Welcome</h1></div>
                    <div className="row-II"><h1>to</h1></div>
                    <div className="row-III"><h1>Quizzy</h1></div>
                    <div className="row-IV">
                        <p>
                        Welcome to Quizzy! Dive into a world of knowledge and fun. Unleash your curiosity with a variety of quizzes tailored just for you. Explore diverse topics, challenge yourself, and track your progress. Get ready to embark on an exciting learning adventure. Start quizzing and discover a smarter way to learn, grow, and succeed with Quizzy!
                        </p>
                    </div>
                </div>
                <div className="right-part">
                  <img src="./online-test-animate.svg" alt="loading..." className="welcome-gif"/>
                </div>
            </div>
            <div className="feature-heading"><h1>features</h1></div>
            <div className="features">
               <div className="feature-I">
                    <div className="feature-img"><img src="./Visual data-bro.svg" alt="loading..." /></div>
                    <div className="feature-info">
                        <div className="dashboard-heading"><h1>Personlised Dashboard</h1></div>
                        <div className="content"><p>Introducing Quizzy's Dynamic Dashboard Feature! Track your learning journey seamlessly with real-time updates. Monitor quiz performance, review completed quizzes, and gain insightful progress reports. Stay motivated with personalized analytics. Experience intuitive visualization of your achievements and elevate your learning path with Quizzy's interactive dashboard.</p></div>
                    </div>
                </div>
                <div className="feature-II">
                    <div className="feature-info">
                        <div className="quiz-heading"><h1>Customizable Quiz</h1></div>
                        <div className="content"><p> Unleash your creativity with our customizable quiz maker feature. Tailor quizzes to your preferences—select topics, set difficulty levels, and even personalize questions. Craft engaging assessments suited to your audience or learning needs effortlessly. With Quizzy's intuitive tools, become the architect of your quizzes and ignite interactive learning experiences like never before.</p></div>
                    </div>
                    <div className="feature-img"><img src="./Exams-rafiki.svg" alt="loading..." /></div>
                </div>
                <div className="feature-III">
                    <div className="feature-img"><img src="./Data report-amico (2).svg" alt="loading..." /></div>
                    <div className="feature-info">
                        <div className="result-heading"><h1>Formated Result</h1></div>
                        <div className="content"><p>Check out Quizzy's new feature! Now, quiz creators can easily download quiz results as PDFs or Excel sheets. Get detailed reports in a snap, perfect for analyzing and sharing quiz outcomes. Simplify your assessment process and make informed decisions hassle-free. Quizzy gives you the tools to manage and share quiz data effortlessly, making your job as a quiz maker a breeze!</p></div>
                    </div>
                </div>
            </div>
            
            <div className="testimonial-container">
                 <div className="btn-back-forward"><IoIosArrowBack className="btn-forward"/></div>
                 <div className="testimonial-box">
                     <div className="profile-photo"> 
                        <img src="./tesimonial.jpg" alt="loading..."  className="testimonial-img"/>
                     </div>
                     <div className="testimonial">
                        <p>Quizzy transformed how I engage with learning. Fun quizzes, insightful analytics, and an intuitive interface. It's my go-to platform for knowledge and growth!</p>
                     </div>

                 </div>
                 <div  className="btn-back-forward"><IoIosArrowForward className="btn-back"/></div>
            </div>
            
        </div>
    )
}

export default Welcome;