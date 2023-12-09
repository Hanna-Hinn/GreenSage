import Layout from "../components/layout/Layout";

function Contact() {
  return (
    <>
      <Layout parent="Home" sub="Pages" subChild="Contact">
        <div className="page-content pt-50">
          <div className="container">
            <div className="row">
              <div className="col-xl-10 col-lg-12 m-auto">
                <section className="mb-50">
                  <div className="row">
                    <div className="col-xl-8">
                      <div className="contact-from-area padding-20-row-col">
                        <h5 className="text-brand mb-10">Contact form</h5>
                        <h2 className="mb-10">Drop Us a Line</h2>
                        <p className="text-muted mb-30 font-sm">
                          Your email address will not be published. Required
                          fields are marked *
                        </p>
                        <form
                          className="contact-form-style mt-30"
                          id="contact-form"
                          action="#"
                          method="post"
                        >
                          <div className="row">
                            <div className="col-lg-6 col-md-6">
                              <div className="input-style mb-20">
                                <input
                                  name="name"
                                  placeholder="First Name"
                                  type="text"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="input-style mb-20">
                                <input
                                  name="email"
                                  placeholder="Your Email"
                                  type="email"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="input-style mb-20">
                                <input
                                  name="telephone"
                                  placeholder="Your Phone"
                                  type="tel"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="input-style mb-20">
                                <input
                                  name="subject"
                                  placeholder="Subject"
                                  type="text"
                                />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="textarea-style mb-30">
                                <textarea
                                  name="message"
                                  placeholder="Message"
                                ></textarea>
                              </div>
                              <button
                                className="submit submit-auto-width"
                                type="submit"
                              >
                                Send message
                              </button>
                            </div>
                          </div>
                        </form>
                        <p className="form-messege"></p>
                      </div>
                    </div>
                    <div className="col-lg-4 pl-50 d-lg-block d-none">
                      <img
                        className="border-radius-15 mt-50"
                        src="assets/imgs/page/contact-2.png"
                        alt="nest"
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Contact;
