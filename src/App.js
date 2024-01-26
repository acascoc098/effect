//import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Book from './Book';

function App() {
  const [books, setbooks] = useState([]);
  const [recarga, setRecarga] = useState(false)
  const [query, setQuery] = useState("")

  //Este solo se hace una primera vez, ideal para cargar datos
  //useEffect(() => {console.log("Se ha ejecutado el effect")}, [recarga])//Cada vez qu recarga cambia este cambia

  const  downBooks = async () => {
    if (query !== ""){
      const response = await fetch("https://openlibrary.org/search.json?q=" + query)
      const books_response = await response.json();
      const books = books_response.docs;
      setbooks(books);
    }else{
      setbooks([]);
    }
  }

  useEffect(() => {
    downBooks();
  },[query]);

  return (
    <div className="App">
      <input type='text' value={query} onChange={(e) => {console.log(e.target.value);setQuery(e.target.value)}}></input>

      <button onClick={downBooks}>Buscar</button>
      {
        books.map(book => 
          /*<div key={book.key}>
            <h1>{book.tittle}</h1>
            {
              book.author_name ? <p>{book.author_name[0]}</p> : <p>No se ha encontrado el autor</p>
            }
          </div>*/
          <Book book={book} key={book.key}/>
        )
      }
    </div>
  );
}

export default App;
