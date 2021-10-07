import React from 'react';
import Home from './components/home';

const title = "Stock Picker";

const Copyright = () => (
  <footer class="text-center text-gray-700">
    {`Copyright © ${title} ${new Date().getFullYear()}.`}
  </footer>
);
function App() {
  return (
    <React.Fragment>
      {/* <h1 className="text-3xl text-gray-700 text-center">{title}</h1> */}
      <div className="h-screen mx-10">
        <Home title={title}/>
      </div>
      <Copyright />
    </React.Fragment>
  );
}

export default App;
