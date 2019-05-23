'use strict';
module.exports = (io, app) => {
    const allRooms = app.locals.chatrooms;
    io.of('/roomslist').on('connection', socket => {
        console.log('Socket.io connected to client');
    })
}