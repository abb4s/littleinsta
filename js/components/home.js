import React from 'react';
import Post from './post';
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={loading:true,posts:[]}
        fetch('/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `{
                posts{
                  caption,
                  pictureUrl
                }
              }`
            }),
          }).then(response => {
            return response.json();
          }).then((response)=>{
            this.setState({loading:false,posts:response.data.posts})
          });
    }
    getAllposts(){

        return this.state.posts.map((post)=>{
            return(<Post post={post}/>)
        })
    }
    render(){
        if(this.state.loading){
            return(
                <div>loading</div>
            )
        }
        else{
            return(
                <div className="main">{this.getAllposts()}</div>
            )
        }

    }
}
export default Home