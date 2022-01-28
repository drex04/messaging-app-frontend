import axios from 'axios';

// Get all messages from backend API
export function getAllMessages(setStateVar, mounted) {
    axios
        .get("https://messaging-app-db831.ew.r.appspot.com/messages")
        .then((res) => {
            if (mounted) {
                setStateVar(res.data);
                return res.data;
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}

// Add new message
export function addMessage(userEmail, subject, body, currentDate, authToken) {
  axios
    .post("https://messaging-app-db831.ew.r.appspot.com/messages", {
      body: body,
      dateCreated: currentDate,
      dateUpdated: currentDate,
      subject: subject,
      userEmail: userEmail,
      authToken: authToken,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}


// Update existing message
export function updateMessage(messageId, subject, body, currentDate) {
  axios
    .put(`https://messaging-app-db831.ew.r.appspot.com/messages/${messageId}`, {
      body: body,
      dateUpdated: currentDate,
      subject: subject,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}