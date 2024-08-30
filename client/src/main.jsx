import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import client from './apolloClient';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext';



createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </ApolloProvider>
  </AuthProvider>
) 
