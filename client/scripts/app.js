var app = {
  rooms: [],
  server: 'http://127.0.0.1:3000/classes/messages?order=-createdAt',

  init: function(){
    app.username = window.location.search.substr(10);
    setInterval(function(){
      app.clearMessages();
      app.fetch();
    }, 5000);

    $('#sendButton').on('click', app.handleSubmit);
    // onclick class .username invoke this.addFriend();
  },
  send: function(message){
    console.log('inside send');
    $.ajax({
  // always use this url
      url: 'http://127.0.0.1:3000/classes/messages?order=-createdAt',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('messages: Message sent');
      },
      error: function (e) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error(e);
      }
    });
  },
  // makeRoomList: function(data){
  //   for(var index =0; index < data.results.length; index++){
  //     if (app.rooms.indexOf(data.results[index].roomname) === -1){
  //       app.rooms.push(data.results[index].roomname);
  //     }
  //   }
  //   var roomList = $('ul.mylist');
  //   $.each(app.rooms, function(index){
  //     console.log(app.rooms[index]);
  //     var li = $('<li/>')
  //       .addClass('ui-room-item')
  //       .text(app.rooms[index])
  //   //     .appendTo(app.rooms[index]);
  //   });
  //   app.displayRooms(roomList);
  // },
  // displayRooms: function(list){
  //   list.appendTo('#main');
  // },
  fetch: function(){
    $.ajax({
      // url: 'http://127.0.0.1:3000/classes/messages?order=-createdAt',
      url: 'http://127.0.0.1:3000/classes/messages?order=-createdAt',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log(data);
        //displayMessages(data)
        // var parseData = JSON.parse(data);
        // app.makeRoomList(data);
        for(var index =0; index < data.results.length; index++){
          app.addMessage(data.results[index]);
          // console.log(data.results[index]);
        }
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('messages: Failed to get message');
      }
    });
  },
  // server: 'https://127.0.0.1:3000/classes/messages?order=-createdAt',
  // server: 'https://127.0.0.1:3000/classes/messages?order=-createdAt',
  clearMessages: function(){
    $('#chats div').remove();
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
  // addRoom: function(message){
  //   $('#roomSelect').append('<span>' + app.escapeHTML(message.roomname));
  // },
  // addFriend: function(){},
  handleSubmit: function(){
    console.log("HandleSubmit");
    var message = {
      text: $('#message').val(),
      // username: '123abc',
      username: app.username,
      roomname:'6th Floor'
    };
    // console.log(message);
    app.send(message);
  }
};


  //get the list of all existing rooms
  //form to crete the room
  //filter all messages by the room property
  //display on the room page only relevant messages
  //put the name of the room in the header


