import './assets/css/App.css';
import Router from './routes/Routes';
import Bootstrap from './assets/css/bootstrap/bootstrap.css';
//"https://bootswatch.com/5/darkly/bootstrap.min.css"
function App() {
  return (
    <div>
      <link href={Bootstrap} type="text/html" />
      <Router></Router>
    </div>
  );
}

export default App;
