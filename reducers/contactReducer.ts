import { Contact } from "../interfaces";
import { ADD, UPDATE, DELETE } from './actions';

export const initialState = {
  lastId : 0,
  contacts: [],
};

export const init = () => {
  return initialState;
};

export const reducer = (data: {contacts :Contact[] , lastId : number }, action) => {
  switch (action.type) {

    case ADD:
      return {lastId : action.newContact.id,contacts : [...data.contacts, action.newContact] };

    case UPDATE:
      return {...data , contacts : data.contacts.map((contact) => {
        if (contact.id == action.toUpdateContact.id)
          return action.toUpdateContact;
        return contact;
      })};

    case DELETE:
      return {...data , contacts : data.contacts.filter((contact) => contact.id !== action.id)};

    default:
      throw new Error();
  }
};
