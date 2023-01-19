import logo from './logo.svg';
import './App.css';
import Board from 'react-trello'
import AllRoutes from './routes/AllRoutes';
import Navbar from './components/Navbar';
// import data from "./data.json";
const data = {
  lanes: [
      {
          id: "todo",
          title: "Planned Tasks",
          label: "20/70",
          style: {
              width: 280
          },
          cards: [
              {
                  id: "Milk",
                  title: "Buy milk",
                  label: "15 mins",
                  description: "2 Gallons of milk at the Deli store"
              },
              {
                  id: "Plan2",
                  title: "Dispose Garbage",
                  label: "10 mins",
                  description: "Sort out recyclable and waste as needed"
              },
              {
                  id: "Plan3",
                  title: "Write Blog",
                  label: "30 mins",
                  description: "Can AI make memes?"
              },
              {
                  id: "Plan4",
                  title: "Pay Rent",
                  label: "5 mins",
                  description: "Transfer to bank account"
              }
          ]
      },
      {
          id: "pending",
          title: "Work In Progress",
          label: "10/20",
          style: {
              width: 280
          },
          cards: [
              {
                  id: "Wip1",
                  title: "Clean House",
                  label: "30 mins",
                  description: "Soap wash and polish floor. Polish windows and doors. Scrap all broken glasses"
              }
          ]
      },
      {
          id: "done",
          title: "Completed",
          style: {
              width: 280
          },
          label: "2/5",
          cards: [
              {
                  "id": "Completed1",
                  "title": "Practice Meditation",
                  "description": "Use Headspace app"
              },
              {
                  "id": "Completed2",
                  "title": "Maintain Daily Journal",
                  "label": "15 mins",
                  "description": "Use Spreadsheet for now"
              }
          ]
      }
  ]
}
function App() {
  return (
    <div className="App">
        <Navbar/>
        <AllRoutes/>
    </div>
  );
}

export default App;
