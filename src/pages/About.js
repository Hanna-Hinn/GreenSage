import Layout from "../components/layout/Layout";

function About() {
  return (
    <>
      <Layout parent="Home" sub="Pages" subChild="About">
        <div className="container  pt-50">
          <div className="row">
            <div className="col-xl-10 col-lg-12 m-auto">
              <section className="row align-items-center mb-50">
                <div className="col-lg-6">
                  <img
                    src="/assets/imgs/page/about-1.png"
                    alt="about1"
                    className="border-radius-15 mb-md-3 mb-lg-0 mb-sm-4"
                  />
                </div>
                <div className="col-lg-6">
                  <div className="pl-25">
                    <h2 className="mb-30">Welcome to GreenSage</h2>
                    <p className="mb-25">
                      Welcome to GreenSage, a groundbreaking mobile and web
                      platform dedicated to transforming the herb and grocery
                      shopping experience. Our user-centric approach aims to
                      revolutionize the way individuals connect with
                      high-quality, fresh herbs and groceries, fostering a
                      healthier and more sustainable lifestyle. Join us on this
                      innovative journey as we bridge the gap between consumers
                      and premium products, redefining the future of herb and
                      grocery interactions.
                    </p>
                  </div>
                </div>
              </section>
              <section className="text-center mb-50">
                <h2 className="title style-3 mb-40">What We Provide?</h2>
                <div className="row">
                  <div className="col-lg-4 col-md-6 mb-24">
                    <div className="featured-card">
                      <img
                        src="/assets/imgs/theme/icons/icon-1.svg"
                        alt="nest"
                      />
                      <h4>Best Prices & Offers</h4>
                      <p>
                        Your hub for unbeatable prices and exclusive offers on
                        top-notch herbs and groceries. Shop smart, save big!
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-24">
                    <div className="featured-card">
                      <img
                        src="/assets/imgs/theme/icons/icon-2.svg"
                        alt="nest"
                      />
                      <h4>Wide Assortment</h4>
                      <p>
                        Abundant choices, from premium herbs to essential
                        groceries, for a comprehensive and satisfying shopping
                        experience.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-24">
                    <div className="featured-card">
                      <img
                        src="/assets/imgs/theme/icons/icon-3.svg"
                        alt="nest"
                      />
                      <h4>Free Delivery</h4>
                      <p>
                        Enjoy free, hassle-free delivery of your favorite herbs
                        and groceries right to your doorstep. Simplify your
                        shopping experience with us.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-24">
                    <div className="featured-card">
                      <img
                        src="/assets/imgs/theme/icons/icon-4.svg"
                        alt="nest"
                      />
                      <h4>Easy Returns</h4>
                      <p>
                        Stress-free shopping with easy returns. Your
                        satisfaction, our priority. Shop confidently with us.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-24">
                    <div className="featured-card">
                      <img
                        src="/assets/imgs/theme/icons/icon-5.svg"
                        alt="nest"
                      />
                      <h4>100% Satisfaction</h4>
                      <p>
                        Your satisfaction guaranteed. Explore premium herbs and
                        groceries with confidence, making your shopping
                        experience truly delightful.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-24">
                    <div className="featured-card">
                      <img
                        src="/assets/imgs/theme/icons/icon-6.svg"
                        alt="nest"
                      />
                      <h4>Great Deals</h4>
                      <p>
                        Unbeatable savings, exclusive discounts, and special
                        promotions on premium herbs and groceries. Shop smart,
                        save big!
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default About;
