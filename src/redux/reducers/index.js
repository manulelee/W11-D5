const initialState = {
  data: {
    favouriteSongs: [], // brani preferiti
    favouriteArtists: [], // artisti preferiti
    selected: [], // brano selezionato
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
          favouriteSongs: [
            ...state.data.favouriteSongs.slice(0, action.payload),
            ...state.data.favouriteSongs.slice(action.payload + 1),
          ],
        },
      };
    case "ADD_FAVOURITES_ARTIST":
      return {
        ...state,
        data: {
          ...state.data,
          favouriteArtists: [...state.data.favouriteArtists, action.payload],
        },
      };
    case "REMOVE_FAVOURITES_ARTIST":
      return {
        ...state,
        data: {
          ...state.data,
          favouriteArtists: [
            ...state.data.favouriteArtists.slice(0, action.payload),
            ...state.data.favouriteArtists.slice(action.payload + 1),
          ],
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
