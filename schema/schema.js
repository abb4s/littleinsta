
var {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');
var _ =require('lodash');
var posts=[
    {id:'1',caption:"زیبا نیست ؟",pictureUrl:"1.jpg",userId:'1'
    ,comments:[
        {userId:'1',text:"همیشه شاد باشین"},
        {userId:'1',text:"جای شما خالیست"}
    ]},
    {id:'2',caption:"جهان زیبا!",pictureUrl:"2.jpg",userId:'2'
    ,comments:[
        {userId:'1',text:"سلام خیلی عالی بود "},
        {userId:'2',text:"ایول"},
        {userId:'1',text:"فقط میتونم بگم معرکست"}
    ]}
]
var users=[
    {id:'1',username:"عباس",pictureUrl:"abbas.jpeg"},
    {id:'2',username:"عباس حسینی",pictureUrl:"abbas2.jpeg"},
    {id:'3',username:"طرفداران عباس",pictureUrl:"abbas3.jpeg"},
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
                return _.filter(posts,{userId:parent.id})
            }
        }
    })})
const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: ( ) => ({
        id: { type: GraphQLID },
        userId: {type:GraphQLID},
        caption: { type: GraphQLString },
        pictureUrl:{type: GraphQLString },
        user:{
            type: UserType,
            resolve:(parent,args)=>{
                return _.find(users,{id:parent.userId})
            }
        },
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
        user:{
            type:UserType,
            resolve(parent,args){
                return _.find(users,{id:parent.userId})
            }
        },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        post: {
            type: PostType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return _.find(posts,{id:args.id})
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            args :{ userId: {type:GraphQLID}},
            resolve(parent, args){
                if(args.userId)
                    return _.filter(posts,{userId:args.userId})
                else
                    return posts
            }
        },
        user:{
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return _.find(users,{id:args.id})
            }
        }

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});