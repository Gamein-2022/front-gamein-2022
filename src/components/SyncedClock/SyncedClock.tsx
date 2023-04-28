import { useEffect, useState } from "react";
import calendarLogo from "../../assets/calendar.svg";
import { getTime } from "../../apis/time";
import { log } from "console";

function SyncedClock() {
    const dayDurationInMiliSeconds = 8000
    const [virtualDate, setVirtualDate] = useState<Date>()

    const updateTime = (delay: number, baseDate: number, baseVirtualDate: number) => {
        setTimeout(() => {

            const diff = Date.now() - baseDate
            const virtualDiff = diff * 86400_000 / dayDurationInMiliSeconds
            setVirtualDate(new Date(baseVirtualDate + virtualDiff))

            if (diff > 30 * dayDurationInMiliSeconds) {
                readFromServer();
            }
            else {
                updateTime(dayDurationInMiliSeconds - (diff % 8000), baseDate, baseVirtualDate)
            }

        }, delay);
    }

    const readFromServer = () => {
        const before = Date.now()

        getTime()
            .then((res) => res.data)
            .then((data) => { 
                const after = Date.now()
                const virtualDate = new Date(data.year, data.month, data.day)
                const passedMiliSeconds = (data.secondOfDate % 8) * 1000;
                const baseDate = before - passedMiliSeconds + (after - before) / 2
                const delay = dayDurationInMiliSeconds - passedMiliSeconds - (after - before) / 2
                setVirtualDate(virtualDate)
                updateTime(delay, baseDate, virtualDate.getTime())
            });

    }

    useEffect(() => {
        readFromServer()
    }, [])

    return <>
        {virtualDate?.getFullYear()}/{virtualDate?.getMonth()}/{virtualDate?.getDate()}
        <img src={calendarLogo} alt="calendar" />
    </>
}

export default SyncedClock;