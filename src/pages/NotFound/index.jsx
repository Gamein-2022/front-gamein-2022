import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import "./style.scss";
import { Trans } from '@lingui/macro';
import { t,plural } from "@lingui/macro";
function NotFound() {
  return (
    <div className="not-found">
      <Helmet>
        <title>{t`۴۰۴ - صفحه مورد نظر پیدا نشد`}</title>
      </Helmet>
     <Trans> ۴۰۴ - صفحه مورد نظر پیدا نشد.</Trans>
      <Link to="/"><Trans>رفتن به خانه</Trans></Link>
    </div>
  );
}

export default NotFound;
