import { PlayArrow, RecentActors, AddCircle } from "@material-ui/icons";
import { Link } from "react-router-dom";

import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Lists</h3>
          <ul className="sidebarList">
            <Link to="/movies" className="routerLink">
              <li className="sidebarListItem active">
                <PlayArrow className="sidebarIcon" />
                Movies
              </li>
            </Link>
            <Link to="/actors" className="routerLink">
              <li className="sidebarListItem">
                <RecentActors className="sidebarIcon" />
                Actors
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Submit Forms</h3>
          <ul className="sidebarList">
            <Link to="/newMovie" className="routerLink">
              <li className="sidebarListItem">
                <AddCircle className="sidebarIcon" />
                New movie
              </li>
            </Link>
            <Link className="routerLink">
              <li className="sidebarListItem">
                <AddCircle className="sidebarIcon" />
                New actor
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
