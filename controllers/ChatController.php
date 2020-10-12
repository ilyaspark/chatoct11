<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\models\ChatUsers;
use app\models\ChatMessages;


class ChatController extends Controller
{

    public $enableCsrfValidation = false;

    public function init()
    {
        $this->layout = false;
    }


    public function actionIndex()
    {
        return $this->render('/chat/chat');
    }

    /* АВТОРИЗАЦИЯ */

    public function actionAuth()
    {
        $session = Yii::$app->session;

        $username = $_POST['username'];
        $password = $_POST['password'];

        $getUser = ChatUsers::findOne(['username' => $username]);

        if(isset($getUser)) {
            $loginAction = ChatUsers::login($username, $password);
            if($loginAction == 1) { $session->set('username', $username); }
            return $loginAction;
        } else {
            $signupAction = ChatUsers::signup($username, $password);
            $session->set('username', $username);
            return 1;
        }
    }

    /* ПОЛУЧЕНИЕ ИНФОРМАЦИИ ОБ АВТОРИЗИРОВАННОМ ПОЛЬЗОВАТЕЛЕ */

    public function actionGetuser()
    {

        $username = Yii::$app->session->get('username');
        $getUser = ChatUsers::getUserInfo($username);
        $json = json_encode($getUser, true);
        //print_r($getUser);
        return $json;
    }

    /* ПОЛУЧЕНИЕ СООБЩЕНИЙ ЧАТА */

    public function actionGetmessages()
    {
        
        $username = Yii::$app->session->get('username');
        $getUser = ChatUsers::findOne(['username' => $username]);
        $role = $getUser->role;

        $loadmessages = ChatMessages::loadMessages($role);
        $json = json_encode($loadmessages, true);
        
        return $json;
    }

    /* ОТПРАВКА СООБЩЕНИЙ */

    public function actionSendmessage()
    {

        $username = Yii::$app->session->get('username');
        $getUser = ChatUsers::findOne(['username' => $username]);

        $user_id = $getUser->id;
        $message = $_POST['message'];

        $send = ChatMessages::send($user_id, $message);
        return $send;

    }

    /* СКРЫТИЕ СООБЩЕНИЙ АДМИНИСТРАТОРОМ */

    public function actionHidemessage()
    {
        $id = $_POST['id'];
        $visible = $_POST['visible'];

        $username = Yii::$app->session->get('username');
        $getUser = ChatUsers::findOne(['username' => $username]);
        $role = $getUser->role;
        if($role == 2) {
            ChatMessages::messageAction($id, $visible);
            return 1;
        } else {
            return 0;
        }
    }

    /* ИЗМЕНЕНИЕ РОЛИ ПОЛЬЗОВАТЕЛЕМ АДМИНИСТРАТОРОМ */

    public function actionChangerole()
    {
        $id = $_POST['id'];

        $username = Yii::$app->session->get('username');
        $getUser = ChatUsers::findOne(['username' => $username]);
        $role = $getUser->role;
        if($role == 2) {
            $cr = ChatUsers::changeRole($id);
            return $cr;
        } else {
            return 0;
        }

    }


    /* УПРАВЛЕНИЕ СКРЫТЫМИ СООБЩЕНИЯМИ */

    public function actionAdmin()
    {
        $username = Yii::$app->session->get('username');
        $getUser = ChatUsers::findOne(['username' => $username]);
        $role = $getUser->role;
        if($role != 2) {
            die;
        }

        $data['hidden_messages'] = ChatMessages::find()->joinWith('user')->where(['chat_messages.visible' => 0])->asArray()->all();
        return $this->render('/chat/admin', $data);
    }

    /* УПРАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ */

    public function actionUsers()
    {
        $username = Yii::$app->session->get('username');
        $getUser = ChatUsers::findOne(['username' => $username]);
        $role = $getUser->role;
        if($role != 2) {
            die;
        }

        $data['users'] = ChatUsers::find()->asArray()->all();
        return $this->render('/chat/users', $data);
    }


}