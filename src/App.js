import logo from './logo.svg';
import './App.css';

function App() {

  return (
    <div className="App">

      <AnswerProvider>
        <Router>
          <Routes>
            {/* Index */}
            <Route exact path="/" element={<Index />} />
            {/* Question */}
            <Route path="/:id" element={<Question />} />
          </Routes>
        </Router>
      </AnswerProvider>

    </div>
  );
}

export default App;
