
import './App.css';
import { Navbar } from './components/navbar/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Home } from './components/home/Home';
import { ProductsMain } from './components/products-main/ProductsMain';
import { PAGE_ROUTES } from './models/PageRoutes';

function App() {
  // windowSizes();
  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <main>
       
          <Route path={PAGE_ROUTES.home}>
            <Home />
          </Route>
          <Route path={PAGE_ROUTES.products.all}>
            <ProductsMain/>
          </Route>
     
      </main>

    </Router>
  );
}

function windowSizes(){
  window.onresize = () => {
    if (!window.matchMedia('(max-width:800px)').matches || !window.matchMedia('(max-width:600px)').matches) {
        document.body.style.overflow = "auto";
    }
};
}

export default App;
