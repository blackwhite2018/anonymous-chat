import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Message from './Message/Message';
import './Chat.css';

if (!localStorage.getItem('userId')) {
    localStorage.setItem('userId', nanoid());
}

const currentUserId = localStorage.getItem('userId');

export default class Chat extends Component 
{
    state = {
        history: [],
        inputMessage: ''
    };

    loadHistory = () => {
        fetch('http://localhost:7777/messages')
            .then(response => response.json())
            .then(history => {
                this.setState({ history });
            });
    };

    componentDidMount() {
        this.timerId = setInterval(async () => {
            const response = await fetch('http://localhost:7777/messages');
            this.setState({history: await response.json()});
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    handleSubmit = evt => {
        evt.preventDefault();

        const newMessage = {
            userId: currentUserId,
            content: evt.target.querySelector('.form__input').value
        };

        fetch('http://localhost:7777/messages', {
            method: 'POST',
            body: JSON.stringify(newMessage)
        })
    };

    handleChange = ({ target }) => {
        this.setState({
            inputMessage: target.value
        });
    };

    render() {
        return (
            <>
                <div className="history">
                    {
                        this.state.history.map(({ id, userId, content }) => {
                            const className = userId === currentUserId ? ' my-message' : 'message';
                            return (
                                <Message
                                    key={ id }
                                    content={ content }
                                    className={ className }
                                />
                            )
                        })
                    }
                </div>
                <form onSubmit={ this.handleSubmit } action="" method="POST">
                    <input 
                        type="text"
                        name="message"
                        className="form__input"
                        onChange={ this.handleChange }
                        value={ this.state.inputMessage } 
                    />
                    <input type="submit" value="Send" />
                </form>
            </>
        );
    }
};

