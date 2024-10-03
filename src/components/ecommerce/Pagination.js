import React from "react";
// import "./styles.css";

function Pagination({ prev, currentPage, next, pages, handleActive }) {
  return (
    <>
      <ul className="pagination justify-content-start">
        {pages <= 0 ? null : (
          <li onClick={prev} className="page-item">
            {currentPage === 1 ? null : (
              <a className="page-link">
                <i className="fi-rs-angle-double-small-left"></i>
              </a>
            )}
          </li>
        )}

        {[...Array(pages)].map((item, index) => {
          return (
            <li
              onClick={() => handleActive(index + 1)}
              key={index}
              className={currentPage === index + 1 ? "page-item active" : "page-item"}
            >
              <a className="page-link">{index + 1}</a>
            </li>
          );
        })}

        {pages <= 0 ? null : (
          <li onClick={next} className="page-item">
            {currentPage >= pages ? null : (
              <a className="page-link">
                <i className="fi-rs-angle-double-small-right"></i>
              </a>
            )}
          </li>
        )}
      </ul>

      {pages <= 0 ? null : (
        <p>
          show {currentPage} of {pages}
        </p>
      )}
    </>
  );
}

export default Pagination;
