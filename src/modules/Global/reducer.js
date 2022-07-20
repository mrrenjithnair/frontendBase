import {
    INPUT_VALUE_CHANGED_GLOBAL,
    GET_CLUB_DETAIL_SUCCESS,
    SET_DATA_FROM_LOCAL,
    ON_LOGIN_SUCCESS,
    GLOBAL_SUCCESS,
    RESET_DASHBOARD,
    GET_TOURNAMENT_LIST_GLOBAL_SUCCESS,
    GET_TOURNAMENT_DETAIL_GLOBAL_SUCCESS,
    GET_AUCTION_PLAYER_SUCCESS,
    GET_AUCTION_PLAYER_FAILURE,
    SET_TOAST,
    RESET_TOAST
} from './actions';
import roleInfo from '../utils/roleInfo';
import { toast } from "react-toastify";
// The initial state of the Dashboard Reducer
export const initialState = {
    sessionToken: null,
    clubDetails: null,
    nearByClub: false,
    myDetails: null,
    loggedInUseId: null,
    loggedInRoleId: null,
    clubAdminList: null,
    clubListPage: false,
    adminList: false,
    assignedClub: false,
    loginClub: false,
    globalSelectedClub: null,
    tournamentListGlobal: false,
    auctionPlayer: false
};

export default function (state = initialState, actions) {
    switch (actions.type) {

        case INPUT_VALUE_CHANGED_GLOBAL:
            console.log(actions.id, actions.value)
            return { ...state, [actions.id]: actions.value };

        case ON_LOGIN_SUCCESS:
            let data = actions.data
            console.log('ON_LOGIN_SUCCESS global', actions.data)
            let tempKey = {
                loginClub: data.user.club
            }
            return { ...state, loginUser: data.user, sessionToken: data.token, userPrivileges: data.user.privileges, loggedInUseId: data.user.id, loggedInRoleId: data.user.roleId, ...tempKey };

        case SET_DATA_FROM_LOCAL:
            console.log(roleInfo)
            const sessionToken = localStorage.getItem("token");
            const loggedInUseId = localStorage.getItem("userId");
            const loggedInRoleId = localStorage.getItem("loggedInRoleId");

            let user = localStorage.getItem("user");
            let userPrivileges = localStorage.getItem("userPrivileges");
            user = user ? JSON.parse(user.replace(/\r?\n|\r|\t/g, '')) : null
            userPrivileges = userPrivileges ? JSON.parse(userPrivileges) : null
            if (userPrivileges) roleInfo.set(JSON.parse(userPrivileges.replace(/\r?\n|\r|\t/g, '')))
            console.log(roleInfo, "after")

            return { ...state, 'sessionToken': sessionToken, "myDetails": user, "userPrivileges": userPrivileges, loggedInUseId, loggedInUseId, loggedInRoleId: loggedInRoleId };

        case GET_CLUB_DETAIL_SUCCESS:
            console.log(actions.id, actions.value)
            return { ...state, 'clubDetails': actions.payload };

        case GLOBAL_SUCCESS:
            let key = actions.payload
            return { ...state, ...key };

        case GET_TOURNAMENT_LIST_GLOBAL_SUCCESS:
            return { ...state, 'tournamentListGlobal': actions.data };


        case GET_TOURNAMENT_DETAIL_GLOBAL_SUCCESS:
            let tournamentDetailGlobal = actions.data && actions.data.length > 0 ? actions.data[0] : []
            return { ...state, 'tournamentDetailGlobal': tournamentDetailGlobal };

        case GET_AUCTION_PLAYER_SUCCESS:
            let auctionPlayer = actions.data && actions.data.length > 0 ? actions.data : []
            return { ...state, 'auctionPlayer': auctionPlayer };

        case GET_AUCTION_PLAYER_FAILURE:

            return { ...state, 'auctionPlayer': [] };

        case RESET_DASHBOARD:
            let temp = {
                clubListPage: false,
                adminList: false,
                assignedClub: false
            }
            return { ...state, ...temp };
        case SET_TOAST:
            if(actions.success){
                toast.success(actions.message);
            }else{
                toast.error(actions.message);
            }
            return state;
        case RESET_TOAST:
            toast.dismiss();
            return state;
        default:
            return state;
    }
}