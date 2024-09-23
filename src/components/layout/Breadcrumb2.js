import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Breadcrumb2 = () => {
  const { cat: titlex } = useParams()
  return (
    <>
      <div className="page-header mt-30 mb-50">
        <div className="container">
          <div className="archive-header">
            <div className="row align-items-center">
              <div className="col-xl-3">
                <h1 className="mb-15 text-capitalize">
                  {titlex ? titlex : 'Category'}
                </h1>
                <div className="breadcrumb">
                  <Link to="/">
                    <i className="fi-rs-home mr-5"></i>Home
                  </Link>
                  <span></span> Shop <span></span> {titlex}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Breadcrumb2
