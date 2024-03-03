// UserListPDF.js

import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';

import team from '../../images/team.jpg'
import profile from '../../images/profile.jpg'
// Sample data for the list of users
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];

// Styles for the PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  userList: {
  display:'flex',
  flexDirection:'row',
  borderWidth:1,
  flexWrap:'wrap',
  width:'100%'
  },
  userItem: {
    marginBottom: 5,
  },
  userId: {
    fontWeight: 'bold',
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius:' 50%',
    boxShadow:' 0 2px 6px 0 rgba(47, 83, 151, 0.10)'
},
playerProfileImg:{
  backgroundColor:'#50ac00',
  width: 50,
  height: 50,
},
profileBox: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2px 6px 0 rgba(47, 83, 151, 0.10)',
    borderRadius: 3,
    paddingHorizontal:16,
    paddingVertical:16,
    textAlign: 'center',
    transition: '300ms',
    width:'50%',
    borderWidth:1
},
teamName:{
    fontWeight: 300,
    fontSize: 16,
    marginBottom: 0,
    color:'#000000'
},
rowCol:{
    fontWeight: 300,
    fontSize: 14,
    marginBottom: 0,
    color:'#000000',
    justifyContent:'center',
    alignItems:'center'
},
rowColBold:{
    fontSize: 14,
    marginBottom: 0,
    color:'#000000',
    justifyContent:'center',
    alignItems:'center',
    fontWeight: 'bold',
},
teamNameBold:{
  fontWeight: 800,
  fontSize: 18,
  marginBottom: 0,
  color:'#FFFFFF'
},
playerList:{
  display:'flex',
  flexDirection:'row',
  border:1,
  borderColor:'#e4e4e4'
}
});

// Component to render the PDF document
const UserListPDF  = ({ tournamentDetails }) => { 
  return (
    <PDFViewer width="100%" height="600">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.userList}>
                      {tournamentDetails && tournamentDetails.teams && tournamentDetails.teams.length > 0 &&
                          tournamentDetails.teams.map((item) => {   console.log(item.logoUrl)
                            return(
                          
                              <div style={styles.profileBox}>
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                {item.logoUrl ? <Image style={styles.profileImg} src={item.logoUrl } alt="profile pic" /> :
                                  <Image  src={team} style={styles.profileImg} alt="profile pic" />}
                                  </div>
                                <div style={{ backgroundColor: '#50ac00', paddingVertical:10 }}>

                                  <Text style={styles.teamNameBold}>{item.teamName}</Text>
                                  <Text style={styles.teamName}>{item.ownerName}</Text>
                                </div>
                                <div>
                                  {item.playerList && item.playerList.soldPlayer && item.playerList.soldPlayer.length > 0 &&
                                    item.playerList.soldPlayer.map((player) => (
                                      <div style={styles.playerList}>
                                      <div style={{borderWidth:1}}>    
                                        {player.profilePictureUrl ? <Image style={styles.playerProfileImg} src={player.profilePictureUrl } alt="profile pic" /> :
                                      <Image  src={{ uri: profile, method: "GET", headers: { "Cache-Control": "no-cache" }, body: "" }} style={styles.playerProfileImg} alt="profile pic" />}
                                      </div>
                                      <div style={{display:'flex',justifyContent:'space-around',alignItems:'flex-start', flexDirection:'column', padding:5, backgroundColor:'#ecf0f1', width:'100%'}}>
                                        <Text style={styles.rowColBold}>Name: {player.playerName}</Text>
                                        <Text style={styles.rowCol}>Bid Amount: {player.bidAmount}</Text>
                                      </div>
                                      </div>
                                      ))}
                                </div>
                            </div>
                          )})}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default UserListPDF;
