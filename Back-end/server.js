const express = require('express');
const app = require('./app');
const socket = require('socket.io');

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`Server up and running on ${port}`);
});


const TIME_INTERVAL = 1000;

var roomToPlayers = new Map();
var randomSet = [];
var lastRoomNum = 0;

// Socket setup
const io = socket(server);

io.on('connection', (socket) => {
    console.log('Made socket connection ', socket.id);

    let roomNum = socket.id.substr(0, 8);
    socket.emit('roomNum', roomNum);


    socket.on('gotRoom', (data) => {
        if(data.wantRandom){
            randomSet.push(data);
            if(randomSet.length % 2 === 0){
                let tempArr =  roomToPlayers.get(lastRoomNum);
                console.log(tempArr)
                tempArr.push(socket);
                roomToPlayers.set(data.roomNum, tempArr);
                tempArr[0].emit('getReady', null);
                tempArr[1].emit('getReady', null);
            } else {
                roomToPlayers.set(data.roomNum, [socket]);
                socket.emit('numPlayer', 1)
            }
            lastRoomNum = data.roomNum;
        } else if(roomToPlayers.has(data.roomNum)){
            let tempArr =  roomToPlayers.get(data.roomNum);
            tempArr.push(socket);
            roomToPlayers.set(data.roomNum, tempArr);
            tempArr[0].emit('getReady', null);
            tempArr[1].emit('getReady', null);
        } else {
            roomToPlayers.set(data.roomNum, [socket]);
        }
        console.log(roomToPlayers.size);


        setTimeout(() => {
            socket.on('move', (data) => {
                let tempArr = roomToPlayers.get(data.roomNum);
                if(data.playerNum) tempArr[0].emit('sign', data.sign);
                else  tempArr[1].emit('sign', data.sign);
                console.log('damtavrda')
            });
        }, TIME_INTERVAL);
    })
});