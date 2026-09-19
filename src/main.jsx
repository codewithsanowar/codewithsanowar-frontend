import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserContextProvider } from './context/UserContext.jsx'
import { CourseContextProvider } from './context/CourseContext.jsx'


const configuredServer =
  import.meta.env.VITE_API_URL || "localhost:5000";
export const server = configuredServer.replace(/\/+$/, "");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>  
      <CourseContextProvider>
        <App />
      </CourseContextProvider>
  </UserContextProvider>
  </StrictMode>,
);
