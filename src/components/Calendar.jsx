import React from "react";

function chunkArray(arr, size) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
    arr.slice(index * size, index * size + size)
  );
}

function addPrevAndNextDays(arr, daysInPrevMonth, firstDay, lastDay) {
  while (firstDay > 1) {
    arr.unshift({ 
      dayOfOtherMonth: daysInPrevMonth,
      className: 'ui-datepicker-other-month'  
    });
    daysInPrevMonth--;
    firstDay--;
  }

  let dayOfNextMonth = 1;

  while (lastDay < 7) {
    arr.push({
      dayOfOtherMonth: dayOfNextMonth,
      className: 'ui-datepicker-other-month'
    });
    dayOfNextMonth++;
    lastDay++;
  }

  return arr;
}

function setClassName(day, dayOfMonth) {
  let className = '';
  if (typeof day === 'object') {
    className = day.className;

    if (day.dayOfOtherMonth === dayOfMonth) {
      className += 'ui-datepicker-today';
    }
    
  } else {
    if (day === dayOfMonth) {
      className += 'ui-datepicker-today';
    }
  }
 
  return className;
}

export const Calendar = ({ date }) => {
  const {
    daysInPrevMonth,
    firstDayOfMonth,
    lastDayOfMonth,
    dayOfWeek,
    daysInMonth,
    dayOfMonth,
    monthGen,
    monthNom,
    year
  } = date;

  let daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  daysArray = addPrevAndNextDays(daysArray, daysInPrevMonth, firstDayOfMonth, lastDayOfMonth);

  const weeks = chunkArray(daysArray, 7);

  return (  
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{dayOfWeek}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{dayOfMonth}</div>
          <div className="ui-datepicker-material-month">{monthGen}</div>
          <div className="ui-datepicker-material-year">{year}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{monthNom}</span>&nbsp;<span className="ui-datepicker-year">{year}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          {/* <col>
          <col>
          <col>
          <col>
          <col>
          <col className="ui-datepicker-week-end">
          <col className="ui-datepicker-week-end"> */}
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">Пн</th>
            <th scope="col" title="Вторник">Вт</th>
            <th scope="col" title="Среда">Ср</th>
            <th scope="col" title="Четверг">Чт</th>
            <th scope="col" title="Пятница">Пт</th>
            <th scope="col" title="Суббота">Сб</th>
            <th scope="col" title="Воскресенье">Вс</th>
          </tr>
        </thead>
        <tbody>
          {
            weeks.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {
                  week.map((day, dayIndex) => (
                    <td key={dayIndex} className={setClassName(day, dayOfMonth)}>{typeof day === 'object' ? day.dayOfOtherMonth : day}</td>
                  ))
                }
              </tr>
            ))
          }   
        </tbody>
      </table>
    </div> 
  )
}