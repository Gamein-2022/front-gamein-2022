import { Link } from "react-router-dom";
import "./style.scss";

function NotFound() {
  return (
    <div className="not-found">
      صفحه مورد نظر پیدا نشد.
      <Link to="/">رفتن به خانه</Link>
    </div>
  );
}

export default NotFound;
