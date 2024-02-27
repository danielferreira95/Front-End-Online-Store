// import { useEffect } from 'react';
// import { getCategories, getProductsFromCategoryAndQuery } from './services/api';
import { Route, Routes } from 'react-router-dom';
import './App.css';
// import { Link } from 'react-router-dom';
import Home from './pages/Home';
import ScreenCart from './pages/ScreenCart';

function App() {
  // Pessoal, essa função não será usada no projeto. Só foi criada porque eu queria ver o retorno das funções do req 01.
  // no console. Preferi não apagá-la pq se algum de nós quisermos usar ela em algum momento durante o desenvolvimento do projeto, é só
  // descomentar ela e os imports do useEffect e das funções getCategories e getProductsFromCategoryAndQuery.
  // Att, Raisa.
/*   useEffect(() => {
    async function fetchData() {
      const categories = await getProductsFromCategoryAndQuery();
      console.log(categories);
    }

    fetchData();
  }, []); */

  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/cart" element={ <ScreenCart /> } />
    </Routes>

  );
}

export default App;
