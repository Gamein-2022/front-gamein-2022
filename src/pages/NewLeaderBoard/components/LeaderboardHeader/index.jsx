import gameinHeaderLogo from "../../../../assets/headerLogo.svg";

import "./style.scss";

function LeaderboardHeader() {
  return (
    <header className="leaderboard-header">
      <img
        src={gameinHeaderLogo}
        alt="gamein logo"
        className="leaderboard-header__logo"
      />
    </header>
  );
}

export default LeaderboardHeader;
