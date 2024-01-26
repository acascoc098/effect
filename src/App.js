//import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Book from './Book';

function App() {
  const [books, setbooks] = useState([]);
  const [recarga, setRecarga] = useState(false)
  const [query, setQuery] = useState("")
  const [loading,setLoading] = useState(false);

  //Este solo se hace una primera vez, ideal para cargar datos
  //useEffect(() => {console.log("Se ha ejecutado el effect")}, [recarga])//Cada vez qu recarga cambia este cambia

  const  downBooks = async () => {
    setLoading(true);
    if (query !== ""){
      const response = await fetch("https://openlibrary.org/search.json?q=" + query)
      const books_response = await response.json();
      const books = books_response.docs;
      setbooks(books);
      setLoading(false);
    }else{
      setbooks([]);
      setLoading(false);
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
        
          /*<div key={book.key}>
            <h1>{book.tittle}</h1>
            {
              book.author_name ? <p>{book.author_name[0]}</p> : <p>No se ha encontrado el autor</p>
            }
          </div>*/
          loading ? <img src="iconos/progress.gif" alt='loading'/>
          : 
            books.length === 0 ?
              <p>No se han encontrado libros</p>
            :
              books.map(book => 
                <Book book={book} key={book.key}/>
              )
      }
    </div>
  );
}

export default App;
