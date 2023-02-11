import { BrowserRouter, Link } from 'react-router-dom';

export const Main = () => {
  return (
      <div className='container'>
        <p> <Link to='/form'>Form</Link> </p>
        <p> <Link to='/data'>Data</Link> </p>
      </div>
  );
};
