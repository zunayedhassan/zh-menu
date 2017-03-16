
"use strict";

function ZhMenu(navId) {
    var menuSelector                   = "#" + navId;
    var mobileNavigationButtonSelector = ".zh-menu-mobile-nav-button";
    var mobileMenuNavigationButton     = '<button class="zh-menu-mobile-nav-button"><i class="material-icons">view_list</i> <span>Menu</span></button>';
    var screenWidthLimit               = 640;
    var menuBackup                     = null;
    var menuIconExpand                 = "keyboard_arrow_up";
    var menuIconCollapse               = "keyboard_arrow_down";
    var expandIcon                     = "chevron_right";

    function _print(text) {
        console.log(text);
    }

    function _getDocumentWidth() {
        return parseFloat(jQuery(document).width());
    }

    function IsSmallerScreen() {
        return ((_getDocumentWidth() < screenWidthLimit) ? true : false);
    }

    function _isMobileNavigationButtonExists(menuSelector) {
        return ((jQuery(menuSelector).children(".zh-menu-mobile-nav-button").length === 0) ? false : true);
    }

    function _onWindowResize() {
        jQuery(window).resize(
                function () {
                    if (((menuBackup !== null) || (menuBackup !== undefined)) && !IsSmallerScreen()) {
                        jQuery(menuSelector).html(menuBackup);
                    }

                    _menuReset();
                }
        );
    }

    function _isMenuButtonExpanded() {
        if ((jQuery(menuSelector + " > ul").attr("data-zh-menu-isExpanded") === undefined) || 
            (jQuery(menuSelector + " > ul").attr("data-zh-menu-isExpanded") === "false")) {

            return false;
        }

        return true;
    }

    function _onMobileMenuButtonClicked() {
        jQuery(mobileNavigationButtonSelector).click(function(event) {
            var isMenuButtonExpended = _isMenuButtonExpanded();

            if (isMenuButtonExpended) {
                _applyMenuCollapse(isMenuButtonExpended);
            }
            else {
                _applyMenuExpand(isMenuButtonExpended);
            }
        });
    }

    function _applyMenuCollapse(isMenuButtonExpended) {
        jQuery(menuSelector + " > ul").slideUp();
        jQuery(menuSelector + " > ul").attr("data-zh-menu-isExpanded", (!isMenuButtonExpended).toString());

        _applyMenuItemCollapse(menuSelector + " > ul li", false);
    }

    function _applyMenuExpand(isMenuButtonExpended) {
        jQuery(menuSelector + " > ul").slideDown();
        jQuery(menuSelector + " > ul").attr("data-zh-menu-isExpanded", (!isMenuButtonExpended).toString());
    }

    function _isMenuItemClicked(target) {
        if ((jQuery(target).attr("data-zh-menu-isExpanded") === undefined) || 
            (jQuery(target).attr("data-zh-menu-isExpanded") === "false")) {

            return false;
        }

        return true;
    }

    function _onMenuListItemClicked() {
        // Click on Anchor (a)
        jQuery(menuSelector + " li a").unbind().click(function (event) {
            var parent = jQuery(event.target).parent();
            var isMenuItemClicked = _isMenuItemClicked(event.target);

            if (isMenuItemClicked) {
                _applyMenuItemCollapse(parent, isMenuItemClicked);
            }
            else {
                _applyMenuItemExpand(parent, isMenuItemClicked);
            }

            if (jQuery(event.target).attr("href") === "#") {
                event.preventDefault();
            }
        });

        // Click on Anchor Text (a span)
        jQuery(menuSelector + " li a span").click(function (event) {
            var parent = jQuery(event.target).parent().parent();
            var isMenuItemClicked = _isMenuItemClicked(jQuery(event.target).parent());

            if (isMenuItemClicked) {
                _applyMenuItemCollapse(parent, isMenuItemClicked);
            }
            else {
                _applyMenuItemExpand(parent, isMenuItemClicked);
            }

            if (jQuery(event.target).parent().attr("href") === "#") {
                event.preventDefault();
            }
        });
    }

    function _applyMenuItemCollapse(parent, isMenuItemClicked) {
        if (IsSmallerScreen() && (parent !== undefined) && (parent !== null) && (isMenuItemClicked !== undefined)) {
            jQuery(parent).children("ul").slideUp();
            jQuery(parent).children("a").attr("data-zh-menu-isExpanded", (!isMenuItemClicked).toString());

            var spans = jQuery(jQuery(parent).children("a")[0]).children("span");

            if (spans.length > 1) {
                jQuery(jQuery(spans[1]).children("i")[0]).text(menuIconCollapse);
            }

            // Collapse all the subsequent menu item too
            if (jQuery(parent).children("ul").has("li")) {
                for (var i = 0; i < jQuery(parent).children("ul").children("li").length; i++) {
                    var item = jQuery(parent).children("ul").children("li")[i];
                    _applyMenuItemCollapse(item, false.toString());
                }
            }
        }
    }

    function _applyMenuItemExpand(parent, isMenuItemClicked) {
        if (IsSmallerScreen() && (parent !== undefined) && (parent !== null) && (isMenuItemClicked !== undefined)) {
            jQuery(parent).children("ul").slideDown();
            jQuery(jQuery(parent).children("a")).attr("data-zh-menu-isExpanded", (!isMenuItemClicked).toString());

            var spans = jQuery(jQuery(parent).children("a")[0]).children("span");

            if (spans.length > 1) {
                jQuery(jQuery(spans[1]).children("i")[0]).text(menuIconExpand);
            }
        }
    }

    function _initializeForSubMenu(element) {
        var dropDownIcon = null;

        if (!IsSmallerScreen()) {
            dropDownIcon = expandIcon;
        }
        else {
            dropDownIcon = menuIconCollapse;
        }

        if ((element !== undefined) || (element !== null)) {
            var listItems = jQuery(element).children("li");

            for (var i = 0; i < listItems.length; i++) {
                var listItem = listItems[i];

                if (jQuery(listItem).children("ul").length !== 0) {
                    var text = null;

                    if (jQuery(jQuery(listItem).children("a")[0]).children("span").length > 0) {
                        text = jQuery(jQuery(listItem).children("a")[0]).attr("data-zh-menu-text");
                    }
                    else {
                        text = jQuery(listItem).children("a").text();
                        jQuery(jQuery(listItem).children("a")[0]).attr("data-zh-menu-text", text);
                    }

                    jQuery(listItem)
                            .children("a")
                            .html("<span>" + text + "</span><span><i class='material-icons'>" + dropDownIcon + "</i></span>");

                    for (var j = 0; j < jQuery(listItem).children(" ul").length; j++) {
                        var submenuItem = jQuery(listItem).children(" ul")[j];
                        _initializeForSubMenu(jQuery(submenuItem));
                    }
                }
            }
        }
    }

    function _removeExpandIconFromMainMenuItem() {
        // Remove Icons from Top level, for aesthetic purposes
        if (!IsSmallerScreen()) {
            var mainMenuList = jQuery(menuSelector + " > ul > li");

            for (var i = 0; i < mainMenuList.length; i++) {
                var mainMenuItem = mainMenuList[i];
                var mainMenuItemSpans = jQuery(jQuery(mainMenuItem).children("a")[0]).children("span");

                if (mainMenuItemSpans.length > 1) {
                    jQuery(jQuery(mainMenuItemSpans[1]).children("i")[0]).html("");
                }
            }
        }
    }

    function _initializeSubMenu() {
        _initializeForSubMenu(jQuery(menuSelector + " > ul"));
        jQuery(menuSelector + " li a").addClass("zh-menu-submenu-parent");
        _removeExpandIconFromMainMenuItem();
    }

    function _menuReset() {
        _initializeSubMenu();

        // For Smaller Screen
        if (IsSmallerScreen()) {
            if (!_isMobileNavigationButtonExists(menuSelector)) {
                // Show the Menu Button
                jQuery(menuSelector).prepend(mobileMenuNavigationButton);

                // Add event the button
                _onMobileMenuButtonClicked();
            }

            // Add event to menu item for expanding and collapsing when necessary
            _onMenuListItemClicked();
        }
        // For Larger Screen
        else if (_isMobileNavigationButtonExists(menuSelector)) {
            jQuery(menuSelector).children().remove(mobileNavigationButtonSelector);
        }

        jQuery(".zh-menu ul li").hover(
            function (event) {
                if (!IsSmallerScreen()) {
                    var subMenuItem = jQuery(event.target).parent();
                    jQuery(jQuery(subMenuItem).children("ul")[0]).fadeIn();
                }
            },

            function (event) {
                if (!IsSmallerScreen()) {
                    var subMenuItem = jQuery(event.target).parent();
                    jQuery(jQuery(subMenuItem).children("ul")[0]).fadeOut();
                }
            }
        );

        jQuery(".zh-menu").hover(
                function () { },

                function (event) {
                    if (!IsSmallerScreen()) {
                        jQuery(".zh-menu li ul").fadeOut();
                    }
                }
        );
    }

    ZhMenu.prototype.Initialize = function() {
        menuBackup = jQuery(menuSelector).html();

        if (!jQuery(menuSelector).hasClass("zh-menu")) {
            jQuery(menuSelector).addClass("zh-menu");
        }

        _menuReset();
        _onWindowResize();
    };
}
