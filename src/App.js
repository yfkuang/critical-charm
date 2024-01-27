import './App.css';
import { OpenAIProvider } from './context/openAIContext';
import { SessionProvider } from './context/sessionContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './components/pages/landing/'
import { Container } from 'react-bootstrap';

function App() {

  return (
    <div className="App">

      <OpenAIProvider>
        <SessionProvider>
          <Container fluid>
            <Router>
              <Routes>
                {/* Index */}
                <Route exact path="/" element={<Index />} />
                {/* Question */}
                {/* <Route path="/:id" element={<Question />} /> */}
              </Routes>
            </Router>
          </Container>
        </SessionProvider>
      </OpenAIProvider>

    </div>
  );
}

export default App;
