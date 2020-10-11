<html>
    <head>
        <title>Admin - Users</title>
        <link href="/css/chat.css" rel="stylesheet">
        <script src="http://code.jquery.com/jquery-3.5.1.min.js"></script>
    </head>
    <body>
        <div class="adminInner">


            <?php

            if(empty($users)) {
                echo "Нет пользователей";
            }
            
            foreach($users as $value) {
                if($value['role'] == 2) {
                    $roletext = 'Администратор';
                    $rolechangetext = "Сделать Пользователем";
                }
                if($value['role'] == 1){
                    $roletext = 'Пользователь';
                    $rolechangetext = "Сделать Администратором";
                }
                ?>

                <div class="admin-item">
                    Юзернейм: <?=$value['username']?><br/>
                    Роль: <?=$roletext?><br/>
                    <button class="actionChangeRole" uid="<?=$value['id']?>"><?=$rolechangetext?></button>
                </div>

                <?

            }


            ?>

        </div>
        <script src="/js/chat.js" ></script>
    </body>
</html>