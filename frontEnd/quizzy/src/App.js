


import React, { useContext } from "react";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Singup/Signup";
import { UserContextProvider, userContext } from "./Context/Context";
import Home from "./Pages/Home/Home";
import Dashboard from "./Pages/Dashboard/Dashboard";
import GiveAQuiz from "./Pages/Give a Quiz/GiveAQuiz";
import Quizpage from "./Pages/Quizpage/Quizpage";
import Welcome from "./Pages/Website/Welcome";
import Result from "./Pages/Result/Result";
import AddQuestion from "./Pages/AddQuestion/AddQuestion";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import CreateQuiz from "./Pages/CreateQuiz/CreateQuiz";
import ResultOfQuiz from "./Pages/ResultOfQuiz/ResultOfQuiz";
import QuizId from "./Pages/QuizId/QuizId";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./Pages/Profile/Profile";
import QuizAttributes from "./Pages/QuizAttributes/QuizAttributes";

function App() {

  return (
    
    <UserContextProvider>
       <BrowserRouter>
        <Routes>
          <Route  element={<Layout/>}>
            <Route path="/" element={<Welcome/>}/>
            <Route  path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            {/* <Route path="/quiz-attributes" element={<QuizAttributes/>}/> */}
            <Route path="/protected" element={<ProtectedRoute/>}>
              <Route path="home" element={<Home/>}/>
              <Route path="giveQuiz" element={<GiveAQuiz/>}/>
              <Route path="addQuestion" element={<AddQuestion/>}/>
              <Route path="dashboard" element={<Dashboard/>}/>
              <Route path="quiz-page" element={<Quizpage/>}/>
              <Route path="result" element={<Result/>}/>
              <Route path="createQuiz" element={<CreateQuiz/>}/>
              <Route path="resultOfQuiz" element={<ResultOfQuiz/>}/>
              <Route path="quiz-ID" element={<QuizId/>}/>
              <Route path="profile" element={<Profile/>}/>
              <Route path="quiz-attributes" element={<QuizAttributes/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </UserContextProvider>
  );
}

export default App;




// import React, { useContext } from "react";
// import "./App.css";
// import Layout from "./Components/Layout/Layout";
// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import Login from "./Pages/Login/Login";
// import Signup from "./Pages/Singup/Signup";
// import { UserContextProvider, userContext } from "./Context/Context";
// import Home from "./Pages/Home/Home";
// import Dashboard from "./Pages/Dashboard/Dashboard";
// import GiveAQuiz from "./Pages/Give a Quiz/GiveAQuiz";
// import Quizpage from "./Pages/Quizpage/Quizpage";
// import Welcome from "./Pages/Website/Welcome";
// import Result from "./Pages/Result/Result";
// import AddQuestion from "./Pages/AddQuestion/AddQuestion";

// function App() {

//   return (
    
//     <UserContextProvider>
//        <BrowserRouter>
//         <Routes>
//           <Route  element={<Layout/>}>
//             <Route path="/" element={<Welcome/>}/>
//             <Route path="/giveQuiz" element={<GiveAQuiz/>}/>
//             <Route exact path="/login" element={<Login/>}/>
//             <Route path="/home" element={<Home/>}/>
//             <Route path="/signup" element={<Signup/>}/>
//             <Route path="/dashboard" element={<Dashboard/>}/>
//             <Route path="/quiz-page" element={<Quizpage/>}/>
//             <Route path="/addQuestion" element={<AddQuestion/>}/>
//             <Route path="/result" element={<Result/>}/>
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </UserContextProvider>
//   );
// }

// export default App;
