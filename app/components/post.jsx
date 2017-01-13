import React from 'react';
import { Link, browserHistory } from 'react-router';
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
        if (Helper.getPost(this.props.params.id)) {
            this.initPost(Helper.getPost(this.props.params.id));
        } else {
            Helper.listFetch().then(res => {
                return res.json();
            }).then(data => {
                var posts = Helper.postsParse(data);
                if (posts[this.props.params.id] !== undefined) {
                    this.initPost(posts[this.props.params.id]);
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
    }

    initPost(data) {
        document.title = data.pureTitle;
        Helper.recordPageview('/post/' + data.createdAt, data.pureTitle);
        this.setState({
            post: data,
            loading: false,
        });
        if (Helper.getPostHtml(data.createdAt)) {
            this.setState({
                html: Helper.getPostHtml(data.createdAt)
            })
        } else {
            Helper.postFetch(data.fullTitle).then(res => {
                return res.text();
            }).then(text => {
                Helper.storePostHtml(data.createdAt, text);
                this.setState({
                    html: text
                })
            }).catch(error => {
                this.setState({
                    error: error.message
                })
            })
        }
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
                    <span className="ps">{this.state.post.longDate}</span>
                </div>
                <div className="body" dangerouslySetInnerHTML={this.htmlMarkup()}></div>
            </div>
        );
    }
}

export default Post;
