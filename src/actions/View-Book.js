export const LOAD_BOOK_INTO_SINGLE_VIEW = "LOAD_BOOK_INTO_SINGLE_VIEW";
export const loadBookIntoSingleView = book => (
  console.log("book", book),
  {
    type: LOAD_BOOK_INTO_SINGLE_VIEW,
    book
  }
);

export const REMOVE_BOOK_FROM_SINGLE_VIEW = "REMOVE_BOOK_FROM_SINGLE_VIEW";
export const removeBookFromSingleView = () => ({
  type: REMOVE_BOOK_FROM_SINGLE_VIEW
});
