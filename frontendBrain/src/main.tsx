import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Signup from './Signup.tsx'
import Signin from './Signin.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sharelink from './Sharelink.tsx'

createRoot(document.getElementById('root')!).render(
    <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path = "/content/:randomstring" element={<Sharelink/>}/>
      
    </Routes>
  </Router>
)
