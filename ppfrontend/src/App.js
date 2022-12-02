import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from './Registration';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/registration' element={<Registration />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
