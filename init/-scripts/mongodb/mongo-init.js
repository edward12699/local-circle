db = new Mongo().getDB("local-circle");

// 这段产生的 不是admin，在docker-compose中定义的那个由于指定了initroot属性，所以是admin
//mongodb://local:local-circle@47.96.147.83:27017/local-circle?authSource=admin
//or
//mongodb://local:circle@47.96.147.83:27017/local-circle
db.createUser({
  user: 'local',
  pwd: 'circle',  // Or use environment variables to inject the password.
  roles: [
    {
      role: 'readWrite',
      db: 'local-circle',
    },
  ],
});


// 如果你需要在数据库中创建集合并初始化一些数据，你可以在这里添加更多的命令。
db.createCollection("myCollection");
db.createCollection("users");
db.createCollection("posts");
db.createCollection("replies");
db.createCollection("votes");
db.myCollection.insert({ myKey: "myValue" });
