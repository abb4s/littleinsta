import React from 'react';
import Post from './post';
class PostsList extends React.Component{
    constructor(props){
        super(props);
        this.state={loading:true,posts:[]}
    }
    componentDidMount(){

        var query=`{
            posts{
            id,
            caption,
            pictureUrl,
                user{
                    id,
                    username,
                    pictureUrl
                }
            }
        }`
        fetch('/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query:query
            }),
          }).then(response => {
            return response.json();
          }).then((response)=>{
            this.setState({loading:false,posts:response.data.posts})
          });
    }
    getAllposts(){

        return this.state.posts.map((post)=>{
            return(<Post post={post} _parent={this} key={post.id} loadUserPage={this.loadUserPage} />)
        })
    }
    loadUserPage(userId){
        
        var query=`
        {
            user(id:`+userId+`){
                username,
                id,
                pictureUrl,
                posts{
                    id,
                    pictureUrl,
                    caption,
                    user{
                        id,
                        username,
                        pictureUrl
                    }
                }
            }
        }`
        console.log(query)
        
        fetch('/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query:query
            }),
          }).then(response => {
            return response.json();
          }).then((response)=>{
            alert('ok')
            this.setState({loading:false,posts:response.data.user.posts,user:response.data.user})
          });
          
    }
    getHeader(){
        if(this.state.user){
            return(
            <div className="main-header">
                <img src={"images/"+this.state.user.pictureUrl}/>
                <h1>{this.state.user.username}</h1>
            </div>)
        }
        else{
            return(
                <div className="main-header">
                    خانه
                </div>
            )
        }
    }
    render(){
        if(this.state.loading){
            return(
                <div>loading</div>
            )
        }
        else{
            return(
                <div className="main">
                {this.getHeader()}
                {this.getAllposts()}
                <div style={{clear:"both"}}></div>
                </div>
            )
        }

    }
}
export default PostsList