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
export function addMessage() {
    axios
        .post("https://messaging-app-db831.ew.r.appspot.com/messages", {
            body: body,
            dateChanged: '',
            dateCreated: '',
            subject: subject,
            userEmail: userEmail,
         })
         .then(function (response) {
             console.log(response);
         })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}


// Update existing message
export function updateMessage() {
  axios
    .put("https://messaging-app-db831.ew.r.appspot.com/messages", {
      body: body,
      dateChanged: "",
      dateCreated: "",
      subject: subject,
      userEmail: userEmail,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}