import { Button } from 'antd';
import './stylesheets/theme.css';
import './stylesheets/alignments.css'
import './stylesheets/textelements.css'
import './stylesheets/custom-components.css'
import './stylesheets/form-elements.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './pages/common/Login';
import Register from './pages/common/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;
