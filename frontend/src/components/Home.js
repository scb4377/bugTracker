import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBugs } from "../Controllers/Redux/bugSlice";
import { Bugs } from "./Bugs";
import { Statistics } from "./Statistics";
import "../css/home.css";
import { fetchUsers } from "../Controllers/Redux/userSlice";

export const Home = () => {
  // Redux
  const dispatch = useDispatch();
  const { bugsList } = useSelector((state) => state.bugs);

  // set keyword for search
  const [keyword, setKeyword] = useState("");

  // set bug list to filtered list
  const [filteredBugs, setFilteredBugs] = useState([]);

  // set status for search
  const [status, setStatus] = useState("");

  let bugsListChecked;

  const checkBugsList = () => {
    if (bugsList && bugsList.length < 1) {
      bugsListChecked = true
    } else {
      bugsListChecked = true
    }

    return bugsListChecked
  }

  checkBugsList();

  // call when bugs length is less than 1
  useEffect(() => {
    dispatch(fetchBugs());
  }, [bugsListChecked, dispatch]);

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  // set keyword search term
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  // handle radio buttons for search
  const handleRadioSelection = (e) => {
    setStatus(e.target.value);
  };

  // filter bug list by search terms
  const filterBugs = (temp) => {
    let tempBugs;
    tempBugs =
      keyword !== ""
        ? temp.filter((bug) => {
            return (
              bug.details.toLowerCase().includes(keyword.toLowerCase()) ||
              bug.name.toLowerCase().includes(keyword.toLowerCase()) ||
              (bug.author.toLowerCase().includes(keyword.toLowerCase()) &&
                status !== "all" &&
                bug.status === status) ||
              bug.details.toLowerCase().includes(keyword.toLowerCase()) ||
              bug.name.toLowerCase().includes(keyword.toLowerCase())
            );
          })
        : bugsList;
    if (tempBugs.length === 0) {
      tempBugs = ["nothing"];
    }
    return tempBugs;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilteredBugs(filterBugs(bugsList));
  };

  const handleAll = () => {
    setFilteredBugs(bugsList);
  };

  const handleOpen = () => {
    setFilteredBugs(bugsList.filter((bug) => bug.status === "open"));
  };

  const handleClose = () => {
    setFilteredBugs(bugsList.filter((bug) => bug.status === "closed"));
  };

  return (
    <div className="home-wrapper">
      <Statistics
        bugs={bugsList}
        open={handleOpen}
        all={handleAll}
        close={handleClose}
      />
      <div className="search-wrapper">
        <form className="form-wrapper">
          <div className="form-group">
            <label>Keywords: </label>
            <input type="text" onChange={handleKeywordChange}></input>
          </div>
          <div className="form-group">
            <label className="radio-header">Case Status: </label>
            <div className="radio-group">
              <input
                type="radio"
                id="all"
                name="status"
                value="all"
                defaultChecked
                onChange={handleRadioSelection}
              ></input>
              <label htmlFor="all" className="first-select">
                All{" "}
              </label>
              <input
                type="radio"
                id="open"
                name="status"
                value="open"
                onChange={handleRadioSelection}
              ></input>
              <label htmlFor="open" className="first-select">
                Open
              </label>
              <input
                type="radio"
                id="closed"
                name="status"
                value="closed"
                onChange={handleRadioSelection}
              ></input>
              <label htmlFor="closed"> Closed</label>
            </div>
          </div>
          <div className="form-group dropdown-wrapper">
            <div className="dropdown-group">
              <label className="min-age-label">Min-Age: </label>
              <select id="min-age">
                <option defaultValue>--Select--</option>
                <option value="30">30days</option>
                <option value="6">6 Months</option>
                <option value="1">1 Year</option>
              </select>
            </div>
            <div className="dropdown-group">
              <label className="max-age-label">Max-Age: </label>
              <select id="max-age">
                <option defaultValue>--Select--</option>
                <option value="30">30days</option>
                <option value="6">6 Months</option>
                <option value="1">1 Year</option>
              </select>
            </div>
          </div>
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </form>
      </div>
      <Bugs bugs={filteredBugs.length === 0 ? bugsList : filteredBugs} />
    </div>
  );
};
