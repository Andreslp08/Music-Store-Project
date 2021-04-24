
import './App.css';
import { Navbar } from './components/navbar/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Home } from './components/home/Home';

import { PAGE_ROUTES } from './models/PageRoutes';
import ProductsMain from './components/products-main/ProductsMain';

function App() {
  // windowSizes();
  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <main>
        <Switch>
          <Route exact path={PAGE_ROUTES.home}>
            <Home />
          </Route>
          <Route exact path={PAGE_ROUTES.products.sectionParams} render={(props) => (
            <ProductsMain key={window.location.pathname} />)
          } />
        </Switch>
      </main>



    </Router>
  );
}

function windowSizes() {
  window.onresize = () => {
    if (!window.matchMedia('(max-width:800px)').matches || !window.matchMedia('(max-width:600px)').matches) {
      document.body.style.overflow = "auto";
    }
  };
}

export default App;
