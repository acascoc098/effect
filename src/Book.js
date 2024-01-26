const Book = ({book}) => {
    <div key={book.key}>
        <h1>{book.tittle}</h1>
        {
          book.author_name ? <p>{book.author_name[0]}</p> : <p>No se ha encontrado el autor</p>
        }
    </div>
}

export default Book;