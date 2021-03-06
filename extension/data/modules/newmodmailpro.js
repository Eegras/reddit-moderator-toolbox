function newmodmailpro() {
    var self = new TB.Module('New Mod Mail Pro');
    self.shortname = 'NewModMail';

////Default settings
    self.settings['enabled']['default'] = false;
    self.config['betamode'] = true;

    self.register_setting('modmaillink', {
        'type': 'selector',
        'values': ['All modmail', 'New', 'In Progress', 'Archived', 'Highlighted', 'Mod Discussions', 'Notifications'],
        'default': 'all_modmail',
        'title': 'Change the modmail link to open a different modmail view by default.'
    });

    self.register_setting('openmailtab', {
        'type': 'boolean',
        'default': true,
        'title': 'Open modmail in a new tab.'
    });

    self.register_setting('modmailnightmode', {
        'type': 'boolean',
        'default': false,
        'title': 'Open modmail in nightmode'
    });

    // All stuff we want to do when we are on new modmail
    if (TBUtils.isNewModmail) {
        // Add a class to body
        var $body = $('body');

        $body.addClass('tb-new-modmail');

        // ready some variables.

        var modMailNightmode = self.setting('modmailnightmode');

        if (modMailNightmode) {
            // Let's make sure RES nightmode doesn't mess things up.
            $('html, body').removeClass('res-nightmode');

            // Now enable toolbox nightmode
            $('html').addClass('tb-nightmode');
        }
    }

    // Below all stuff we do when we are NOT on new modmail.
    if (!TBUtils.isNewModmail) {

        // ready some variables.
        var modmailLink = self.setting('modmaillink'),
            openMailTab = self.setting('openmailtab');


        // Let's mess around with the link to modmail.
        var $newModmailLinkElement = $('#new_modmail'),
            newModmailBaseUrl = 'https://mod.reddit.com/mail/';

        // Open modmail in a new tab if the option is selected
        if (openMailTab) {
            $newModmailLinkElement.attr('target', '_blank');
        }

        // let's replace urls.
        switch(modmailLink) {
            case 'all_modmail':
                $newModmailLinkElement.attr('href', newModmailBaseUrl + 'all');

                break;
            case 'new':
                $newModmailLinkElement.attr('href', newModmailBaseUrl + 'new');

                break;
            case 'in_progress':
                $newModmailLinkElement.attr('href', newModmailBaseUrl + 'inprogress');

                break;
            case 'archived':
                $newModmailLinkElement.attr('href', newModmailBaseUrl + 'archived');

                break;
            case 'highlighted':
                $newModmailLinkElement.attr('href', newModmailBaseUrl + 'highlighted');

                break;
            case 'mod_discussions':
                $newModmailLinkElement.attr('href', newModmailBaseUrl + 'mod');

                break;
            case 'notifications':
                $newModmailLinkElement.attr('href', newModmailBaseUrl + 'notifications');

        }

    }

    TB.register_module(self);
}

(function () {
    window.addEventListener("TBModuleLoaded", function () {
        newmodmailpro();
    });
})();
