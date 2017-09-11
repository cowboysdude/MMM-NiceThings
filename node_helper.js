/* Magic Mirror
 * Module: MMM-Dilbert
 *
 * By Mykle1
 *
 */
const NodeHelper = require('node_helper');
const InsultCompliment = require("insult-compliment");


module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },

     getNice: function () {
     	var self = this;
        result = InsultCompliment.Compliment();
            this.sendSocketNotification('NICE_RESULT', result);
    console.log(result);
            
     },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_NICE') {
            this.getNice(payload);
        }
    }
});
