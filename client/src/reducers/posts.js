export default function posts(state = [], action) {
  switch (action.type) {
    case 'DELETE':
      return state.filter((post) => post._id !== action.payload);
    case 'UPDATE':
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case 'LIKE':
      return state.map((post) =>
        post._id === action.payload._id
          ? { ...post, likes: action.payload.likes }
          : post
      );
    case 'FETCH_ALL':
      if (action.payload instanceof Array) {
        return action.payload;
      }
      // Handle error case if needed
      return state;
    case 'CREATE':
      return [...state, action.payload];
    default:
      return state;
  }
}
