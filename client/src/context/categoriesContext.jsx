// categoriesContext.jsx
// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery, gql } from '@apollo/client';

// Define the query to fetch all categories
const GET_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
    }
  }
`;

// Create a context for categories
const CategoriesContext = createContext();

// Custom hook to use the Categories context
export const useCategories = () => {
  return useContext(CategoriesContext);
};

// Provider component
export const CategoriesProvider = ({ children }) => {
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data && data.categories) {
      setCategories(data.categories);
    }
  }, [data]);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories: {error.message}</p>;

  return (
    <CategoriesContext.Provider value={categories}>
      {children}
    </CategoriesContext.Provider>
  );
};

// Add prop validation for the CategoriesProvider component
CategoriesProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is a React node and is required
};
