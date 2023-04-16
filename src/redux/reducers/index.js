const initialState = {
  data: {
    favouriteSongs: [], // brani preferiti
    search: null, // artisti preferiti
    selected: null, // brano selezionato
  },
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FAVOURITES_SONG":
      return {
        ...state,
        data: {
          ...state.data,
          favouriteSongs: [...state.data.favouriteSongs, action.payload],
        },
      };

    case "REMOVE_FAVOURITES_SONG":
      return {
        ...state,
        data: {
          ...state.data,
          favouriteSongs: state.data.favouriteSongs.filter((song, i) => i !== action.payload),
        },
      };
    case "SEARCH_ALBUM":
      return {
        ...state,
        data: {
          ...state.data,
          search: action.payload,
        },
      };

    case "SELECT_SONG":
      return {
        ...state,
        data: {
          ...state.data,
          selected: action.payload,
        },
      };

    default:
      return state;
  }
};

export default mainReducer;
