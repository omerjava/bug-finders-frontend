import React, { useEffect, useState } from "react";
import { bugApi } from "../../api-calls/bug-api-calls";
import Page from "../page/Page";
import "./Pagination.css";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";
import { pagination, updatePagination } from "../../logic/pagination";

function Pagination(props) {
  const [errorPages, setErrorPages] = useState("");
  const [allPages, setAllPages] = useState([]);
  const [displayedPages, setDisplayedPages] = useState([]);

  const { setCurrentPage, currentPage, setPageLimit, pageLimit } =
    useContext(AllContext);

  useEffect(() => {
    const getPageNumber = () => {
        
      const response = bugApi.countBugs(props.getId);

      response
        .then((res) => {
          if (res.ok) {
            setErrorPages("");
            return res.json();
          } else setErrorPages(`Sorry! Error: ${res.status} ${res.statusText}`);
        })
        .then((data) => {
          let allPages = [];
          for (let i = 1; i <= data / pageLimit + 1; i++) {
            allPages.push(i);
          }
          setAllPages(allPages);
          setDisplayedPages(pagination(allPages));
        })
        .catch((err) => setErrorPages(err.message));
    };
    getPageNumber();
  }, [pageLimit]);

  return (
    <div className="pagination">
      <div className="pages">
      <div
          className="btn"
          onClick={() => {
            setDisplayedPages(updatePagination(1, displayedPages, allPages));
            setCurrentPage(1);
          }}
        >
          First
        </div>
        <div
          className="btn"
          onClick={() => {
            if (currentPage === 1) return;
            setDisplayedPages(updatePagination((currentPage-1), displayedPages, allPages));
            setCurrentPage(currentPage - 1);
          }}
        >
          &lt;
        </div>
        <div className="pages-body">
          {displayedPages?.map((v, i) => (
            <Page
              key={i}
              value={v}
              currentPageHandle={() => {
                  setCurrentPage(v);
                  setDisplayedPages(updatePagination(currentPage, displayedPages, allPages));                  
              }}
              active={currentPage === v}
            />
          ))}
        </div>
        <div
          className="btn"
          onClick={() => {
            if (currentPage === allPages.length) return;
            setDisplayedPages(updatePagination((currentPage+1), displayedPages, allPages));
            setCurrentPage(currentPage + 1);       
          }}
        >
          &gt;
        </div>
        <div
          className="btn"
          onClick={() => {
            setDisplayedPages(updatePagination(allPages.length, displayedPages, allPages));
            setCurrentPage(allPages.length);
          }}
        >
          Last
        </div>
      </div>
      <div className="pageLimit">
        <div>Page Size: </div>
        <select
          onChange={(e) => {
            setPageLimit(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      {errorPages}
    </div>
  );
}

export default Pagination;
