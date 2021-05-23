
import  Navbar  from './components/navbar/Navbar';
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

function App() {
  // windowSizes();
  return (
    <Router basename="xd">
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
            <Redirect to={PAGE_ROUTES.home}/>
          </Route>
          <Route path={PAGE_ROUTES.signIn}  >
            <SignIn/>
          </Route>
          <Route path={PAGE_ROUTES.signUp}  >
            <SignUp/>
          </Route>
          <Route path='*' exact={true} >
            <NotFound/>
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

// function windowSizes() {
//   window.onresize = () => {
//     if (!window.matchMedia('(max-width:800px)').matches || !window.matchMedia('(max-width:600px)').matches) {
//       document.body.style.overflow = "auto";
//     }
//   };
// }

export default App;
