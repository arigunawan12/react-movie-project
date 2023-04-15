import Result from "../Components/Result";
import { useState, useEffect } from "react";
import axios from "axios";
import { logout } from "../Components/api.js";
import { Nav, NavDropdown } from "react-bootstrap";
import DarkVariantExample from "../Components/Carousel";

const key = process.env.REACT_APP_API_KEY;
const url = process.env.REACT_APP_URL;
const SEARCHAPI = `${url}search/movie?&api_key=${key}&query=`;

function Movie() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const changeTheSearch = (event) => {
    setSearch(event.target.value);
  };
  const getAllMovies = () => {
    axios
      .get(process.env.REACT_APP_API)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSearchedMovies = () => {
    // console.log(SEARCHAPI + search);
    axios
      .get(SEARCHAPI + search)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    setMovies([]);
    if (search === "") {
      getAllMovies();
    } else {
      getSearchedMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand text-light" href="/movie">
            Movies
          </a>
          <Nav className="me-auto justify-content-end" style={{ width: "100%" }}>
            <NavDropdown title={<span className="text-secondary fw-bolder bg-darlk">{localStorage.getItem("name")}</span>} id="basic-nav-dropdown" menuVariant="dark" className="text-secondary">
              <NavDropdown.Item href="#action/3.1" onClick={logout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </div>
      </nav>
      <DarkVariantExample />

      <div className="mx-auto p-3" style={{ maxWidth: "1240px", minheight: "400px", boxShadow: "black 11px 11px 23px " }}>
        <input type="text" placeholder="Search your favorite movies here" value={search} onChange={changeTheSearch} className="w-100 border border-secondary rounded-2 p-2" style={{ color: "rgb(65,114,252)" }} />
        {movies.length === 0 ? <div className="fs-2 text-center mt-2">Loading ... </div> : <Result movies={movies} />}
      </div>
    </>
  );
}

export default Movie;
