import truckImg from "../../assets/truck.svg";
import "./style.scss";
import { Trans } from '@lingui/macro';
import { t,plural } from "@lingui/macro";
function TransportEmptyState() {
  return (
    <div className="transport-empty-state">
      <img className="transport-empty-state__img" src={truckImg} alt="truck" />
      <div className="transport-empty-state__left">
        <div className="transport-empty-state__title">
<Trans>حمل‌و‌نقل درون منطقه‌ای
</Trans>        </div>
        <div className="transport-empty-state__description">
          <Trans>کالا بلافاصله پس از خرید وارد انبار شما می‌شود.</Trans>
        </div>
      </div>
    </div>
  );
}

export default TransportEmptyState;
