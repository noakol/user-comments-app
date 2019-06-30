
import React, {Component} from 'react'
import Message from './userComments.message';
import {BaseApi, Services, Actions} from '../sdk';
import SearchInputField from './common/searchInputField';
import Utils from './userComments.utils';

export default class CommentFeed extends Component {
    constructor(props) {
        super(props);
        this.api = new BaseApi();
        this.comments = React.createRef();
        this.state = {};
    }

    componentDidMount() {
        this.getComments();
    }

    getComments = async () => {
        const {showLoader, hideLoader} = this.props;
        showLoader();
        try {
            const data = await Actions.getCommentsList(this.api, Services.getCommentsListUrl);
            this.setState({
                data,
                showErrorMsg: false
            });
        } catch(err) {
            console.log(err);
            this.setState({
                showErrorMsg: true
            });
        } finally {
            hideLoader();
        }
    }

    componentDidUpdate() {
        this.scrollToLastMessage();
    }

    scrollToLastMessage() {
        this.comments.current.scrollTop = 0;
    }

    handleAddMessage = async () => {
        const text = this.message.value;
        const username = this.email.value;
        const {showLoader, hideLoader} = this.props;

        if (text.length || username.length) { 
            const payload = {id: Math.floor((Math.random() * 100) + 1), username, text};
            showLoader();
            try {
                const newData = await Actions.addComment(this.api, Services.addToListUrl, payload);
                this.setState({
                    data: newData,
                    showErrorMsg: false
                });
                this.message.value = "";
                this.email.value = "";
            } catch (err) {
                console.log(err);
                this.setState({
                    showErrorMsg: true
                });
            } finally {
                hideLoader();
            }
        }  
    };

    retriveMessagesByEmail = async (value) => {
        const {showLoader, hideLoader} = this.props;
        showLoader();
        try {
            if (value === '') {
                this.getComments();
            } else {
                const newData = await Actions.retriveMessagesByEmail(
                    this.api, Services.getFilteredComments, {username: value});
                this.setState({
                    data: newData,
                    showErrorMsg: false
                });
                
            }
        } catch (err) {
            console.log(err);
            this.setState({
                showErrorMsg: true
            });
        } finally {
            hideLoader()
        }
    }

    validateEmailInput = (e) => {
        e.preventDefault();
        const isValidEmail = this.email.value && Utils.validateEmailInput(this.email.value);

        this.setState({
            isValidEmail
        });
        if (isValidEmail) {
            this.handleAddMessage();
        }
        
    }
    
    render() {
        const {data, isValidEmail = true, showErrorMsg = false} = this.state;
        return (
            <div className="cf-view">
                <div className="cf-title">
                    <h3>Comments Feed</h3>
                </div>
                <div className="cf-form-container">
                    <form className="cf-form" onSubmit={this.validateEmailInput}>
                        <input 
                            id="emailInput"
                            type="text" 
                            name="username" 
                            ref={(input) => {this.email = input}}
                            onBlur={this.validateEmailInput}
                            placeholder="Email" />
                        {!isValidEmail && <label for="emailInput">invalid email formate</label>}
                        <textarea 
                            rows="5" 
                            type="text" 
                            ref={(input) => {this.message = input}} 
                            placeholder="Message" />
                        <input 
                            type="submit"
                            value="Submit" />
                    </form>
                </div>
                <div className="cf-feed">
                    <SearchInputField filterChange={this.retriveMessagesByEmail} />
                    {showErrorMsg && 
                        <span className="cf-error-message">
                            We are having some issues getting your data, please try later.
                        </span>}
                    <ul className="cf-comments" ref={this.comments}>
                        {
                            data && data.length && data.map((message) => 
                                <Message 
                                    {...message}
                                />
                            )
                        }
                    </ul>
                </div>
            </div>
        );
    }
}
