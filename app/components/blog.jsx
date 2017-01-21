import React from 'react';
import { Link } from 'react-router';
import Helper from '../helper';

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: true,
            error: null,
        }
    }

    componentDidMount() {
        var docTitle = 'Hugh\'s Blog';
        document.title = docTitle;
        Helper.recordPageview('/', docTitle);
        Helper.listFetch().then(res => {
            return res.json();
        }).then(data => {
            this.setState({
                posts: Helper.postsParse(data),
                loading: false
            });
        }).catch(error => {
            this.setState({
                error: error.message,
                loading: false
            })
        });
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
        var items = Object.keys(this.state.posts).map((val, key) => {
            var post = this.state.posts[val];
            var blockClass = 'block ' + (key % 2 == 0 ? 'left' : 'right');
            return (
                <div key={`post-${key}`} className="list-item">
                    <div className="dot"></div>
                    <div className={blockClass}>
                        <Link to={`/post/${post.createdAt}`}>{post.pureTitle}</Link>
                        <span className="time">{post.shortDate}</span>
                    </div>
                </div>
            );
        });
        return (
            <div className="list-wrap">
                <div className="list-count">当前共 {Object.keys(this.state.posts).length} 篇</div>
                <div className="list-items">{items}</div>
            </div>
        );
    }
}

export default Blog;
