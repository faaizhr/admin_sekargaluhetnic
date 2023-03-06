import './App.css';
import { BrowserRouter as Router, Route, Routes, Switch, Link } from 'react-router-dom';

import Dashboard from './Pages/Dashboard/Dashboard';
import KelolaKain from './Pages/KelolaKain/KelolaKain';
import KelolaKatalog from './Pages/KelolaKatalog/KelolaKatalog';
import KelolaPesanan from './Pages/KelolaPesanan/KelolaPesanan';

function App() {
  return (
    <Router>

      <Routes>
        <Route exact path='/' element={<Dashboard/>}/>
        <Route exact path='/kelola-kain' element={<KelolaKain/>}/>
        <Route exact path='/kelola-katalog' element={<KelolaKatalog/>}/>
        <Route exact path='/kelola-pesanan' element={<KelolaPesanan/>}/>
      </Routes>
    </Router>
  );
}

export default App;
