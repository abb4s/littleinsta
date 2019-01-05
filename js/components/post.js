import React from 'react';

class Post extends React.Component{

    render(){
        return(
            <div>
                <img src={"images/"+this.props.post.pictureUrl} width="500" />
                <p>{this.props.post.caption}</p>
            </div>
        )
    }
}
export default Post