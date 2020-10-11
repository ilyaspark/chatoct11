<?php
namespace app\models;

use Yii;
use yii\db\ActiveRecord;
use yii\base\Model;
use app\models\ChatUsers;

class ChatMessages extends ActiveRecord
{
    public static function tableName()
    {
        return 'chat_messages';
    }

    public static function send($user_id, $message){
        $msg = new ChatMessages();
        $msg->user_id = $user_id;
        $msg->text = $message;
        $msg->date = date("Y-m-d H:i:s");
        $msg->visible = 1;
        $msg->save();

        return 1;
    }

    public static function loadMessages($role){
        if($role == 2) {
            // role = admin, get all rows
            $getMessages = ChatMessages::find()->joinWith('user')->asArray()->all();
        } else {
            // role = user, get user only
            $getMessages = ChatMessages::find()->joinWith('user')->where(['chat_messages.visible' => 1])->asArray()->all();
        }

        return $getMessages;
        
    }

    public static function messageAction($id, $visible){
        $hide = ChatMessages::findOne($id);
        $hide->visible = $visible;
        $hide->save();
    }


    public function getUser()
    {
            return $this->hasOne(ChatUsers::className(), ['id' => 'user_id']);
    }


}