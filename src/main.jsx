import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailView from "./routes/DetailView.jsx"
import SideNav from './routes/SideNav.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SideNav />}>
        <Route index={true} element={<App />} />
        <Route index={false} path="/brewDetails/:id" element={<DetailView />} />
        <Route path="*" element={
          <div>
            <p className="message">There's nothing here!</p>
          </div>
        }
        />
      </Route>
    </Routes>
  </BrowserRouter>
)
