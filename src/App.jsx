import { Calendar } from './components/Calendar'
import { DateTime } from 'luxon';
import './App.css'

function capitalizeFirstLetter(string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getDate() {
  const now = DateTime.now().setLocale('ru');

  const firstDayOfMonth = now.startOf('month').weekday;
  const lastDayOfMonth = now.endOf('month').weekday;
  const dayOfWeek = now.toFormat('EEEE');
  const daysInMonth = now.daysInMonth;
  const dayOfMonth = now.day;
  const monthGen = now.toFormat('MMMM');
  const monthNom = capitalizeFirstLetter(now.toFormat('LLLL'));
  const year = now.year;

  const daysInPrevMonth = now.startOf('month').minus({ months: 1 }).daysInMonth;

  return {
    daysInPrevMonth,
    firstDayOfMonth,
    lastDayOfMonth,
    dayOfWeek,
    daysInMonth,
    dayOfMonth,
    monthGen,
    monthNom,
    year
  };
}

function App() {
  const dateObject = getDate();

  return (
    <Calendar date={dateObject}/>
  )
}

export default App
