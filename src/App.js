import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { OpenAIProvider } from './context/openAIContext';
import { SessionProvider } from './context/sessionContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './components/pages/landing/'
import Quest from './components/pages/quest';
import CreateProfile from './components/pages/createProfile';
import Profile from './components/Profile';
import { Container } from 'react-bootstrap';
import Matches from './components/pages/matches';
import Chat from './components/pages/chat';


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
                {/* Quest */}
                <Route exact path="/quest" element={<Quest />} />
                {/* Create Profile */}
                <Route exact path="/createprofile" element={<CreateProfile />} />
                {/* Profiles */}
                <Route exact path="/match" element={<Profile />} />
                {/* Profiles */}
                <Route exact path="/matches" element={<Matches />} />
                {/* Profiles */}
                <Route exact path="/chat" element={<Chat />} />
              </Routes>
            </Router>
          </Container>
        </SessionProvider>
      </OpenAIProvider>

    </div>
  );
}

export default App;
