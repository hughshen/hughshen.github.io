import React from 'react';
import { Link } from 'react-router';
import Helper from '../helper';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null,
            html: null,
            loading: true,
            error: null,
        }
    }

    componentDidMount() {
        Helper.listFetch().then(res => {
            return res.json();
        }).then(data => {
            var posts = Helper.postsParse(data);
            if (posts[this.props.params.id] !== undefined) {
                this.getPost(posts[this.props.params.id]);
            } else {
                this.setState({
                    error: 'The post do not exist.',
                    loading: false,
                })
            }
        }).catch(error => {
            this.setState({
                error: error.message,
                loading: false,
            })
        });
    }

    getPost(data) {
        document.title = data.pureTitle;
        Helper.recordPageview('/post/' + data.createdAt, data.pureTitle);
        this.setState({
            post: data,
            loading: false,
        });
        Helper.postFetch(data.fullTitle).then(res => {
            return res.text();
        }).then(text => {
            this.setState({
                html: text
            })
        }).catch(error => {
            this.setState({
                error: error.message
            })
        })
    }

    htmlMarkup() {
        return {__html: this.state.html};
    }

    render() {
        if (this.state.loading) {
            return (
                <h1>Loading...</h1>
            );
        }
        if (this.state.error) {
            return (
                <h1>{this.state.error}</h1>
            );
        }
        return (
            <div className="detail-wrap">
                <div className="head">
                    <h1>{this.state.post.pureTitle}</h1>
                    <span className="ps">编辑于 {this.state.post.longDate}</span>
                </div>
                <div className="body" dangerouslySetInnerHTML={this.htmlMarkup()}></div>
            </div>
        );
    }
}

export default Post;
