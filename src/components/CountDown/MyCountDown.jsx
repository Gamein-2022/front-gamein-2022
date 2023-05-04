import Countdown from "react-countdown";

function MyCountDown({ timeInSeconds, onComplete }) {
    return <Countdown 
        key={timeInSeconds}
        date={Date.now() + timeInSeconds * 1000}
        onComplete={onComplete}
        daysInHours />
}

export default MyCountDown;