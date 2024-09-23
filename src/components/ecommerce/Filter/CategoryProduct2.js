// eslint-disable jsx-a11y/anchor-is-valid
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateProductCategory } from '../../../redux/action/productFiltersAction'

const CategoryProduct2 = ({ updateProductCategory }) => {
  const navigate = useNavigate()

  const selectCategory = (e, category) => {
    e.preventDefault()
    updateProductCategory(category)
    navigate(`/products?cat=${category}`)
  }
  return (
    <>
      <ul>
        <li onClick={(e) => selectCategory(e, 'Herbs')}>
          <a>
            <img src="/assets/imgs/theme/icons/category-8.svg" alt="herbs" />
            Herbs
          </a>
        </li>
        <li onClick={(e) => selectCategory(e, 'Vegetables')}>
          <a>
            <img
              src="/assets/imgs/theme/icons/category-9.svg"
              alt="vegetables"
            />
            Vegetables
          </a>
        </li>
        <li onClick={(e) => selectCategory(e, 'Fruits')}>
          <a>
            <img src="/assets/imgs/theme/icons/category-7.svg" alt="fruits" />
            Fruits
          </a>
        </li>
        <li onClick={(e) => selectCategory(e, 'Others')}>
          <a>
            <img src="/assets/imgs/theme/icons/category-1.svg" alt="others" />
            Others
          </a>
        </li>
      </ul>
    </>
  )
}

export default connect(null, { updateProductCategory })(CategoryProduct2)
