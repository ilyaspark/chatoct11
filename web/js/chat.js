$(document).ready(function(){
    if (localStorage.hasOwnProperty('username')) {
        loadUser();
        
    } else {
        $('.loginWindow').fadeIn();
    }
      
});

//$('.loginWindow').fadeIn();

$('.actionLogin').click(function(){
    $('.ulError').hide();
    var username = $('.loginForm input[type=text]').val();
    var password = $('.loginForm input[type=password]').val();
    if(username.length < 3 || password.length < 3) {
        $(".ulError").html('Используйте логин и пароль длинее 3х символов.');
        $('.ulError').fadeIn();
    } else {
        $.post("/chat/auth", {username:username,password:password},
            function(data, textStatus, jqXHR)
            {
                if(data == 1) {
                    $('.loginWindow').hide();
                    $('.chatWindow').fadeIn();

                    loadUser();
                    loadMessages();
                    messageUpdater();
                } else {
                    $(".ulError").html('Пользователь с таким логином уже существует (либо вы ввели неправильный пароль)');
                    $('.ulError').fadeIn();
                }
            }
        );

    }



    
});



$('.actionSendMessage').click(function(){
    var newMessageText = $('.newMessage input').val();
    $.post("/chat/sendmessage", {message:newMessageText},
        function(data, textStatus, jqXHR)
        {
            if(data == 1) {
                $('.newMessage input').val('');
                loadMessages();
            }
        }
    );
});

$(document).on("click", '.msg', function(event) { 
    elem = $(this);
    if($('body').hasClass('admin-login') && !$(this).hasClass('msg-removed')) {
        var msgid = $(elem).attr('msgid');
        var visible = 0;

        $(elem).addClass("msg-removed");
        
        console.log('mark as innapropriate');

        $.post("/chat/hidemessage", {id:msgid, visible:visible},
            function(data, textStatus, jqXHR)
            {
                if(data == 1) {
                    $(elem).addClass("msg-removed");
                } else {
                    console.log('fail');
                }
            }
        );
    }
});

$('.actionReturnMessage').click(function(){
    var msgid = $(this).attr('msgid');
    var visible = 1;

    $.post("/chat/hidemessage", {id:msgid, visible:visible},
            function(data, textStatus, jqXHR)
            {
                
            }
    );

    $(this).parent().fadeOut();
});



function loadUser(){
    $.ajax({
        url : "/chat/getuser",
        type: "GET",
        success: function(data, textStatus, jqXHR)
        {
            if(data != null) {
                var obj = JSON.parse(data);

                localStorage.setItem('username', obj.username);
                localStorage.setItem('role', obj.role);
                localStorage.setItem('id', obj.id);

                $('.information .left b').html(obj.username);
                setRole(obj.role);
                
                $('.chatWindow').fadeIn();

                loadMessages();
                messageUpdater();
                
            } else {
                unsetStorage();
                $('.loginWindow').fadeIn();
                // gotoLogin();
            }

        },
        error: function (jqXHR, textStatus, errorThrown)
        {
     
        }
    });
}

function loadMessages(){
    $.ajax({
        url : "/chat/getmessages",
        type: "GET",
        success: function(data, textStatus, jqXHR)
        {
            $('.messages').html('');
            //console.log(data);
            var obj = JSON.parse(data);
            $.each(obj, function(i, val) {
                apClass = "";
                adminMessage = "";
                if(val.visible == 0) {apClass = "msg-removed";} 
                if(val.user.role == 2) {adminMessage = "msg-admin";} 
                $('.messages').append("<div class='msg "+apClass+" "+adminMessage+"' msgid='"+val.id+"'><b>"+val.user.username+"</b>: "+val.text+"</div>");
            });
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
     
        }
    });
    
}

function messageUpdater(){
    setInterval(function(){
        loadMessages();
    },2000);
}

/* set role */

function setRole(role){
    if(role == 1) {
        // role = user;
        roletext = 'Пользователь';
    }
    if(role == 2) {
        // role = admin;
        roletext = 'Администратор';
        // set body class
        $('body').addClass("admin-login");
    }
    if(role == 3) {
        roletext = 'Гость';
    }
    $('.information .left span').html(roletext);
}


function guestLogin(){
    $('.loginWindow').hide();
    $('.newMessage').hide();
    $('.chatWindow').fadeIn();

    setRole(3);

    loadMessages();
    messageUpdater();
}

function logout(){
    unsetStorage();
    $('body').fadeOut();
    setTimeout(function(){
        location.reload();

    },2000);
}


/* unset localstorage vars */

function unsetStorage(){
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
}