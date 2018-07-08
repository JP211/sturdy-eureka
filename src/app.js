"use strict"
import {createStore} from 'redux';

// STEP 3 Define the reducers
const reducer = function(state = {books:[]}, action) {

  switch(action.type) {
    case "POST_BOOK":
    let books = state.books.concat(action.payload);
    return {books};
    break;

    case "DELETE_BOOK":
    // Create a copy of the current array or books
    const currentBookToDelete = [...state.books]

    // Determine at which index in books array is the book to be deleted
    const indexToDelete = currentBookToDelete.findIndex(
      function(book) {
        return book.id === action.payload.id;
      }
    )
    // Use slice to remove the book at the specified index
    return {books: [...currentBookToDelete.slice(0, indexToDelete),
    ...currentBookToDelete.slice(indexToDelete + 1)]}
    break;

    case "UPDATE_BOOK":
    // Create a copy of the current array of books
    const currentBookToUpdate = [...state.books]

    // Determine at which index in the array is the book to be updated
    const indexToUpdate = currentBookToUpdate.findIndex(
      function(book) {
        return book.id === action.payload.id;
      }
    )
    // Create a new book object with the new values and with the same array
    // index of to replace. To achieve this we will use ...spread but we could
    // use the concat method
    const newBookToUpdate = {
      ...currentBookToUpdate[indexToUpdate],
      title: action.payload.title
    }
    // Log to show how the newBookToUpdate looks
    console.log("New Book to Update", newBookToUpdate);

    // Use slice to remove the book at the specified index, replace with the new object
    // and concat with the rest of the objects in the array
    return {books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
    ...currentBookToUpdate.slice(indexToUpdate + 1)]}
    break;
  }
  return state
}
// STEP 1 Create the Store
const store = createStore(reducer);

store.subscribe(function(){
  console.log('Current State is: ' , store.getState());
  // console.log('Price is: ' , store.getState()[1].price);
})

// STEP 2 Create and dispatch actions
store.dispatch({
  type:"POST_BOOK",
  payload: [{
    id: 1,
    title: 'The World is Awesome',
    description: 'A book about all the awesome things in the world.',
    price: 29.99
  },
  {
    id: 2,
    title: 'International Food Recipes',
    description: 'Food from around the world.',
    price: 14.99
  }]
})

// DELETE a book
store.dispatch({
  type: "DELETE_BOOK",
  payload: {id: 1}
})

// UPDATE a book
store.dispatch({
  type: "UPDATE_BOOK",
  payload: {
    id: 2,
    title: 'A brand new title'
  }
})

// Dispatch a Second Action (Post a new record)
// store.dispatch({
//   type:"POST_BOOK",
//   payload: [{
//     id: 3,
//     title: 'A New Chapter',
//     description: 'The story of a new life',
//     price: 11.11
//   }]
// })
