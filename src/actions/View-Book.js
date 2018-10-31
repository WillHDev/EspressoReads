export const LOAD_BOOK_INTO_SINGLE_VIEW = "LOAD_BOOK_INTO_SINGLE_VIEW";
export const loadBookIntoSingleView = bookData => ({
  type: LOAD_BOOK_INTO_SINGLE_VIEW,
  bookData
});
