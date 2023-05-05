import Helmet from "react-helmet";
import "./style.scss";
import { Trans } from '@lingui/macro';
import { t } from "@lingui/macro";
function History() {
  return (
    <div>
      <Helmet>
        <title>
{t`تاریخچه
`}
        </title>
      </Helmet>
      History
    </div>
  );
}

export default History;
