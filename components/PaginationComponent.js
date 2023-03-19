import React from 'react'

const PaginationComponent = ({ totalCountry, countryPerPage, currentPage, setCurrentPage}) => {
  let pages = [];
  for (let p = 1; p <= Math.ceil(totalCountry / countryPerPage); p++) {
    pages.push(p);
  }

  return (
    <>
      <nav aria-label="navigation pagin">
        <ul className="pagination">
          {pages.map((pagin, idx) => {
            return <li className="page-item mr-1" key={idx}><a className={`page-link ${pagin == currentPage ? 'active': ''}`} onClick={() => setCurrentPage(pagin)}>{pagin}</a></li>
          })}
        </ul>
      </nav>
    </>
  )
}

export default PaginationComponent
