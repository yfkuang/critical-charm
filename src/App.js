import './App.css';
import { OpenAIProvider } from './context/openAIContext';
import { SessionProvider } from './context/sessionContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './components/pages/landing/'

function App() {

  return (
    <div className="App">
      <OpenAIProvider>
        <SessionProvider>
          <Router>
            <Routes>
              {/* Index */}
              <Route exact path="/" element={<Index />} />
              {/* Question */}
              {/* <Route path="/:id" element={<Question />} /> */}
            </Routes>
          </Router>
        </SessionProvider>
      </OpenAIProvider>

    </div>
  );
}

export default App;
