import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import NotFound from 'components/404';
import List from 'components/List';
import Post from 'components/Post';

import 'third-party/ga';
import './style.less';

render((
    <Router history={browserHistory}>
        <Route path="/" component={List} />
        <Route path="/post/:id" component={Post} />
        <Route path="*" component={NotFound} />
    </Router>
), document.getElementById('root'));