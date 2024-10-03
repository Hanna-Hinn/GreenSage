import { Link } from "react-router-dom";

const Breadcrumb = ({ parent, sub, subChild, noBreadcrumb }) => {
  return (
    <>
      <div className={`page-header breadcrumb-wrap ${noBreadcrumb}`}>
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">{parent}</Link>
            <span></span> {sub}
            <span></span> {subChild}
          </div>
        </div>
      </div>
    </>
  );
};

export default Breadcrumb;
