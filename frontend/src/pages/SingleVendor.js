import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Pagination from "../components/ecommerce/Pagination";
import SingleProduct from "../components/ecommerce/SingleProduct";
import Layout from "../components/layout/Layout";
import { fetchProduct } from "../redux/action/product";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Products = ({ products, productFilters, fetchProduct }) => {
  const [data, setData] = useState({ owner: {}, products: [] });
  const [storeAddress, setStoreAddress] = useState("");
  let [pages, setPages] = useState(1);
  let [currentPage, setCurrentPage] = useState(1);

  const { id } = useParams();

  useEffect(() => {
    getData()
      .then((data) => {
        console.log(data);
        setData(data);
        const address = data.owner.addresses[0];

        setStoreAddress(
          `${address.street}, ${address.city} ${address.postalCode}, ${address.state}  `
        );
        setPages(data.totalPages);
      })
      .catch((error) => {});
  }, [currentPage]);

  const getData = async () => {
    const response = await axios.get(
      `${BACKEND_URL}/owners/${id}/v1/query?pageNumber=${currentPage}`
    );
    return response.data.data;
  };

  const next = () => {
    setCurrentPage((page) => page + 1);
  };

  const prev = () => {
    setCurrentPage((page) => page - 1);
  };

  const handleActive = (item) => {
    setCurrentPage(item);
  };

  return (
    <>
      <Layout parent="Home" sub="Store  " subChild="About">
        <section className="mt-50 mb-50">
          <div className="container mb-30">
            <div className="row flex-row-reverse">
              <div className="col-lg-4-5">
                <div className="shop-product-fillter">
                  <div className="totall-product">
                    <p>
                      We found{" "}
                      <strong className="text-brand">
                        {data ? data.totalProducts : 0}
                      </strong>{" "}
                      items for you!
                    </p>
                  </div>
                  {/* <div className="sort-by-product-area">
                    <div className="sort-by-cover">
                      <SortSelect />
                    </div>
                  </div> */}
                </div>
                <div className="row product-grid">
                  {data.products.length === 0 && <h3>No Products Found </h3>}

                  {data &&
                    data.products.map((item, i) => (
                      <div
                        className="col-lg-1-5 col-md-4 col-15 col-sm-6"
                        key={i}
                      >
                        <SingleProduct product={item} fixWidth={true} />
                        {/* <SingleProductList product={item}/> */}
                      </div>
                    ))}
                </div>

                <div className="pagination-area mt-15 mb-sm-5 mb-lg-0">
                  <nav aria-label="Page navigation example">
                    <Pagination
                      currentPage={currentPage}
                      pages={pages}
                      next={next}
                      prev={prev}
                      handleActive={handleActive}
                    />
                  </nav>
                </div>
              </div>
              <div className="col-lg-1-5 primary-sidebar sticky-sidebar">
                {data.owner && (
                  <>
                    <div className="sidebar-widget widget-store-info mb-30 bg-3 border-0">
                      <div className="vendor-logo mb-30">
                        <img
                          src={`${data.owner.imageUrl}`}
                          alt={`${data.owner.firstName} ${data.owner.lastName}`}
                        />
                      </div>
                      <div className="vendor-info">
                        <h4 className="mb-5">
                          <div className="text-heading">
                            {`${data.owner.firstName} ${data.owner.lastName}`}
                          </div>
                        </h4>

                        <div className="vendor-des mb-30">
                          <p className="ont-sm text-heading">
                            {data.owner.description}
                          </p>
                        </div>
                        <div className="ollow-social mb-20">
                          <h6 className="mb-15">Follow Us</h6>
                          <ul className="social-network">
                            <li className="hover-up">
                              <a href="www.twitter.com">
                                <img
                                  src="/assets/imgs/theme/icons/social-tw.svg"
                                  alt="twitter"
                                />
                              </a>
                            </li>
                            <li className="hover-up">
                              <a href="www.facebook.com">
                                <img
                                  src="/assets/imgs/theme/icons/social-fb.svg"
                                  alt="facebook"
                                />
                              </a>
                            </li>
                            <li className="hover-up">
                              <a href="www.instagram.com">
                                <img
                                  src="/assets/imgs/theme/icons/social-insta.svg"
                                  alt="instagram"
                                />
                              </a>
                            </li>
                            <li className="hover-up">
                              <a href="www.pinterest.com">
                                <img
                                  src="/assets/imgs/theme/icons/social-pin.svg"
                                  alt="pinterest"
                                />
                              </a>
                            </li>
                          </ul>
                        </div>

                        <div className="vendor-info">
                          <ul className="ont-sm mb-20">
                            <li>
                              <img
                                className="mr-5"
                                src="/assets/imgs/theme/icons/icon-location.svg"
                                alt="location"
                              />
                              <strong>Address: </strong>{" "}
                              <span>
                                {data.owner.addresses && storeAddress}
                              </span>
                            </li>
                            <li>
                              <img
                                className="mr-5"
                                src="/assets/imgs/theme/icons/icon-contact.svg"
                                alt="contact"
                              />
                              <strong>Call Us:</strong>
                              <span>{` ${data.owner.mobile} `}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="banner-img wow fadeIn mb-lg-0 animated d-lg-block d-none">
                  <img src="/assets/imgs/banner/banner-11.png" alt="banner" />
                  <div className="banner-text">
                    <span>Oganic</span>
                    <h4>
                      Save 17% <br />
                      on <span className="text-brand">Organic</span>
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
  );
};

const mapStateToProps = (state) => ({
  products: state.products,
  productFilters: state.productFilters,
});

const mapDidpatchToProps = {
  // openCart,
  fetchProduct,
  // fetchMoreProduct,
};

export default connect(mapStateToProps, mapDidpatchToProps)(Products);
