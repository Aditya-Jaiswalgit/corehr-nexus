// Update this page (the content is just a fallback if you fail to update the page)

import { Navigate } from 'react-router-dom';

const Index = () => {
  // Redirect to auth page for new users
  return <Navigate to="/auth" replace />;
};

export default Index;
