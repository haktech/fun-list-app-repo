import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import MoviesList from "./pages/moviesList/MoviesList";
import ActorsList from "./pages/actorsList/ActorsList";
import EditMovie from "./pages/editMovie/EditMovie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewMovie from "./pages/newMovie/NewMovie";

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <MoviesList />
          </Route>
          <Route exact path="/movies">
            <MoviesList />
          </Route>
          <Route exact path="/actors">
            <ActorsList />
          </Route>
          <Route path="/movies/:id">
            <EditMovie />
          </Route>
          <Route path="/newMovie">
            <NewMovie />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
