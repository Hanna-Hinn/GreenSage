import CategoryTab from "../components/ecommerce/categoryTab";
import FetchTabSlider from "../components/ecommerce/fetchTabSlider";
import Bottom from "../components/elements/Bottom";
import Banner5 from "./../components/elements/Banner5";
import Layout from "./../components/layout/Layout";
import Intro1 from "./../components/sliders/Intro1";

export default function Home() {
  return (
    <>
      <Layout noBreadcrumb="d-none">
        <section className="home-slider position-relative mb-30">
          <div className="container">
            <div className="home-slide-cover mt-30">
              <Intro1 />
            </div>
          </div>
        </section>

        <section className="banners mb-25">
          <div className="container">
            <div className="row">
              <Banner5 />
            </div>
          </div>
        </section>

        <section className="product-tabs section-padding position-relative">
          <div className="container">
            <div className="col-lg-12">
              <CategoryTab />
            </div>
          </div>
        </section>

        <section className="section-padding pb-5">
          <div className="container">
            <FetchTabSlider />
          </div>
        </section>

        <Bottom />
      </Layout>
    </>
  );
}
