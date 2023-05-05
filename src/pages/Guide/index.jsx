import Helmet from "react-helmet";
import "./style.scss";
import { Trans } from '@lingui/macro';
import { t,plural } from "@lingui/macro";
function Guide() {
  return (
    <div>
      <Helmet>
        <title>
{t`راهنما`}
        </title>
      </Helmet>
      Guide
    </div>
  );
}

export default Guide;
