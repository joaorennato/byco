export const initialState = {
    name: '',
    email: '',
    avatar: '',
    favorites: [],
    appointments: []
};

export const UserReducer = (state, action) => {
    switch(action.type){
        case 'setName':
            return { ...state, name: action.payload.name };
        break;
        case 'setEmail':
            return { ...state, email: action.payload.email };
        break;
        case 'setAvatar':
            return { ...state, avatar: action.payload.avatar };
        break;
        case 'setFavorites':
            return { ...state, favorites: action.payload.favorites };
        break;
        case 'setAppointments':
            return { ...state, appointments: action.payload.appointments };
        break;
        default:
            return state;
    }
}