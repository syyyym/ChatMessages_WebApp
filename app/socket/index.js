'use strict';
module.exports = (io, app) => {
    let allrooms = app.locals.chatrooms;
    allrooms.push({
        room: 'Good Food',
        roomID: '0001',
        users: []
    });
    allrooms.push({
        room: 'Cloud Computing',
        roomID: '0002',
        users: []
    });

    io.of('/roomslist').on('connection', socket => {
        console.log('Socket.io connected to client');
        socket.on('getChatrooms', () => {
            socket.emit('chatRoomsList', JSON.stringify(allrooms));
        });
    })
}