import React from 'react'
import { useRouteError } from 'react-router-dom';



const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div id="error-page">
      <h1>WOAH!</h1>
      <p>Sorry, this page doesn't exist...but it can if you want it to...do you want it to?</p>
      <p>{error.statusText || error.message}</p>
    </div>
  )
}

export default ErrorPage