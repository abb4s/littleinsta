import React from 'react';

class Post extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showComments:false,

            comments:[]
        }
    }
    loadComments(){
        this.setState({showComments:true,loadingCommetns:true})
        var query=`{
            post(id:`+this.props.post.id+`){
                comments{
                    text,
                    user{
                        id,
                        username,
                        pictureUrl
                    }
                }
            }
          }`
        fetch('/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `{
                post(id:`+this.props.post.id+`){
                    comments{
                        text,
                        user{
                            id,
                            username,
                            pictureUrl
                        }
                    }
                }
              }`
            }),
          }).then(response => {
            return response.json();
          }).then((response)=>{
            console.log(query)
            console.log(response.data.post.comments)
            this.setState({showComments:true,loadingCommetns:false,comments:response.data.post.comments})
          });
    }
    showComments(){
        
        if(this.state.showComments==true)
            if(this.state.loadingCommetns==true)
                return(<p>loading</p>)
            else
                return this.state.comments.map((comment)=>{
                    return(<div className="comment">
                    <a href="" onClick={this.props.loadUserPage.bind(this.props._parent,comment.user.id)} >
                        <img className="avatar" src={"images/"+comment.user.pictureUrl}/>
                    </a>
                    {comment.user.username+":"+comment.text}
                    </div>)
                })
        else
            return(<a href="#" onClick={this.loadComments.bind(this)}>load comments</a>)
        
    }
    render(){
        return(
            <div className="post">
                <div className="post-header">
                    <a href="#" onClick={this.props.loadUserPage.bind(this.props._parent,this.props.post.user.id)}>
                        <img className="avatar" src={"images/"+this.props.post.user.pictureUrl}/>
                    </a>
                    <span>{this.props.post.user.username}</span> 
                </div>
                <div className="post-body">
                    <img className="photo" src={"images/"+this.props.post.pictureUrl} />
                    <p>{this.props.post.caption}</p>
                </div>
                <div className="comments-frame">
                {this.showComments()}
                </div>
                
            </div>
        )

    }
}
export default Post