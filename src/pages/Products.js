import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Breadcrumb2 from '../components/layout/Breadcrumb2'
import CategoryProduct from './../components/ecommerce/Filter/CategoryProduct'
import Pagination from './../components/ecommerce/Pagination'
import SingleProduct from './../components/ecommerce/SingleProduct'
import Layout from './../components/layout/Layout'
import { fetchProduct, searchProducts } from './../redux/action/product'
import { BACKEND_URL } from './../config/index'

const Products = ({ products, totalPages, totalProducts, searchProducts }) => {
  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const searchTerm = urlParams.get('search')
  const categoryName = urlParams.get('cat')
  const description = urlParams.get('desc')
  const ownerName = urlParams.get('vendor')
  let [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const url = `${BACKEND_URL}/products/v1/searchFilter/v1/query?${
      categoryName ? `categoryName=${categoryName}&` : ''
    }${searchTerm ? `productName=${searchTerm}&` : ''}${
      searchTerm ? `description=${searchTerm}&` : ''
    }${ownerName ? `ownerName=${ownerName}&` : ''}pageNumber=${currentPage}`
    searchProducts(url)
  }, [currentPage, searchTerm, categoryName, description, ownerName])

  const next = () => {
    setCurrentPage((page) => page + 1)
  }

  const prev = () => {
    setCurrentPage((page) => page - 1)
  }

  const handleActive = (item) => {
    setCurrentPage(item)
  }

  return (
    <>
      <Layout noBreadcrumb="d-none">
        <Breadcrumb2 />
        <section className="mt-50 mb-50">
          <div className="container mb-30">
            <div className="row flex-row-reverse">
              <div className="col-lg-4-5">
                <div className="shop-product-fillter">
                  <div className="totall-product">
                    <p>
                      We found{' '}
                      <strong className="text-brand">
                        {totalProducts ? totalProducts : 0}
                      </strong>{' '}
                      items for you!
                    </p>
                  </div>
                </div>
                <div className="row product-grid">
                  {totalProducts === 0 && <h3>No Products Found </h3>}

                  {products &&
                    products.items.map((item, i) => (
                      <div
                        className="col-lg-1-5 col-md-4 col-12 col-sm-6"
                        key={i}
                      >
                        <SingleProduct product={item} />
                      </div>
                    ))}
                </div>

                <div className="pagination-area mt-15 mb-sm-5 mb-lg-0">
                  <nav aria-label="Page navigation example">
                    <Pagination
                      currentPage={currentPage}
                      pages={totalPages}
                      next={next}
                      prev={prev}
                      handleActive={handleActive}
                    />
                  </nav>
                </div>
              </div>
              <div className="col-lg-1-5 primary-sidebar sticky-sidebar">
                <div className="sidebar-widget widget-category-2 mb-30">
                  <h5 className="section-title style-1 mb-30">Category</h5>
                  <CategoryProduct />
                </div>

                <div className="banner-img wow fadeIn mb-lg-0 animated d-lg-block d-none">
                  <img src="/assets/imgs/banner/banner-11.png" alt="nest" />
                  <div className="banner-text">
                    <span>Oganic</span>
                    <h4>
                      Save 17% <br />
                      on <span className="text-brand">Oganic</span>
                      <br />
                      Juice
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

const mapStateToProps = (state) => ({
  products: state.products,
  productFilters: state.productFilters,
  totalPages: state.products.totalPages,
  totalProducts: state.products.totalProducts,
})

const mapDispatchToProps = {
  fetchProduct,
  searchProducts,
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
