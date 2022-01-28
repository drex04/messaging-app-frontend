import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function MessageList() {
    let navigate = useNavigate()
    
    useEffect(() => {
        // Check if user is logged in and reroute to login page if not
        let authToken = localStorage.getItem('Auth Token');
        if (authToken) {
            navigate('/messages')
        }
        if (!authToken) {
            navigate('/')
        }

    }, [])
    
    return (
        <div>Message List goes here</div>
    )
}