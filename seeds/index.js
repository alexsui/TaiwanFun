const mongoose = require('mongoose');
const moment=require("moment");
moment().format();

const Article = require('../models/article');

mongoose.connect('mongodb://localhost:27017/my_website', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const seedDB = async () => {
    await Article.deleteMany({});
    await Article.insertMany([{
        title:"日月潭",
        category:"attraction",
        images:[
            {
                url : "https://res.cloudinary.com/dtazzwys1/image/upload/v1607233343/TaiwanFun/hdut1caprckb2zgl3v7n.jpg",
                filename : "TaiwanFun/hdut1caprckb2zgl3v7n" 
            },
            { 
                url : "https://res.cloudinary.com/dtazzwys1/image/upload/v1607233343/TaiwanFun/thg4fsx43leb6gl5r36f.jpg",
                filename : "TaiwanFun/thg4fsx43leb6gl5r36f" 
            }
        ],
        //image:"https://images.unsplash.com/photo-1600168488589-d88081e77cd0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1022&q=80",
        city:"NAN",
        createDate:moment().format('YYYY-MM-DD hh:mm a'),
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum libero eros, malesuada faucibus justo porta eget. Sed sit amet urna nunc. Nullam ullamcorper urna justo, ut imperdiet dui vehicula viverra. Suspendisse sagittis eget metus id hendrerit",
        author:"5fcb33163c93971d2ccb9326",
    },{
        title:"開元路虱目魚",
        category:"food",
        images:[
            {
                url : "https://res.cloudinary.com/dtazzwys1/image/upload/v1607233343/TaiwanFun/hdut1caprckb2zgl3v7n.jpg",
                filename : "TaiwanFun/hdut1caprckb2zgl3v7n" 
            },
            { 
                url : "https://res.cloudinary.com/dtazzwys1/image/upload/v1607233343/TaiwanFun/thg4fsx43leb6gl5r36f.jpg",
                filename : "TaiwanFun/thg4fsx43leb6gl5r36f" 
            }
        ],
        //image:"https://lh3.googleusercontent.com/z7Lkt9ncXb3FpkyneU-Ow28SCeurLaQwJu8EjGfyTyXMcqoFpzSsscd90kF0qX-UgKLIKABn3b4XQQ_Wtf7_z7FrB8CPjpo=s600",
        city:"TNN",
        createDate:moment().format('YYYY-MM-DD hh:mm a'),
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum libero eros, malesuada faucibus justo porta eget. Sed sit amet urna nunc. Nullam ullamcorper urna justo, ut imperdiet dui vehicula viverra. Suspendisse sagittis eget metus id hendrerit",
        author:"5fcb33163c93971d2ccb9326",
    },
    {
        title:"阿里山",
        category:"attraction",
        images:[
            {
                url : "https://res.cloudinary.com/dtazzwys1/image/upload/v1607233343/TaiwanFun/hdut1caprckb2zgl3v7n.jpg",
                filename : "TaiwanFun/hdut1caprckb2zgl3v7n" 
            },
            { 
                url : "https://res.cloudinary.com/dtazzwys1/image/upload/v1607233343/TaiwanFun/thg4fsx43leb6gl5r36f.jpg",
                filename : "TaiwanFun/thg4fsx43leb6gl5r36f" 
            }
        ],
        //image:"https://images.unsplash.com/photo-1601399237877-39d1c2d99b70?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
        city:"CYI",
        createDate:moment().format('YYYY-MM-DD hh:mm a'),
        author:"5fcb33163c93971d2ccb9326",
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum libero eros, malesuada faucibus justo porta eget. Sed sit amet urna nunc. Nullam ullamcorper urna justo, ut imperdiet dui vehicula viverra. Suspendisse sagittis eget metus id hendrerit",
    },{
        title:"牛肉湯",
        category:"food",
        images:[
            {
                url : "https://res.cloudinary.com/dtazzwys1/image/upload/v1607233343/TaiwanFun/hdut1caprckb2zgl3v7n.jpg",
                filename : "TaiwanFun/hdut1caprckb2zgl3v7n" 
            },
            { 
                url : "https://res.cloudinary.com/dtazzwys1/image/upload/v1607233343/TaiwanFun/thg4fsx43leb6gl5r36f.jpg",
                filename : "TaiwanFun/thg4fsx43leb6gl5r36f" 
            }
        ],
        //image:"https://cc.tvbs.com.tw/img/program/upload/2018/10/09/20181009212526-e8f06146.jpg",
        city:"TNN",
        createDate:moment().format('YYYY-MM-DD hh:mm a'),
        author:"5fcb33163c93971d2ccb9326",
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum libero eros, malesuada faucibus justo porta eget. Sed sit amet urna nunc. Nullam ullamcorper urna justo, ut imperdiet dui vehicula viverra. Suspendisse sagittis eget metus id hendrerit",
        },
        {
            title:"抹茶山",
            category:"attraction",
            images:[
                {
                    url : "https://res.cloudinary.com/dtazzwys1/image/upload/v1607233343/TaiwanFun/hdut1caprckb2zgl3v7n.jpg",
                    filename : "TaiwanFun/hdut1caprckb2zgl3v7n" 
                },
                { 
                    url : "https://res.cloudinary.com/dtazzwys1/image/upload/v1607233343/TaiwanFun/thg4fsx43leb6gl5r36f.jpg",
                    filename : "TaiwanFun/thg4fsx43leb6gl5r36f" 
                }
            ],
            //image:"https://images.unsplash.com/photo-1455305049585-41b8d277d68a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
            city:"ILA",
            createDate:moment().format('YYYY-MM-DD hh:mm a'),
            author:"5fcb33163c93971d2ccb9326",
            content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum libero eros, malesuada faucibus justo porta eget. Sed sit amet urna nunc. Nullam ullamcorper urna justo, ut imperdiet dui vehicula viverra. Suspendisse sagittis eget metus id hendrerit",
        },
        {
            title:"太陽餅",
            category:"food",
            images:[
                {
                    url : "https://res.cloudinary.com/dtazzwys1/image/upload/v1607233343/TaiwanFun/hdut1caprckb2zgl3v7n.jpg",
                    filename : "TaiwanFun/hdut1caprckb2zgl3v7n" 
                },
                 { 
                    url : "https://res.cloudinary.com/dtazzwys1/image/upload/v1607233343/TaiwanFun/thg4fsx43leb6gl5r36f.jpg",
                    filename : "TaiwanFun/thg4fsx43leb6gl5r36f" }
            ],
            //image:"http://www.ifhouse.com.tw/upload_file/ifhouse/901/15299979011.jpg",
            city:"TXG",
            createDate:moment().format('YYYY-MM-DD hh:mm a'),
            author:"5fcb33163c93971d2ccb9326",
            content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum libero eros, malesuada faucibus justo porta eget. Sed sit amet urna nunc. Nullam ullamcorper urna justo, ut imperdiet dui vehicula viverra. Suspendisse sagittis eget metus id hendrerit",
        },
        {
            title:"太陽餅",
            category:"food",
            images:[
                {
                    url : "https://res.cloudinary.com/dtazzwys1/image/upload/v1607233343/TaiwanFun/hdut1caprckb2zgl3v7n.jpg",
                    filename : "TaiwanFun/hdut1caprckb2zgl3v7n" 
                },
                 { 
                    url : "https://res.cloudinary.com/dtazzwys1/image/upload/v1607233343/TaiwanFun/thg4fsx43leb6gl5r36f.jpg",
                    filename : "TaiwanFun/thg4fsx43leb6gl5r36f" }
            ],
            //image:"http://www.ifhouse.com.tw/upload_file/ifhouse/901/15299979011.jpg",
            city:"TXG",
            createDate:moment().format('YYYY-MM-DD hh:mm a'),
            author:"5fcb33163c93971d2ccb9326",
            content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum libero eros, malesuada faucibus justo porta eget. Sed sit amet urna nunc. Nullam ullamcorper urna justo, ut imperdiet dui vehicula viverra. Suspendisse sagittis eget metus id hendrerit",
        },
        {
            title:"太陽餅",
            category:"food",
            images:[
                {
                    url : "https://res.cloudinary.com/dtazzwys1/image/upload/v1607233343/TaiwanFun/hdut1caprckb2zgl3v7n.jpg",
                    filename : "TaiwanFun/hdut1caprckb2zgl3v7n" 
                },
                 { 
                    url : "https://res.cloudinary.com/dtazzwys1/image/upload/v1607233343/TaiwanFun/thg4fsx43leb6gl5r36f.jpg",
                    filename : "TaiwanFun/thg4fsx43leb6gl5r36f" }
            ],
            //image:"http://www.ifhouse.com.tw/upload_file/ifhouse/901/15299979011.jpg",
            city:"TXG",
            createDate:moment().format('YYYY-MM-DD hh:mm a'),
            author:"5fcb33163c93971d2ccb9326",
            content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum libero eros, malesuada faucibus justo porta eget. Sed sit amet urna nunc. Nullam ullamcorper urna justo, ut imperdiet dui vehicula viverra. Suspendisse sagittis eget metus id hendrerit",
        },
        {
            title:"抹茶山",
            category:"attraction",
            images:[
                {
                    url : "https://res.cloudinary.com/dtazzwys1/image/upload/v1607233343/TaiwanFun/hdut1caprckb2zgl3v7n.jpg",
                    filename : "TaiwanFun/hdut1caprckb2zgl3v7n" 
                },
                 { 
                    url : "https://res.cloudinary.com/dtazzwys1/image/upload/v1607233343/TaiwanFun/thg4fsx43leb6gl5r36f.jpg",
                    filename : "TaiwanFun/thg4fsx43leb6gl5r36f" }
            ],
            //image:"https://images.unsplash.com/photo-1455305049585-41b8d277d68a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
            city:"ILA",
            createDate:moment().format('YYYY-MM-DD hh:mm a'),
            author:"5fcb33163c93971d2ccb9326",
            content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum libero eros, malesuada faucibus justo porta eget. Sed sit amet urna nunc. Nullam ullamcorper urna justo, ut imperdiet dui vehicula viverra. Suspendisse sagittis eget metus id hendrerit",
        },
        {
            title:"抹茶山",
            category:"attraction",
            images:[
                {
                    url : "https://res.cloudinary.com/dtazzwys1/image/upload/v1607233343/TaiwanFun/hdut1caprckb2zgl3v7n.jpg",
                    filename : "TaiwanFun/hdut1caprckb2zgl3v7n" 
                },
                 { 
                    url : "https://res.cloudinary.com/dtazzwys1/image/upload/v1607233343/TaiwanFun/thg4fsx43leb6gl5r36f.jpg",
                    filename : "TaiwanFun/thg4fsx43leb6gl5r36f" }
            ],
            //image:"https://images.unsplash.com/photo-1455305049585-41b8d277d68a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
            city:"ILA",
            createDate:moment().format('YYYY-MM-DD hh:mm a'),
            author:"5fcb33163c93971d2ccb9326",
            content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum libero eros, malesuada faucibus justo porta eget. Sed sit amet urna nunc. Nullam ullamcorper urna justo, ut imperdiet dui vehicula viverra. Suspendisse sagittis eget metus id hendrerit",
        },
        
        
    ]);
    
    
}

seedDB().then(() => {
    mongoose.connection.close();
})