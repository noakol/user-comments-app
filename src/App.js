import React, {Component} from 'react';
import {CommentFeed} from './components';
import Loader from './components/common/Loader';

export default class App extends Component {
    render() {
        return (
            <div className="cf-container">
                <Loader>
                    <CommentFeed /> 
                </Loader>
            </div>
        );
    }
}