// import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
	// State to hold the input value
	const [inputValue, setInputValue] = useState('');
  
	// Function to handle input change
	const handleChange = (event) => {
	  setInputValue(event.target.value);
	};
  
	return (
	  <div className="App">
		<h1>React Input Example</h1>
		{/* Input box */}
		<input
		  type="text"
		  value={inputValue}
		  onChange={handleChange}
		  placeholder="Enter your input"
		/>
		{/* Displaying the input value */}
		<p>You entered: {inputValue}</p>
	  </div>
	);
  }

export default App;
