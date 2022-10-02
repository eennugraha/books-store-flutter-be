fullname jadinya name saja
phoneNumber jadinya string bukan int biar bisa 0 didepan
ditambah image juga

npx sequelize-cli model:generate --name user --attributes name:string,email:string,password:string,address:string,phoneNumber:string,image:string

npx sequelize-cli model:generate --name admin --attributes name:string,email:string,password:string,image:string

npx sequelize-cli model:generate --name publisher --attributes name:string

npx sequelize-cli model:generate --name author --attributes name:string,dateOfBirth:date,city:string,image:string

npx sequelize-cli model:generate --name category --attributes name:string

npx sequelize-cli model:generate --name book --attributes title:string,synopsis:text,publicationYear:date,stock:integer,price:integer,image:string,authorId:integer,categoryId:integer,publisherId:integer

npx sequelize-cli model:generate --name transaction --attributes totalPayment:integer,sentDate:date,transactionCode:string,cartId:integer,userId:integer

npx sequelize-cli model:generate --name cart --attributes quantity:integer,bookId:integer,transactionId:integer

npx sequelize-cli model:generate --name wishlist --attributes userId:integer,bookId:integer
