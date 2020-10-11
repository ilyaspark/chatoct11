<html>
    <head>
        <title>Chat</title>
        <link href="/css/chat.css" rel="stylesheet">
        <script src="http://code.jquery.com/jquery-3.5.1.min.js"></script>
    </head>
    <body>
        <div class="adminInner">


            <?php

            if(empty($hidden_messages)) {
                echo "Нет скрытых сообщений";
            }
            
            foreach($hidden_messages as $value) {

                ?>

                <div class="admin-item">
                    От кого: <?=$value['user']['username']?><br/>
                    Сообщение: <?=$value['text']?><br/>
                    Дата: <?=$value['date']?><br/>
                    <button class="actionReturnMessage" msgid="<?=$value['id']?>">Вернуть в чат</button>
                </div>

                <?

            }


            ?>

        </div>
        <script src="/js/chat.js" ></script>
    </body>
</html>