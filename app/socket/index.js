'use strict';
const helper = require('../helpers');

module.exports = (io, app) => {
    let allrooms = app.locals.chatrooms;
    /*allrooms.push({
        room: 'Good Food',
        roomID: '0001',
        users: []
    });
    allrooms.push({
        room: 'Cloud Computing',
        roomID: '0002',
        users: []
    }); */

    io.of('/roomslist').on('connection', socket => {
        console.log('Socket.io connected to client');
        socket.on('getChatrooms', () => {
            socket.emit('chatRoomsList', JSON.stringify(allrooms));
        });

        socket.on('createNewRoom', newRoomInput => {
            if (!helper.findRoomByName(allrooms, newRoomInput)) {
                allrooms.push({
                    room: newRoomInput,
                    roomID: helper.randomHex(),
                    users: []
                });
                socket.emit('chatRoomsList', JSON.stringify(allrooms));
                socket.broadcast.emit('chatRoomsList', JSON.stringify(allrooms));
            }
        })
    });

    io.of('/chatter').on('connection', socket => {
        // Join a chatroom - receive (listen to) the join event 
		socket.on('joinchat', data => { 
            let roomUsersList = helper.addUserToRoom(allrooms, data, socket); 
            socket.broadcast.to(data.roomID).emit('updateUsersList', JSON.stringify(roomUsersList.users)); 
            socket.emit('updateUsersList', JSON.stringify(roomUsersList.users)); 
        });        
    });
}