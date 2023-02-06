import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = () => {
  const handleDateSelect = (selectInfo) => {
    console.log(selectInfo.startStr);
  };

  return (
    <div className="container mt-2 mb-2">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        select={handleDateSelect}
      />
    </div>
  );
};

export default Calendar;
