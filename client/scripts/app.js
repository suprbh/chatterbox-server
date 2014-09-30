var app = {
  rooms: [],
  server: 'http://127.0.0.1:3000/classes/chatterbox',
  init: function(){


    // $('#main').on('click', '.username', function(){
    //   app.addFriend();
    // });

    setInterval(function(){
      app.clearMessages();
      app.fetch();
    }, 2000);

    $('#sendButton').on('click', app.handleSubmit);
    // onclick class .username invoke this.addFriend();
  },
  send: function(message){
      console.log('inside send');
    $.ajax({
  // always use this url
      url: 'http://127.0.0.1:3000/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      dataType: "json",
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (e) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error(e);
      }
    });
  },
  makeRoomList: function(data){
    for(var index =0; index < data.results.length; index++){
      if (app.rooms.indexOf(data.results[index].roomname) === -1){
        app.rooms.push(data.results[index].roomname);
      }
    }
    var roomList = $('ul.mylist');
    $.each(app.rooms, function(index){
      console.log(app.rooms[index]);
      var li = $('<li/>')
        .addClass('ui-room-item')
        .text(app.rooms[index])
    //     .appendTo(app.rooms[index]);
    });
    console.log(roomList);
    app.displayRooms(roomList);
  },
  displayRooms: function(list){
    list.appendTo('#main');
  },
  fetch: function(){
    $.ajax({
  // always use this url
      // url: 'http://127.0.0.1:3000/classes/chatterbox?order=-createdAt',
      url: 'http://127.0.0.1:3000/classes/chatterbox',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        //displayMessages(data)
        console.log('DATA', data.results);
        app.makeRoomList(data);
        for(var index =0; index < data.results.length; index++){
          app.addMessage(data.results[index]);
          // console.log(data.results[index]);
        }
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to get message');
      }
    });
  },
  // server: 'https://127.0.0.1:3000/classes/chatterbox?order=-createdAt',
  // server: 'https://127.0.0.1:3000/classes/chatterbox?order=-createdAt',
  clearMessages: function(){
    $('#chats blink').remove();
  },
  addMessage: function(message){
    // var $userlink = $().text(message.username);
    var $msg = $("<div>", {class: 'username'}).text(message.username + ": " + message.text);

    //.append('<a id="usr" href="javascript:void(0)" data-user="' + message.username + '">' + message.username + '</a>' + ": " + message.text);
    // $msg.append(usr_href + ": " + app.escapeHTML(message.text));
    $msg.appendTo('#chats');
    // if (array.indexOf())
    // array.push(message.roomname)
  },
  addRoom: function(message){
    $('#roomSelect').append('<span>' + app.escapeHTML(message.roomname));
  },
  addFriend: function(){},
  handleSubmit: function(){
    console.log("HandleSubmit");
    var message = {
      text: $('#message').val(),
      username: '123abc',
      roomname:'6th Floor'
    };
    console.log(message);
    app.send(message);
  },
 refreshMessages: function(){
  setInterval(function(){
    app.clearMessages();
    app.fetch();
  }, 3000);
 }
};


  //get the list of all existing rooms
  //form to crete the room
  //filter all messages by the room property
  //display on the room page only relevant messages
  //put the name of the room in the header


