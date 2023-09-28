import { useState } from 'react';
import './App.css';

function App() {
  const [stateValue, setStateValue] = useState('');
  const [res, setRes] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const handleClick = async () => {
    setIsLoading(true)
    const data = {
      "messages": [
        {
          "role": "system",
          "content": "Given the following javascript code, provide an optimized version without any explanations."
        },
        {
          "role": "user",
          "content": stateValue,
        }
      ]
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/generate_response", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let text = await new Response(res.body).text()
      if (text) {
        setRes(JSON.parse(text)?.choices[0]?.message?.content)
        setIsLoading(false)
      }
    } catch (error) {
    }
  }
  const handleChange = (e) => {
    setRes('')
    setStateValue(e.target.value)
  }
  return (
    <div className="app">
      <div className='responseHeader'>Code</div>
      <textarea type='text' placeholder='code...' onChange={(e) => handleChange(e)} />
      <div className='responseHeader'>Optimized Solution</div>
      <pre class="prettyprint" >
        {res}
      </pre>
      <button onClick={() => handleClick()}>
        {!isLoading ? "Submit" : <div className='parentSpinner'><div class="spinner"></div></div>}
      </button>
    </div>
  );
}

export default App;
