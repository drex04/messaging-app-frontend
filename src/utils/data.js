import axios from "axios";

// Get all messages from backend API
export async function getAllMessages(setStateVar, mounted) {
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

// Create new message
export function createMessage(
  userEmail,
  subject,
  body,
  currentDate,
  authToken
) {
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
export async function updateMessage({
  messageId,
  body,
  currentDate,
  dateCreated,
  subject,
  userEmail,
  authToken,
}) {
  axios
    .put(`https://messaging-app-db831.ew.r.appspot.com/messages/${messageId}`, {
      body: body,
      dateUpdated: currentDate,
      dateCreated: dateCreated,
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
