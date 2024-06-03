import { Route, Routes, useParams } from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import Table from "./components/Table";
import EditForm from "./components/EditForm";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Form />} />
        <Route path='/edit/:id' element={<EditForm />} />
      </Routes>
      <Table />
    </>
  );
}

export default App;
