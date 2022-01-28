import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllMessages } from './utils/data.js'


export default function MessageList(props) {
    let messages = props.messages;
    let setMessages = props.setMessages;
    let subject = props.subject;
    let body = props.body;
    let navigate = useNavigate();

    // Handling changes & submissions of new post form
    function handleSubjectChange(event) {
    props.onSubjectChange(event.target.value);
    }
    function handleBodyChange(event) {
    props.onBodyChange(event.target.value);
    }
    function handleSubmit(event) {
    props.onSubmit(event);
    }
    

    useEffect(() => {
        // Check if user is logged in and reroute to login page if not
        let authToken = localStorage.getItem('Auth Token');
        if (authToken) {
            navigate('/messages')
        }
        if (!authToken) {
            navigate('/')
        }

        let mounted = true; // to prevent memory leaks

        // Get all existing messages
        getAllMessages(setMessages, mounted)

        return () => {
            mounted = false; // to prevent memory leaks
        }
        
    }, [setMessages])
    

    // Create array of message JSX components
    let messageArray = [];
    Object.entries(messages).forEach((entry) => {
        const [key, value] = entry;
        messageArray.push(
          <div key={key} className="message-container">
            <h3>
              {value.userEmail}: {value.subject}
            </h3>
            <p>{value.body}</p>
            <p className="date">Last updated: {value.dateUpdated}</p>
            <p className="date">Posted on: {value.dateCreated}</p>
          </div>
        );
    })

    return (
      <div className="message-page">
        <div className="new-message-form">
          <form onSubmit={handleSubmit}>
            <label>
              Add new post:
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={handleSubjectChange}
              />
              <textarea
                placeholder="Body"
                value={body}
                onChange={handleBodyChange}
              />
              <input type="submit" value="Submit" />
            </label>
          </form>
        </div>
        <div className="message-list">{messageArray}</div>
      </div>
    );
}