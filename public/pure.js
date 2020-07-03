(function (window) {
  'use strict';

  var widgetIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
    <defs>
    <style>.a{fill:#4d4d4d;}</style>
    </defs>
    <title>list_view</title>
    <path class="a" d="M5.15,8.7H.55A.55.55,0,0,1,0,8.15V3.55A.55.55,0,0,1,.55,3h4.6a.55.55,0,0,1,.55.55v4.6A.55.55,0,0,1,5.15,8.7ZM1.1,7.6H4.6V4.1H1.1Z"/>
    <path class="a" d="M5.15,17H.55A.55.55,0,0,1,0,16.45v-4.6a.55.55,0,0,1,.55-.55h4.6a.55.55,0,0,1,.55.55v4.6A.55.55,0,0,1,5.15,17ZM1.1,15.9H4.6V12.4H1.1Z"/>
    <path class="a" d="M19.45,8.7H8.87a.55.55,0,0,1-.55-.55V3.55A.55.55,0,0,1,8.87,3H19.45a.55.55,0,0,1,.55.55v4.6A.55.55,0,0,1,19.45,8.7Zm-10-1.1H18.9V4.1H9.42Z"/>
    <path class="a" d="M19.45,17H8.87a.55.55,0,0,1-.55-.55v-4.6a.55.55,0,0,1,.55-.55H19.45a.55.55,0,0,1,.55.55v4.6A.55.55,0,0,1,19.45,17Zm-10-1.1H18.9V12.4H9.42Z"/>
    </svg>`; // Define variables

  var overlayId = 'overlay-widget';
  var overlayClass = 'overlay-widget';
  var overlayContentClass = 'overlay-widget-content';
  var popoverId = 'popover-magic-block';
  var popoverClass = 'popover-magic-block';
  var widgetIconId = 'widget-icon-id'; // distance of the popover to 1.5rem

  var marginPopup = 24; // If user has not input height for item, set default is (2rem) 32px;

  var defaultItemHeight = 32;
  var testIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Status</title><path d="M14.49,2.21A9,9,0,0,0,10,1h0A9,9,0,0,0,1.31,12.33,9,9,0,0,0,10,19a9,9,0,0,0,8.7-11.33A8.91,8.91,0,0,0,14.49,2.21Z" style="fill:#64be00"/><path d="M19.65,7.42A10,10,0,0,0,10,0h0A10,10,0,0,0,1.34,5,10,10,0,0,0,5,18.66,10,10,0,0,0,10,20h0a10,10,0,0,0,8.66-5A9.9,9.9,0,0,0,19.65,7.42ZM5.51,17.79A9,9,0,0,1,2.21,5.5,9,9,0,0,1,10,1h0A9,9,0,1,1,5.51,17.79Z" style="fill:#3c9f00"/></svg>';
  var itemList = [
          {
            prefixIcon: testIcon,
            text: 'Test item is imported',
            link: 'https://gamma.nebula.zyxel.com/cc/ui/index.html',
            suffixIcon: '',
          },
          {
            prefixIcon: testIcon,
            text: 'Test item is imported',
            link: 'https://gamma.nebula.zyxel.com/cc/ui/index.html',
            suffixIcon: '',
          },
          {
            prefixIcon: testIcon,
            text: 'Test item is imported',
            link: 'https://gamma.nebula.zyxel.com/cc/ui/index.html',
            suffixIcon: '',
          },
          {
            prefixIcon: testIcon,
            text: 'Test item is imported',
            link: 'https://gamma.nebula.zyxel.com/cc/ui/index.html',
            suffixIcon: '',
          },
          {
            prefixIcon: testIcon,
            text: 'Test item is imported',
            link: 'https://gamma.nebula.zyxel.com/cc/ui/index.html',
            suffixIcon: '',
          },
        ];
  /**
   * show/hide popup
   * @param {check show/hide} isOpen 
   */

  function togglePopover(isOpen) {
    var $popup = document.getElementById(popoverId);
    var $widgetIconDiv = document.getElementById(widgetIconId);

    if (!$popup) {
      return;
    }

    if (isOpen) {
      updatePosition($popup, $widgetIconDiv);
    }

    $popup.style.visibility = isOpen ? 'visible' : 'hidden';
  }
  /**
   * Add/remove overlay layer to show/hide popup
   * TODO: overlay used to disable scrolling when popup is opening.
   * same as popup/dropdown of select field.
   * @param {check show/hide} isOpen 
   */


  function toggleOverlay(isOpen) {
    var $overlay = document.getElementById(overlayId);

    if (!$overlay) {
      return;
    }

    if (isOpen) {
      $overlay.classList.add(overlayContentClass);
    } else {
      $overlay.classList.remove(overlayContentClass);
    }

    togglePopover(isOpen);
  }
  /**
   * re-render widget icon.
   * @param {*} widgetSvg is content svg icon.
   * @param {*} dataStyle custom style.
   */


  function entry(myzyxelEntryId, dataStyle) {
    var myzyxelEntryBtn = document.getElementById(myzyxelEntryId);

    if (!myzyxelEntryBtn || !itemList || itemList.length < 0) {
      return;
    }

    if (itemList && itemList.length > 0) {
      setListItems(itemList);
    }

    var widgetDiv = document.createElement('div');
    widgetDiv.setAttribute('class', 'widget');
    widgetDiv.innerHTML = widgetIcon;
    widgetDiv.id = widgetIconId;

    if (dataStyle && dataStyle.widthWidgetIcon) {
      widgetDiv.style.width = dataStyle.widthWidgetIcon;
    }

    if (dataStyle && dataStyle.heightWidgetIcon) {
      widgetDiv.style.height = dataStyle.heigthWidgetIcon;
    }

    var $popover = document.getElementById(popoverId);

    if ($popover) {
      var theme = 'light';

      if (dataStyle && dataStyle.theme) {
        theme = dataStyle.theme;
      } else {
        theme = document.getElementById("theme");
      }

      if (theme && theme.toLowerCase() === 'dark') {
        $popover.classList.add('dark');
      } else {
        $popover.classList.remove('dark');
      }

      if (dataStyle && dataStyle.fontStyle) {
        $popover.style.font = dataStyle.fontStyle;
      }
    }

    myzyxelEntryBtn.appendChild(widgetDiv);
  }
  /**
   * add/handle event click to show/hide popover.
   */


  function init(myzyxelEntryId) {
    // embed css
    var linkCssElement = document.createElement('link');
    linkCssElement.rel = 'stylesheet';
    linkCssElement.type = 'text/css';
    linkCssElement.href = `https://flymaple.github.io/public/pure.css?version=${new Date().getTime()}`;
    document.head.appendChild(linkCssElement); // create widget icon

    entry(myzyxelEntryId, ''); // create overlay

    var $overlay = document.createElement('div');
    $overlay.setAttribute('class', overlayClass);
    $overlay.id = overlayId;
    document.body.appendChild($overlay); // create popover (init and hidden)

    var $popover = document.createElement('div');
    $popover.innerHTML = getHtml();
    $popover.id = popoverId;
    $popover.setAttribute('class', popoverClass);
    $popover.style.visibility = 'hidden';
    $overlay.appendChild($popover); // init click event if widgetIcon (DOM) existed

    var myzyxelEntryBtn = document.getElementById(myzyxelEntryId);

    if (myzyxelEntryBtn) {
      window.addEventListener('click', function (e) {
        var $popup = document.getElementById(popoverId);

        if ($popup) {
          if ($popup.contains(e.target) || myzyxelEntryBtn.contains(e.target)) {
            if (myzyxelEntryBtn.contains(e.target) && $popup.style.display === 'block') {
              toggleOverlay(false);
            } else {
              toggleOverlay(true);
            }
          } else {
            toggleOverlay(false);
          }
        } else {
          if (myzyxelEntryBtn.contains(e.target)) {
            toggleOverlay(true);
          }
        }
      });
    }
  }
  /**
   * set/init item list from entry
   * @param {item list has been inputted} items 
   */


  function setListItems(itemsInputed) {
    itemList = itemsInputed;
  }
  /**
   * Get html of item list in popover.
   */


  function getHtml() {
    let html = '<ul>';

    for (let i = 0; i < itemList.length; i++) {
      var item = itemList[i];
      html += `<li style="height: ${item.height ? item.height : defaultItemHeight}px">`;
      html += item.prefixIcon;
      html += getHyperlinkATagStr(item.text, item.link);
      html += '</li>';
    }

    html += '</ul>';
    return html;
  }
  /**
   * calculate and update position of popover.
   * @param {current popup use for update position of popup} $popup
   * @param {use for detect position of widget icon*} widgets
   */


  function updatePosition($popup, widgets) {
    var widthPopup = $popup.getBoundingClientRect().width;
    var heightPopup = $popup.getBoundingClientRect().height; // sizes of screen should correct all browsers/devices

    var actualScreenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || document.body.offsetWidth;
    var actualScreenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || document.body.offsetHeight; // rightPopup: from left screen to last point on the right of widget button ( Magic Block icon).

    var rightPopup = widgets.getBoundingClientRect().right + widthPopup + marginPopup; // bottomPopup: from top screen to last point on the bottom of widget button ( Magic Block icon).

    var bottomPopup = widgets.getBoundingClientRect().bottom + heightPopup + marginPopup;
    var xx = widgets.getBoundingClientRect().left + 'px';
    var yy = widgets.getBoundingClientRect().top + marginPopup + 'px'; // update popup's possition if sizes of popup exceed size of screen

    if (rightPopup > actualScreenWidth) {
      xx = widgets.getBoundingClientRect().right - (rightPopup - actualScreenWidth) + 'px';
    }

    if (bottomPopup > actualScreenHeight) {
      yy = widgets.getBoundingClientRect().top - heightPopup - marginPopup + 'px';
    }

    $popup.style.left = xx;
    $popup.style.top = yy;
  }
  /**
   * Get tag content of an item which is hyperlink/text
   * @param {label/name of item} text 
   * @param {hyperlink} link 
   */


  function getHyperlinkATagStr(text, link) {
    return link ? `<a href="${link}" rel="noopener" target="_blank"><span title="${text}">${text}</span></a>` : `<span title="${text}">${text}</span>`;
  }

  window.MyZyxelEntry = {
    setListItems: setListItems,
    init: init,
    entry: entry,
    toggleOverlay: toggleOverlay,
    togglePopover: togglePopover
  };
})(window);
