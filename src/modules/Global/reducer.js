import {
    INPUT_VALUE_CHANGED_GLOBAL,
    GET_PREFERENCE_VALUES_SUCCESS,
    GET_CLUB_DETAIL_SUCCESS,
    SET_DATA_FROM_LOCAL,
    ON_LOGIN_SUCCESS,
    GLOBAL_SUCCESS,
    RESET_DASHBOARD,
    GET_TOURNAMENT_LIST_GLOBAL_SUCCESS,
    GET_PENDING_TOURNAMENT_LIST_GLOBAL_SUCCESS,
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
    ON_CHANGE_VALUE_AUCTION,
    ON_LOGIN_FAILURE,
    ON_LOG_OUT,
    SET_OVERLAY_LOADING,
    EDIT_CLUB,
    EDIT_CLUB_SUCCESS,
    EDIT_CLUB_FAILURE, 
    ON_CHANGE_VALUE_CLUB,
    ADD_PLAYER_TO_TEAM_SUCCESS,
    ADD_PLAYER_TO_TEAM_FAILURE,
    EDIT_PLAYER_TO_TEAM_SUCCESS,
    EDIT_PLAYER_TO_TEAM_FAILURE,
    GET_TOURNAMENT_DETAIL_OF_AUCTION_SUCCESS,
    GET_TOURNAMENT_DETAIL_OF_AUCTION_FAILURE,
    RESET_AUCTION,
    GET_UNSOLD_PLAYER_SUCCESS,
    GET_UNSOLD_PLAYER_FAILURE,
    PROFILE_EDIT_SUCCESS,
    ON_CHANGE_CATEGORY,
    ADD_CATEGORY,
    CREATE_AUCTION_SUCCESS,
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
    loading:false,
    profileIncomplte: false,
    auctionPending: false,
    auctionTournamentPlayerBindAmount: 0,
    sportsList: false,
    categoryJson: [],
    updateCategory: false,
};
// {
//     "min": "2500000",
//     "count": 2,
//     "category": "A",
//     "increase": "500000",
//     "order":3
// },

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

        
        case GET_PREFERENCE_VALUES_SUCCESS:
            console.log(actions.id, actions.value)
            return { ...state, sportsList: actions.value.sportsList };
            
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

        case GET_PENDING_TOURNAMENT_LIST_GLOBAL_SUCCESS:
            return { ...state, 'tournamentPendingListGlobal': actions.data };

        case GET_TOURNAMENT_DETAIL_OF_AUCTION_SUCCESS:
            return { ...state, 'auctionDetailList': actions.data };

        case GET_TOURNAMENT_DETAIL_OF_AUCTION_FAILURE:
            return { ...state, 'auctionDetailList': [] };

        case GET_UNSOLD_PLAYER_SUCCESS:
            return { ...state, 'auctionUnSoldPlayerList': actions.data };

        case GET_UNSOLD_PLAYER_FAILURE:
            return { ...state, 'auctionUnSoldPlayerList': [] };
    
            
        case GET_TOURNAMENT_DETAIL_GLOBAL_SUCCESS:
            let tournamentDetailGlobal = actions.data && actions.data.length > 0 ? actions.data[0] : []
            return { ...state, 'tournamentDetailGlobal': tournamentDetailGlobal };

        case GET_AUCTION_PLAYER_SUCCESS:
            let auctionPlayer = actions.data && actions.data.length > 0 ? actions.data : []
            return { ...state, 'auctionPlayer': auctionPlayer, auctionPlayerSearch:'' };

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

        case ON_CHANGE_VALUE_AUCTION:
            let seletedBidEdit = state.seletedBidEdit
            seletedBidEdit.map((item)=>{
                if(item.key == actions.id){
                    item.value = actions.value
                }
            })
            return { ...state, seletedBidEdit: seletedBidEdit };
                            
            
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


        case EDIT_CLUB_SUCCESS:
            toast.success('League updated succefully');
            return { ...state };

        case EDIT_CLUB_FAILURE:
            toast.error('League updated failed');
                return { ...state,  };

        case ADD_PLAYER_TO_TEAM_SUCCESS:
            toast.success('Player sold to the team');
            return { ...state, auctionTournamentTeamId: null, auctionTournamentPlayerBindAmount: null, showCongratulationsModal: true };

        case ADD_PLAYER_TO_TEAM_FAILURE:
            toast.error('Player sold failed');
                return { ...state,  showCongratulationsModal: false  };

        case EDIT_PLAYER_TO_TEAM_SUCCESS:
            toast.success('Player sold to the team');
            return { ...state, auctionTournamentTeamId: null, auctionTournamentPlayerBindAmount: null };

        case EDIT_PLAYER_TO_TEAM_FAILURE:
            toast.error('Player sold failed');
                return { ...state,  };
        case PROFILE_EDIT_SUCCESS:
                return { ...state,profileIncomplte: false  };
        case ADD_CATEGORY:
            var categoryJson = state.categoryJson
            var categoryName = state.categoryName
            
            console.log('before',categoryJson)
            categoryJson.push({
                category: categoryName.toUpperCase() ,
                min: '',
                count: '',
                increase: '',
                order: '',
                id: categoryJson.length +1
            })
            return { ...state, categoryJson: categoryJson, categoryName:'' };
            
        case ON_CHANGE_CATEGORY:
                var categoryJson = state.categoryJson
                categoryJson.map((item)=>{
                    if(item.id.toUpperCase() == actions.name.toUpperCase()){
                        item[actions.id] = actions.value
                    }
                })
                return { ...state, categoryJson: categoryJson, categoryName:'', updateCategory: !state.updateCategory };

        case CREATE_AUCTION_SUCCESS:   
        toast.success('Auction created succefully');          
                return { ...state, categoryJson: '', categoryName:'', updateCategory: !state.updateCategory };

        case ON_CHANGE_VALUE_CLUB:
            let seletedClubEdit = state.seletedClubEdit
            seletedClubEdit.map((item)=>{
                if(item.key == actions.id){
                    item.value = actions.value
                }
            })
            return { ...state,seletedClubEdit};
 
            case RESET_AUCTION:

let nearByTournament= false;
let TournamentDetailsPage= false;

let tournamentListGlobal= false;


let auctionPlayerId= false;
let auctionTournamentTeamId= false;
let auctionTournamentId= false;
let auctionRequestId= false;
let auctionTournamentPlayerBindAmount= 0;
let auctionType= false;
let auctionDate= false;
let auctionVenue= false;
let auctionTeamPoint= false;
let auctionMinPoint= false;
let auctionIncreasePoint= false;
let auctionCategoryAMinPoint= false;
let auctionCategoryAIncreasePoint= false;
let auctionCategoryBMinPoint= false;
let auctionCategoryBIncreasePoint= false;
let auctionCategoryCMinPoint= false;
let auctionCategoryCIncreasePoint= false;
            return { ...state, tournamentDetailGlobal:false, nearByTournament, TournamentDetailsPage, tournamentListGlobal, auctionTournamentId, auctionPlayer:{}, auctionPlayerId, auctionTournamentTeamId, auctionTournamentId, auctionRequestId, auctionTournamentPlayerBindAmount, auctionType, auctionDate, auctionVenue, auctionTeamPoint, auctionMinPoint, auctionIncreasePoint, auctionCategoryAMinPoint, auctionCategoryAIncreasePoint, auctionCategoryBMinPoint, auctionCategoryBIncreasePoint, auctionCategoryCMinPoint, auctionCategoryCIncreasePoint };

        default:
            return state;
    }
}