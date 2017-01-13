import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import NotFound from './components/404.jsx';
import Blog from './components/blog.jsx';
import Post from './components/post.jsx';

require('./ga');
require('./main.less');

render((
    <Router history={browserHistory}>
        <Route path="/" component={Blog} />
        <Route path="/post/:id" component={Post} />
        <Route path="*" component={NotFound} />
    </Router>
), document.getElementById('app'));