import Search from '../components/Search';
import Cart from '../components/CartLink';
import ProductCategories from '../components/Categories list';

function Home() {
  return (
    <div>
      <Search />
      <Cart />
      <ProductCategories />
    </div>
  );
}

export default Home;
