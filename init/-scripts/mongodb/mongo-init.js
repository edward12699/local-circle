db = new Mongo().getDB("local-circle");

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
