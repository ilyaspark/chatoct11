<html>
    <head>
        <title>Chat</title>
        <link href="/css/chat.css" rel="stylesheet">
        <script src="http://code.jquery.com/jquery-3.5.1.min.js"></script>
        
    </head>
    <body>
        <div class="chatWindow">
            <div class="chatInner">
                <div class="information">
                    <div class="left">Вы вошли как <b></b> (<span></span>)</div>
                    <div class="right" onClick="logout();">Выйти</div>
                </div>
                <div class="messages">
                    
                </div>
                <div class="newMessage">
                    <input type="text" placeholder="Введите текст" />
                    <button class="actionSendMessage">Отправить</button>
                </div>
            </div>
        </div>
        <div class="loginWindow">
            <div class="lwInner">
                <div class="loginTitle">Вход</div>
                <div class="useLogin">
                    <div class="ulNote">Если у вас уже есть аккаунт, введите логин и пароль от него. Если нет - мы зарегистрируем новый.</div>
                    <div class="ulError"></div>
                    <div class="loginForm">
                        <input type="text" name="username" placeholder="Логин" />
                        <input type="password" name="password" placeholder="Пароль" />
                        <button class="actionLogin">Войти</button>
                    </div>
                </div>
                <div class="loginAsGuest">
                    <div>- или -</div>
                    <button onClick="guestLogin();">Войти как гость</button>
                </div>
            </div>
        </div>
        <script src="/js/chat.js" ></script>
    </body>
</html>