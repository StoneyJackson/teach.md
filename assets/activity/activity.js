/*
   Copyright (C) 2014  Stoney Jackson <dr.stoney@gmail.com>
   License: GPLv3 <http://www.gnu.org/licenses/>
*/

var app = {
    titleShort: 'VC Actvities',
    titleLong: 'Version Control Activities',
    pageTitle: null,
    setPageTitle: function(title) {
        this.pageTitle = title;
        this.updateTitles();
    },
    updateTitles: function() {
        this.updateSiteTitle();
        this.updatePageTitle();
    },
    updateSiteTitle: function() {
        if (this.pageSiteTitle === null) {
            document.title = this.titleShort;
        } else {
            document.title = this.pageTitle + ' | ' + this.titleShort;
        }
    },
    updatePageTitle: function() {
        $('#page-title').html(this.pageTitle);
    },
};
app.updateTitles();

var timer = {
    running: false,
    enabled: false,
    interval: 1000,

    tick: function() {
        if (!this.enabled) {
            this.running = false;
        } else {
            $('#time').html(this.elapsedString());
            setTimeout($.proxy(this.tick, this), this.interval);
        }
    },

    elapsed: function() {
        return this.now() - this.loadStartTime();
    },

    elapsedString: function() {
        var elapsed = this.elapsed();
        var hours = 0;
        var minutes = 0;
        var seconds = 0;

        hours = Math.floor(elapsed / (60 * 60));
        elapsed %= (60 * 60);
        minutes = Math.floor(elapsed / (60));
        elapsed %= 60;
        seconds = elapsed;
        
        hours = this.pad(hours);
        minutes = this.pad(minutes);
        seconds = this.pad(seconds);

        return hours + ':' + minutes + ':' + seconds;
    },

    pad: function(component) {
        var string = '' + component;
        if (string.length < 2) {
            string = '0' + string;
        }
        return string;
    },

    now: function() {
        return parseInt(moment().format('X'));
    },

    saveStartTime: function(time) {
        $('#start').val(time);
    },

    loadStartTime: function() {
        var time = parseInt($('#start').val());
        if (!time) {
            time = this.now();
            this.saveStartTime(time);
        }
        return time;
    },

    start: function() {
        this.enabled = true;
        if (!this.running) {
            setTimeout($.proxy(this.tick, this), this.interval);
            this.running = true;
        }
    },
    stop: function() {
        this.enabled = false;
    },
    reset: function() {
        var time = this.now();
        this.saveStartTime(time);
    },
};

$(function() {
    $('form').sisyphus({
        locationBased: true,
        onRelease: $.proxy(timer.reset, timer),
    });
    $('pre').addClass('panel');
    timer.start();
});
