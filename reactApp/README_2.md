## API
* baseURL:'http://localhost:3002/'

    -user ユーザー情報まわり
        /get (ユーザー取得)
             -ranking (ユーザーランキング取得)
             -article(ユーザーの記事取得)
        /create (ユーザー作成)
        /edit (ユーザー編集)
        /delete (ユーザー削除)
        /follow (フォロー)
        /unfollow (フォロー解除)

    -article 記事周り
        /get (topページの 最新記事：人気記事　取得 
            /mypage (投稿記事)
            /partnerpage (投稿記事)
        /create (記事作成)
        /edit (記事編集)
        /delete (記事削除)
        -favorite 記事お気に入りまわり
            /post (登録)
            /delete　(削除)

    -userpage ユーザーページ
        /follower　（フォロワーリスト）
        /favorite　（お気に入り記事）
        /follow　（フォローリスト）
        
    -tags
        /get(タグ取得)
            -ranking (タグランキング取得)
        /create (タグ作成)
        /edit (タグ編集)
        /delete (タグ削除)

    -login

    -chat


    
    sequlize
    デフォルトでテーブルを登録すると複数形（s）がついてしまいmodelは複数形でテーブルを探してします。
    https://qiita.com/tarotaro1129/items/d2ab9358e74ae7a787a0

    <!-- 
    　画像ファイルをバックエンドサーバに直接保存(firebase使用？)
    　
     -->