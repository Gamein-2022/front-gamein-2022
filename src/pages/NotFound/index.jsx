import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import "./style.scss";

function NotFound() {
  return (
    <div className="not-found">
      <Helmet>
        <title>۴۰۴ - صفحه مورد نظر پیدا نشد</title>
      </Helmet>
      ۴۰۴ - صفحه مورد نظر پیدا نشد.
      <Link to="/">رفتن به خانه</Link>
    </div>
  );
}

export default NotFound;
