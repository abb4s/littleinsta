
var {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

var posts=[
    {id:1,caption:"I love you!",pictureUrl:"1.jpg"
    ,comments:[
        {userId:1,text:"همیشه شاد باشین"},
        {userId:1,text:"جای شما خالیست"}
    ]},
    {id:2,caption:"thank you!",pictureUrl:"2.jpg"
    ,comments:[
        {userId:1,text:"سلام خیلی عالی بود "},
        {userId:2,text:"ایول"},
        {userId:1,text:"فقط میتونم بگم معرکست"}
    ]}
]
var users=[
    {id:1,username:"abbas",pictureUrl:"abbas.jpg"},
    {id:2,username:"abbasOffical",pictureUrl:"abbas2.jpg"},
    {id:3,username:"abbas_fan",pictureUrl:"abbas3.jpg"},
]
const UserType=new GraphQLObjectType({
    name: 'User',
    fields: ( ) => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        pictureUrl:{type: GraphQLString },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args){
               var res=[]
               for(p in posts){
                   if(p['userId']==parent.id){
                       res.push(p)
                   }
                   return res
               }
            }
        }
    })})
const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: ( ) => ({
        id: { type: GraphQLID },
        caption: { type: GraphQLString },
        pictureUrl:{type: GraphQLString },
        comments: {
            type: new GraphQLList(CommentType),
            resolve(parent, args){
               return parent.comments 
            }
        }
    })
});

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: ( ) => ({
        text: { type: GraphQLString },
        userId:{ type:GraphQLID},
        post: {
            type: PostType,
            resolve(parent, args){
                for(p in posts){
                    if(p['id']==parent.id){
                        return p["comments"]
                    }
                }
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        post: {
            type: PostType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                for(p in posts){
                    if(p['id']==args.id){
                        return p
                    }
                }
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args){
                return posts
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});