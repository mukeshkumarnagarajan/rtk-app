import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Header from "./components/Header"
import Home from "./features/home/Home"
import { Counter } from "./features/counter/Counter"
import Users from "./features/users/Users"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>

      <footer className="text-center">
        <hr />
        <p>Copyright 2023 | Arun</p>
      </footer>
    </BrowserRouter>
  )
}

export default App
