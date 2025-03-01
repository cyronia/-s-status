const NotificationProvider = require("./notification-provider");
const axios = require("axios");

class Pushy extends NotificationProvider {

    name = "pushy";

    /**
     * @inheritdoc
     */
    async send(notification, msg, monitorJSON = null, heartbeatJSON = null) {
        let okMsg = "Sent Successfully.";

        try {
            await axios.post(`https://api.pushy.me/push?api_key=${notification.pushyAPIKey}`, {
                "to": notification.pushyToken,
                "data": {
                    "message": "-s-status"
                },
                "notification": {
                    "body": msg,
                    "badge": 1,
                    "sound": "ping.aiff"
                }
            });
            return okMsg;
        } catch (error) {
            this.throwGeneralAxiosError(error);
        }
    }
}

module.exports = Pushy;
