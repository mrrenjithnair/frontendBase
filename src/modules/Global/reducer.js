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
    RESET_TOAST,
    GET_USER_LIST_GLOBAL_FAILURE,
    GET_USER_LIST_GLOBAL,
    GET_USER_LIST_GLOBAL_SUCCESS,
    GET_USER_DETAILL_SUCCESS,
    GET_USER_DETAIL_FAILURE,
    GET_PLAYER_TEAM_LIST_SUCCESS,
    GET_PLAYER_TEAM_LIST_FAILURE,
    UPLOAD_PHOTO,
    UPLOAD_PHOTO_SUCCESS,
    UPLOAD_PHOTO_FAILURE,
    ON_CHANGE_VALUE_PROFILE,
    ON_LOGIN_FAILURE,
    ON_LOG_OUT,
    SET_OVERLAY_LOADING
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
    auctionPlayer: false,
    teamPlayerList:false,
    sidebarOpen:false,
    userProfile: false,
    playerTeamList: false,
    globalSelectedClub: false,
    loginClub: false,
    loginUser: false,
    myDetails:false,
    loading:false
};

export default function (state = initialState, actions) {
    switch (actions.type) {
        case ON_LOG_OUT:
            roleInfo.reset()
            return {state :undefined}
        case SET_OVERLAY_LOADING:
            roleInfo.reset()
            return {...state, loading: actions.value }
            
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
        case ON_LOGIN_FAILURE:
            return { ...state, loginUser: false, sessionToken: false, userPrivileges: false, loggedInUseId: false, loggedInRoleId: false };

            
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

        case GET_USER_LIST_GLOBAL_SUCCESS:
            let teamPlayerList = actions.data && actions.data.length > 0 ? actions.data : []
            return { ...state, 'teamPlayerList': teamPlayerList };

        case GET_USER_LIST_GLOBAL_FAILURE:
                return { ...state, 'teamPlayerList': [] };

        case GET_USER_DETAILL_SUCCESS:
            let userProfile = actions.data && actions.data.length > 0 ? actions.data[0] : []
            return { ...state, 'userProfile': userProfile };

        case GET_USER_DETAIL_FAILURE:
                return { ...state, 'userProfile': false };

        case GET_PLAYER_TEAM_LIST_SUCCESS:
            let teamList = actions.data && actions.data.length > 0 ? actions.data : []
            return { ...state, 'playerTeamList': teamList };

        case ON_CHANGE_VALUE_PROFILE:
            let userProfileDetail = state.profileEdit
            userProfileDetail.map((item)=>{
                if(item.key == actions.id){
                    item.value = actions.value
                }
            })
            return { ...state, profileEdit: userProfileDetail };
            

        case GET_PLAYER_TEAM_LIST_FAILURE:
                return { ...state, 'playerTeamList': false };
                
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
 
        case UPLOAD_PHOTO:
       
            return { ...state, 'fileToUpload': actions.data, 'fileToUploadName': actions.fileId, [actions.key]: actions.fileId  };

        case UPLOAD_PHOTO_SUCCESS:
            return { ...state, 'fileToUpload': false, fileToUploadName: false };

        case UPLOAD_PHOTO_FAILURE:
                return { ...state, 'fileToUpload': false, fileToUploadName: false };
            
        default:
            return state;
    }
}