<?php
namespace app\models;

use Yii;
use yii\db\ActiveRecord;
use yii\base\Model;

class ChatUsers extends ActiveRecord
{
    public static function tableName()
    {
        return 'chat_users';
    }

    public static function signup($username, $password, $role = 1){
        $signup = new ChatUsers();
        $signup->username = $username;
        $signup->password = $password;
        $signup->role = $role;
        $signup->save();
    }

    public static function login($username, $password){
        $findone = ChatUsers::findOne(['username' => $username, 'password' => $password]);
        if(isset($findone)) {
            return 1;
        } else {
            return 0;
        }
    }

    public static function getUserInfo($username){
        $finduser = ChatUsers::find()->select(['id', 'role', 'username'])->where(['username' => $username])->asArray()->one();
        return $finduser;
    }

    public static function changeRole($id){
        $user = ChatUsers::findOne($id);

        $currentRole = $user->role;
        if($currentRole == 1){
            $user->role = 2;
        }
        if($currentRole == 2){
            $user->role = 1;
        }

        $user->save();

        return 1;
    }

}
