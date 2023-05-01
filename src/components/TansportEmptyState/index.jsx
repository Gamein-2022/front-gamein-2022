import truckImg from "../../assets/truck.svg";
import "./style.scss";

function TransportEmptyState() {
  return (
    <div className="transport-empty-state">
      <img className="transport-empty-state__img" src={truckImg} alt="truck" />
      <div className="transport-empty-state__left">
        <div className="transport-empty-state__title">
          حمل‌و‌نقل درون منطقه‌ای
        </div>
        <div className="transport-empty-state__description">
          کالا بلافاصله پس از خرید وارد انبار شما می‌شود.
        </div>
      </div>
    </div>
  );
}

export default TransportEmptyState;
