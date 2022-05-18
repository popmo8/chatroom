# Chatroom     by Morris Liu

### How to use 

1.登入介面:  
    (1)共有兩種登入方式，註冊帳號或google登入。若要使用google登入，直接點擊Sign in with google button，即可使用google帳號登入。若要使用註冊帳號登入，直接在email及password欄位輸入要註冊的email和password，點擊New account button，於上方prompt輸入欲註冊姓名，跳出success signup的訊息，即註冊成功，在email及password欄位輸入註冊的email和password，即可登入。  
    (2)登入成功後，即跳轉進聊天室介面。  
  
2.聊天室介面  
    (1)左上角為現在登入user姓名。  
    (2)左下角NEW ROOM Button:點擊並在上方輸入欲建立聊天室名稱，左側Room list欄位就會出現新建立的聊天室。聊天室建立完成後，右側聊天室欄位會自動跳至此聊天室。  
    (3)左下角ADD USER button:點擊前，需先選擇一個聊天室，點擊後，輸入想要讓他加入此聊天室的user名稱(這個user必須註冊過或使用google登入過)，若顯示"{此user} is in {此room}"，表示加入成功。  
    (4)左下角LOG OUT Button:點擊即登出，頁面跳轉至登入頁面。  
    (5)聊天室上方顯示現在user位於的聊天室名稱。  
    (6)在聊天室中，於下方訊息欄輸入訊息，點擊SEND button，在聊天室中的每位成員都可以看到訊息，其他人的訊息會顯示在左邊，自己的訊息會顯示在右邊。  
    (7)user登出再登入後，可看到先前的room list及聊天室資料，並繼續使用聊天室。  


### Others

1.使用firebase伺服器  
    (1)realtime data以及account authentication都透過firebase資料庫  
    (2)firebase授權規則設定:只要玩家有登入即可read和write database中的資料。  
  
2.使用React  
    (1)使用MUI Grid製作響應式網頁(RWD)，項目會按比例顯示於網頁中。  
  
3.使用Webpack包裝  

### Firebase page link

https://chatroom-dd89f.web.app/

