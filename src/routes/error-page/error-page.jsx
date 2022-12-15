import React from 'react';
import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page">
      <h1>Error: {error.statusText || error.message}</h1>
    </div>
  );
}

export default ErrorPage;
