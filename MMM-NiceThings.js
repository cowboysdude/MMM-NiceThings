/* Magic Mirror
 * Module: MMM-NiceThings
 *
 * By SomeGuy
 *
 */
Module.register("MMM-NiceThings", {

    // Module config defaults.
    defaults: {
        maxWidth: "100%",
        animationSpeed: 3000,           
        initialLoadDelay: 4250,
        retryDelay: 2500,
        updateInterval: 60* 60 * 1000,
    },

    getStyles: function() {
        return ["MMM-NiceThings.css"];
    },
    getScripts: function(){
		return ["moment.js"];
	},

    start: function() {
        Log.info("Starting module: " + this.name);

        requiresVersion: "2.1.0",

    //  Set locale.
        this.scheduleUpdate();
    },

    getDom: function() {
		var nice = this.nice;
		var hour = moment().hour();
		
		 var wrapper = document.createElement("div");
         wrapper.className = "wrapper";
         wrapper.style.maxWidth = this.config.maxWidth;
		var niceDiv = document.createElement("div");
        if (nice == undefined){
		    niceDiv.classList.add("morning", "thin", "large", "bright");
            niceDiv.innerHTML = "";	
		} else {
		if (hour >= 3 && hour < 12) {
			niceDiv.classList.add("morning", "thin", "large", "bright");
            niceDiv.innerHTML = nice;
		} else if (hour >= 12 && hour < 17) {
			niceDiv.classList.add("afternoon", "thin", "large", "bright");
            niceDiv.innerHTML = nice;
		} else {
			niceDiv.classList.add("evening", "thin", "large", "bright");
            niceDiv.innerHTML = nice;
		}
		}
		wrapper.appendChild(niceDiv);

		return wrapper;
	},


    processNice: function(data) {
        this.today = data.Today;
        this.nice = data; 
    console.log(this.nice);
        this.loaded = true;
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getNice();
        }, this.config.updateInterval);
        this.getNice(this.config.initialLoadDelay);
    },

    getNice: function() {
        this.sendSocketNotification('GET_NICE');
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "NICE_RESULT") {
            this.processNice(payload);
            this.updateDom(this.config.animationSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },
});