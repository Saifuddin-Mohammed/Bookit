import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState} from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../App.css";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function App() {
    let navigate = useNavigate();
    function handleClick(calevent){
        navigate(`/events/${calevent._id}`)
    }
    const [initialState, setInitialState] = useState();
    useEffect(()=>{
      fetch('/api').then(res=>{
          if(res.ok){
            let json = res.json()
            return json;
        }
      }).then(jsonResponse => setInitialState(jsonResponse))
  }, [])

    return (
        <div className="App">
            <Calendar
                onSelectEvent={handleClick}
                localizer={localizer}
                events={initialState}
                startAccessor="start"
                endAccessor="end"
                titleAccessor="title"
                views={["month", "agenda"]}
                style={{ height: 700, margin: "50px" }}
                messages={{agenda:"Table", month:"Calendar"}}
            />
        </div>
    );
}

export default App;