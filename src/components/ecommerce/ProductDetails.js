/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { addToCart } from '../../redux/action/cart'
import { addToWishlist } from '../../redux/action/wishlistAction'
import ProductTab from '../elements/ProductTab'
import RelatedSlider from '../sliders/Related'

const ProductDetails = ({
  userInfo,
  product,
  wishList,
  cartItems,
  addToCart,
  addToWishlist,
  relatedProducts,
}) => {
  const [quantity, setQuantity] = useState(1)
  const handleCart = (product) => {
    if (userInfo) {
      addToCart(product, quantity)
      toast('Product added to Cart !')
    } else {
      toast('Please Login to continue !')
    }
  }

  const handleWishlist = (product) => {
    if (userInfo) {
      if (!wishList.find((item) => item.productId === product['_id'])) {
        addToWishlist(product)
        toast('Added to Wishlist !')
      } else {
        toast('Already Added To WishList !')
      }
    } else {
      toast('Please Login to continue !')
    }
  }

  const inCart = cartItems.find((cartItem) => cartItem.id === product['_id'])

  return (
    <>
      <section className="mt-50 mb-50">
        <div className="container">
          <div className="row flex-row-reverse">
            <div className="col-xl-10 col-lg-12 m-auto">
              <div className="product-detail accordion-detail">
                <div className="row mb-50  mt-30">
                  <div className="col-md-6 col-sm-12 col-xs-12 mb-md-0 mb-sm-5">
                    <div className="detail-gallery">
                      <span className="zoom-icon">
                        <i className="fi-rs-search"></i>
                      </span>

                      <div className="product-image-slider">
                        <img src={product.imageUrl} alt={product.name} />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xs-12">
                    <div className="detail-info  pr-30 pl-30">
                      <h2 className="title-detail">{product.name}</h2>

                      <div className="product-rate-cover">
                        {[...Array(5)].map((star, index) => {
                          const currentRating = index + 1

                          return (
                            <span
                              key={index}
                              style={{
                                color:
                                  currentRating <=
                                  Math.round(product.averageRating)
                                    ? '#ffc107'
                                    : '#e4e5e9',
                                fontSize: '1rem',
                                margin: '1px',
                              }}
                            >
                              &#9733;
                            </span>
                          )
                        })}
                        <span className="font-small ml-5 text-muted">
                          {' '}
                          ({Math.round(product.averageRating * 10) / 10})
                        </span>
                      </div>
                      <div className="clearfix product-price-cover">
                        <div className="product-price primary-color float-left">
                          <span className="current-price  text-brand">
                            ${product.price['$numberDecimal']}
                          </span>
                        </div>
                      </div>

                      <div className="short-desc mb-30">
                        <p className="font-lg">{product.description}</p>
                      </div>

                      <div className="bt-1 border-color-1 mt-30 mb-30"></div>
                      <div className="detail-extralink">
                        <div className="detail-qty border radius">
                          <a
                            onClick={() =>
                              setQuantity(quantity > 1 ? quantity - 1 : 1)
                            }
                            className="qty-down"
                          >
                            <i className="fi-rs-angle-small-down"></i>
                          </a>
                          <span className="qty-val">
                            {inCart?.quantity || quantity}
                          </span>
                          <a
                            onClick={() => setQuantity(quantity + 1)}
                            className="qty-up"
                          >
                            <i className="fi-rs-angle-small-up"></i>
                          </a>
                        </div>
                        <div className="product-extra-link2">
                          <button
                            onClick={() =>
                              handleCart({
                                ...product,
                                quantity: quantity || 1,
                              })
                            }
                            className="button button-add-to-cart"
                          >
                            Add to cart
                          </button>
                          <a
                            aria-label="Add To Wishlist"
                            className="action-btn hover-up"
                            onClick={() => handleWishlist(product)}
                          >
                            <i className="fi-rs-heart"></i>
                          </a>
                        </div>
                      </div>
                      <ul className="product-meta font-xs color-grey mt-50">
                        <li>
                          Availability:
                          <span className="in-stock text-success ml-5">
                            {product.availableInStock} Items In Stock
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <>
                  <ProductTab
                    productDetails={{ name: product.name, id: product['_id'] }}
                    desc={product.description}
                    vendor={product.ownerDetails[0]}
                    ratingCount={product.ratingCount}
                    reviews={product.ratingDetails}
                  />
                  <div className="row mt-60">
                    <div className="col-12">
                      <h3 className="section-title style-1 mb-30">
                        Related products
                      </h3>
                    </div>
                    <div className="col-12">
                      <div className="row related-products position-relative">
                        <RelatedSlider products={relatedProducts} />
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
  cartItems: state.cart,
  wishList: state.wishlist,
})

const mapDispatchToProps = {
  addToWishlist,
  addToCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
