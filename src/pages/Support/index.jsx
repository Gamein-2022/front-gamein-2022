import classNames from "classnames";
import { useState } from "react";
import Helmet from "react-helmet";
import ProductsBOM from "./components/ProductsBOM";
import GameGuide from "./components/GameGuide";
import "./style.scss";
import { Trans } from '@lingui/macro';
import { t,plural } from "@lingui/macro";
const SUPPORT_TABS = {
  productsBOM: "products-bom",
  gameGuide: "game-guide",
};
function Support() {
  const [activeTab, setActiveTab] = useState(SUPPORT_TABS.productsBOM);
  return (
    <>
      <Helmet>
        <title>
          {t`راهنما`}

        </title>
      </Helmet>
      <div className="support">
        <div className="support__right">
          <div className="support__right-top">
            <div className="support__right-top-header">
<Trans>راهنما
</Trans>
              </div>
            <div
              className={classNames("support__right-top-item", {
                "support__right-top-item--active":
                  activeTab === SUPPORT_TABS.productsBOM,
              })}
              onClick={() => setActiveTab(SUPPORT_TABS.productsBOM)}
              style={{ zIndex: 4 }}
            >
             <Trans> درخت محصولات</Trans>
            </div>
            <div
              className={classNames("support__right-top-item", {
                "support__right-top-item--active":
                  activeTab === SUPPORT_TABS.gameGuide,
              })}
              onClick={() => setActiveTab(SUPPORT_TABS.gameGuide)}
              style={{ zIndex: 3 }}
            >
             <Trans> راهنمای بازی</Trans>
            </div>
          </div>
        </div>
        <div className="support__left">
          {activeTab === SUPPORT_TABS.productsBOM && <ProductsBOM />}
          {activeTab === SUPPORT_TABS.gameGuide && <GameGuide />}
        </div>
      </div>
    </>
  );
}

export default Support;
