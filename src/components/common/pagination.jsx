import React from 'react'
import PropTypes from 'prop-types';
import _ from 'lodash';

// interface : 
// 1. input ? 
// 2. event going to raised ? => when we click, then on page change


const Pagination = (props) => {

  const { itemsCount , pageSize, onPageChange, currentPage} = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  // array of page numbers( number of item and pagesize), and we map through
  // how we get the array of [1 ... pageCount].map()
  // we generate new array using lodash
  // if page only 1 then we dont want to render,(doesnt show any page)

  if(pagesCount === 1) return null;
  const pages = _.range(1, pagesCount+1);
  return (
  <nav>
    <ul className='pagination'>
      {pages.map( page => (
        <li 
          key={page} 
          className={page === currentPage ? 'page-item active' : 'page-item'}>
            <a  className="page-link" onClick={ () => onPageChange(page)}>
              {page}
            </a>
        </li>
      ))}
    </ul>
  </nav>);
}
 

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired, 
  currentPage: PropTypes.number.isRequired
}

export default Pagination;