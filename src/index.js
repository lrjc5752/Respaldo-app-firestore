import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';




ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



/*const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));*/

/*function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}
setInterval(tick, 1000);*/

/* export default function App() {
  const element = (
    <div className="App">
      <h1>Hello, there!</h1>
      <h2>Let's take a look inside React elements</h2>
    </div>
  );

  console.log(element);
  return element;
}*/

