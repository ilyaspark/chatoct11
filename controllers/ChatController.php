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

    public function actionGetuser()
    {

        $username = Yii::$app->session->get('username');
        $getUser = ChatUsers::getUserInfo($username);
        $json = json_encode($getUser, true);
        //print_r($getUser);
        return $json;
    }

    public function actionGetmessages()
    {
        
        $username = Yii::$app->session->get('username');
        $getUser = ChatUsers::findOne(['username' => $username]);
        $role = $getUser->role;

        $loadmessages = ChatMessages::loadMessages($role);
        $json = json_encode($loadmessages, true);
        
        return $json;
    }

    public function actionSendmessage()
    {

        $username = Yii::$app->session->get('username');
        $getUser = ChatUsers::findOne(['username' => $username]);

        $user_id = $getUser->id;
        $message = $_POST['message'];

        $send = ChatMessages::send($user_id, $message);
        return $send;

    }

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

    public function actionLogout()
    {
        return $this->render('/chat');
    }


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


}