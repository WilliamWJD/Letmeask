import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from './pages/Room';

import { AuthContextProvider } from './contexts/AuthContextProvider';
import { ToastContainer } from 'react-toastify';
import { AdminRoom } from './pages/AdminRoom';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer/>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />

          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
