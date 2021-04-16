import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios';
import Create from "./components/create"
import { Formik } from "formik"
import { useDispatch } from 'react-redux';
import { getTasks } from "./features/tasks/taskSlice"


function App() {

  const [data, setData] = useState( [] );
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch( getTasks() ).then( ( res ) => {
      setData( res.payload );
    })
  }, [dispatch] )

  return (
    <div className="App">
      <Create />
      {data.map( datas => (
        <div className = "tableData">
          <div className="task">{datas.task}</div>
          <div className="createdAt">{datas.created}</div>
          <div className = "delete">
            <Formik
              onSubmit={() => {
                axios.delete( `http://127.0.0.1:8000/todo/${ datas.id }/` )
                  .then( ( res ) => {
                    console.log( res );
                  } )
                  .catch( ( err ) => {
                    console.log( err );
                  } )
                window.location.reload();
              }}
            >
              {props => (
                <form onSubmit={props.handleSubmit}>
                  <button type="submit">Delete</button>
                </form>
              )}
              </Formik>
            </div>
        </div>
      ))}
    </div>
  );
}

export default App;
