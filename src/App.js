import './App.css';
import './media.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './utils/context';
import Layout from './components/layout';
import Main from './pages/index.js';

function App() {
  return (
    <AppProvider>
      <div className="App">
        {/* <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="" element={<Main />} />        
            </Route>
          </Routes>
        </Router> */}
        <Layout>
          <Main />
        </Layout>
      </div>
    </AppProvider>    
  );
}

export default App;
