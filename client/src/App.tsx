import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useQuery, gql } from '@apollo/client';
import { Book } from '../../server/models/Book';
import Table from 'react-bootstrap/Table';

const Get_Books = gql`
   query ExampleQuery {
    books {
      id
      author
      isPublished
      title
    }
  } 
`;

function App() {
  const [count, setCount] = useState(0)
  const { loading, error, data } = useQuery(Get_Books);
  
  console.log(data);

  if (error) return <p>Error : {error.message}, Please inspect your ormconfig.json file</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Create JD4 React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Book Title</th>
            <th>Book Author</th>
          </tr>
        </thead>
        <tbody>
          {data && data.books.map((book: Book, index: number) => (
            <tr>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
            </tr>
          ))
          }
        </tbody>
      </Table>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
