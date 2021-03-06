
import Navbar from './components/navbar/Navbar';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Home } from './components/home/Home';

import { PAGE_ROUTES } from './models/PageRoutes';
import ProductsMain from './components/products-main/ProductsMain';
import ProductView from './components/product-view/ProductView';
import NotFound from './components/notfound/NotFound';
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp';
import Favorites from './components/favorites/Favorites';
import Cart from './components/cart/Cart';
import { Provider } from 'react-redux';
import store from './redux/store/Store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
        </div>
        <main>
          <Switch>
            <Route exact path={PAGE_ROUTES.home}>
              <Home />
            </Route>
            <Route
              exact path={PAGE_ROUTES.products.sectionParams}
              render={(props) => (
                <ProductsMain key={window.location.pathname} />)} />
            <Route
              exact path={PAGE_ROUTES.products.productParams}
              render={(props) => (
                <ProductView key={window.location.pathname} />)} />
            <Route exact path="/">
              <Redirect to={PAGE_ROUTES.home} />
            </Route>
            <Route path={PAGE_ROUTES.signIn}  >
              <SignIn />
            </Route>
            <Route path={PAGE_ROUTES.signUp}  >
              <SignUp />
            </Route>
            <Route path={PAGE_ROUTES.favorites} >
              <Favorites />
            </Route>
            <Route path={PAGE_ROUTES.cart} >
              <Cart />
            </Route>
            <Route path='*' exact={true} >
              <div className ="flex flex-col w-full items-center justify-center below-navbar min-h-offset">
              <NotFound />
              </div>
            </Route>
          </Switch>
        </main>
      </Router>
    </Provider>

  );
}


export default App;
