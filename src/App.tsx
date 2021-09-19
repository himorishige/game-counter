import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Page404 from './pages/Page404';
import UserPage from './pages/UserPage';

const App: React.VFC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route
          path="/data"
          render={({ match: { url } }) => (
            <Switch>
              <Route exact path={url} render={() => <Redirect to="/" />} />
              <Route path={`${url}/:userId`} component={UserPage} />
              <Route path={`${url}/*`}>
                <Page404 />
              </Route>
            </Switch>
          )}
        />
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <Page404 />
        </Route>
      </Switch>
      <Header />
    </BrowserRouter>
  );
};

export default App;
