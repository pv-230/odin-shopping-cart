import { useRouteError } from 'react-router-dom';

function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page">
      <h1>Error: {error.statusText || error.message}</h1>
    </div>
  );
}

export default Error;
