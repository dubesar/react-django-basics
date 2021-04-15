import axios from 'axios';
import { useFormik } from 'formik';
import {useState} from 'react'

export default function Create() {

    const [tasks, setTasks] = useState('')
    function handleChange( e ) {
        setTasks( e.target.value );
    }

    const formik = useFormik( {
        initialValues: {
            task: tasks,
        },
        onSubmit: () => {
            axios.post( 'http://127.0.0.1:8000/todo/', {
                task: tasks,
            })
                .then( ( res ) => {
                    console.log( res );
                } )
                .catch( ( err ) => {
                    console.log( err );
                } )
            window.location.reload()
        }
    })
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <input placeholder="Task" onChange={ handleChange }/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}