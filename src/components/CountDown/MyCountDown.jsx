import Countdown from "react-countdown";

function MyCountDown({ timeInSeconds, onComplete, onTick }) {
    return <Countdown 
        key={timeInSeconds}
        date={Date.now() + timeInSeconds * 1000}
        onComplete={onComplete}
        daysInHours 
        onTick={onTick}/>
}

export default MyCountDown;