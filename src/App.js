import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './Home/Home'
import Login from './Home/Login'
import NoMatch from './Home/NoMatch'
import {LoggedInProvider} from './LoggedInContext/LoggedInContext'

function App() {
  return (
    <LoggedInProvider>
      <Routes>
        <Route path='/' element={<Navigate to='login' replace/>}></Route>
        <Route path='login' element={<Login/>}></Route>
        <Route path='home' element={<Home/>}></Route>
        <Route path='*' element={<NoMatch/>}></Route>
      </Routes>
    </LoggedInProvider>
  );
}

export default App;
