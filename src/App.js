import './App.css';
import { BrowserRouter as Router, Route, Routes, Switch, Link } from 'react-router-dom';


import Dashboard from './Pages/Dashboard/Dashboard';
import KelolaKain from './Pages/KelolaKain/KelolaKain';
import KelolaKatalog from './Pages/KelolaKatalog/KelolaKatalog';
import KelolaPesanan from './Pages/KelolaPesanan/KelolaPesanan';
import DetailKelolaPesanan from './Pages/KelolaPesanan/DetailKelolaPesanan';
import KelolaPesananJahit from './Pages/KelolaPesananJahit/KelolaPesananJahit';
import DetailKelolaPesananJahit from './Pages/KelolaPesananJahit/DetailKelolaPesananJahit';
import KelolaReturBarang from './Pages/KelolaReturBarang/KelolaReturBarang';
import Login from './Pages/Login/Login';

import { PrivateRoute } from "./PrivateRoute";

function App() {
  return (
    <Router>

      <Routes>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/' element={<PrivateRoute/>}>
          <Route exact path='/' element={<Dashboard/>}/>
          <Route exact path='/kelola-kain' element={<KelolaKain/>}/>
          <Route exact path='/kelola-katalog' element={<KelolaKatalog/>}/>
          <Route exact path='/kelola-pesanan-pakaian' element={<KelolaPesanan/>}/>
          <Route exact path='/kelola-pesanan-pakaian/:id' element={<DetailKelolaPesanan/>}/>
          <Route exact path='/kelola-pesanan-jahit' element={<KelolaPesananJahit/>}/>
          <Route exact path='/kelola-pesanan-jahit/:id' element={<DetailKelolaPesananJahit/>}/>
          <Route exact path='/kelola-retur-barang' element={<KelolaReturBarang/>}/>
        </Route>
      </Routes> 
    </Router>
  );
}

export default App;
