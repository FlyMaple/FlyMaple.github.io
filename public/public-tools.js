/**
 * For each Nebula env to generate bug template
 */
(function () {
    function global_setting(opts) {
        const { copyFunc } = opts;

        if (window.tools) {
            return null;
        }

        window.tools = {
            valid: true,
            copyFunc,
        };

        return window.tools;
    }

    function get_version() {
        try {
            const dom = document.querySelector('.copyright');
            return dom && dom.innerText.match(/(?<=:\s)(.+\d|-\d+)$/)[0];
        } catch (e) {
            console.trace(e);
        }

        return null;
    }

    function get_browser() {
        try {
            const ua = navigator.userAgent;
            let tem;
            let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d|.]+)/i) || [];

            if (/trident/i.test(M[1])) {
                tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                return 'IE ' + (tem[1] || '');
            }

            if (M[1] === 'Chrome') {
                tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
                if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
            }

            M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
            if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
            return M.join(' ');
        } catch (e) {
            console.trace(e);
        }

        return null;
    }

    function get_group_org_site_device() {
        try {
            const p = location.href.match(/(?<=\/)(\w){24}/g);
            const p2 = location.href.match(/(group-wide|help|msp)/);
            const p3 = location.href.match(/((\w+-){4}\w+)/);
            const p4 = location.href.match(/(?<=\/)(\w{24})\/group-wide/);
            let group_id = 'N/A',
                group_name = 'N/A',
                org_id = 'N/A',
                org_name = 'N/A',
                site_id = 'N/A',
                site_name = 'N/A',
                device_id = 'N/A';

            if (p4) {
                group_id = p4[1];
                group_name = document.querySelector('.select-group').innerText;
            } else if (p2 == null) {
                org_id = p ? p[0] : org_id;
                org_name = org_id === 'N/A' ? 'N/A' : document.querySelector('.select-org').innerText;
                if (p && p.length === 2) {
                    site_id = p[1];
                    site_name = document.querySelector('.select-site').innerText;
                }
                if (p3) {
                    device_id = p3[0];
                }
            }

            return {
                group_id,
                group_name,
                org_id,
                org_name,
                site_id,
                site_name,
                device_id,
            };
        } catch (e) {
            console.trace(e);
        }

        return null;
    }
    function go() {
        const title_tmpl = `[Phase11][CC]`;
        const ctx_tmpl = `**[Page]**
{uri}

**[Reproduce step]**
step 1.
step 2.

**[Result]**

**[Expect]**

**[Env]**
Test Time: {t_time}
Build version: {version}
Browser: {browser}
Group name: {group_name}
Group id: {group_id}
Org name: {org_name}
Site name: {site_name}
Org id: {org_id}
Site id: {site_id}
Device id: {device_id}
            `;
        try {
            const uri = location.href;
            const date = new Date();
            const t_time = `${date.toLocaleDateString()} ${('0' + date.getHours()).substr(-2)}:${('0'+date.getMinutes()).substr(-2)}:${('0'+date.getSeconds()).substr(-2)}`;
            const b_version = get_version();
            const browser = get_browser();
            const group_org_site_device = get_group_org_site_device();
            if (b_version == null) {
                throw 'Build version not found.';
            }
            if (browser == null) {
                throw 'Browser not found.';
            }
            if (group_org_site_device == null) {
                throw 'Group/Org/Site/Device info not found.';
            }
            const ctx_result = ctx_tmpl
                .replace(/{uri}/, uri)
                .replace(/{t_time}/, t_time)
                .replace(/{version}/, b_version)
                .replace(/{browser}/, browser)
                .replace(/{group_name}/, group_org_site_device.group_name)
                .replace(/{org_name}/, group_org_site_device.org_name)
                .replace(/{site_name}/, group_org_site_device.site_name)
                .replace(/{group_id}/, group_org_site_device.group_id)
                .replace(/{org_id}/, group_org_site_device.org_id)
                .replace(/{site_id}/, group_org_site_device.site_id)
                .replace(/{device_id}/, group_org_site_device.device_id);

            return {
                subject: title_tmpl,
                description: ctx_result,
            };
        } catch (e) {
            window.tools.valid = false;
            console.trace(e);
            alert('get error, please check F12 console.');
        }
        return null;
    }

    global_setting({
        copyFunc: function () {
            document.getRootNode().addEventListener('copy', function (e) {
                window.tools.valid = true;
                var selection = window.getSelection();
                if (!selection.toString()) {
                    console.log('%c ======== Tools ========', 'color: gold;');
                    console.log('Copy bug template.');
                    e.preventDefault();
                    const re = go();

                    if (re) {
                        e.clipboardData.setData(
                            'text/plain',
                            JSON.stringify({
                                auto_create_rm: null,
                                subject: re.subject,
                                description: re.description,
                            })
                        );
                    }
                }
            });
        },
    });
})();

/**
 * For each Nebula env to create TW/VN RD admin
 */
(function () {
    const proxy = {
        'gamma.nebula.zyxel.com': 'gammaccapi.nebula.zyxel.com',
        'omega.nebula.zyxel.com': 'omegaccapi.nebula.zyxel.com',
    };

    function getOrgId() {
        const match = location.hash.match(/#\/(.+?)(?=\/)/);

        if (match) {
            return match[1];
        }

        return null;
    }

    function getToken() {
        const token = sessionStorage.getItem('nebula://session/x-auth-token');

        return token ? token.replace(/"/g, '') : null;
    }

    function getProxy(hostname) {
        if (hostname.includes('aio')) {
            return `${hostname}:4430`;
        }
        return proxy[hostname];
    }

    function getAdmins(uri, apiUri, orgId, token) {
        return fetch(`${apiUri}/nebula/v3/organization/${orgId}/administrator`, {
            headers: {
                accept: 'application/json, text/plain, */*',
                'accept-language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                'cache-control': 'no-cache',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'x-auth-renew': 'true',
                'x-auth-token': token,
                'x-refer-page': `/${orgId}/organization-wide/configure/administrators`,
            },
            referrer: `${uri}/cc/ui/index.html`,
            referrerPolicy: 'no-referrer-when-downgrade',
            body: null,
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        }).then((res) => res.json());
    }

    function addAdmins(uri, apiUri, orgId, token, admins) {
        return fetch(`${apiUri}/nebula/v3/organization/${orgId}/administrator`, {
            headers: {
                accept: 'application/json, text/plain, */*',
                'accept-language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'x-auth-renew': 'true',
                'x-auth-token': token,
                'x-refer-page': `/${orgId}/organization-wide/configure/administrators`,
            },
            referrer: `${uri}/cc/ui/index.html`,
            referrerPolicy: 'no-referrer-when-downgrade',
            body: JSON.stringify(admins),
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
        }).then((res) => res.json());
    }

    function createSDD9() {
        return {
            org_priv: {
                access: 'FULL',
            },
            site_priv: {},
            sitetag_priv: {},
            admin_name: 'SDD9.RD(Tool)',
            activated: true,
            admin_email: 'sdd9.rd@gmail.com',
        };
    }

    function createVNRD() {
        return {
            org_priv: {
                access: 'FULL',
            },
            site_priv: {},
            sitetag_priv: {},
            admin_name: 'VNRD(Tool)',
            activated: true,
            admin_email: 'vn.zyxel@gmail.com',
        };
    }

    async function addSDD9() {
        const { hostname, protocol } = location;
        const uri = `${protocol}//${hostname}`;
        const proxyUri = getProxy(hostname);
        const apiUri = `${protocol}//${getProxy(hostname)}`;

        const orgId = getOrgId();
        const token = getToken();

        if (!token) {
            alert("Can't find token.");
            return;
        }

        if (!orgId || !token) {
            alert("Can't find org id.");
            return;
        }

        if (!proxyUri) {
            alert("Can't find website proxy.");
            return;
        }

        const admins = (await getAdmins(uri, apiUri, orgId, token)).body;

        if (Array.isArray(admins)) {
            const sdd9 = admins.find((admin) => {
                return admin.admin_email === 'sdd9.rd@gmail.com';
            });
            const vnrd = admins.find((admin) => {
                return admin.admin_email === 'vn.zyxel@gmail.com';
            });

            if (sdd9 && vnrd) {
                alert('Already exists.');
                return;
            }

            const adminPayload = [];
            if (!sdd9) {
                adminPayload.push(createSDD9());
            }
            if (!vnrd) {
                adminPayload.push(createVNRD());
            }
            const response = await addAdmins(uri, apiUri, orgId, token, adminPayload);
            if (response.status === 200) {
                alert('Successful.');
            } else {
                alert('Failure.');
            }
        }

        return Promise.resolve();
    }

    function isIdle() {
        return document.querySelector('.skbutton') == null;
    }

    function injectStyle() {
        const style = document.createElement('style');
        style.setAttribute('rel', 'stylesheet');
        style.innerText = `
          .skbutton {
                  position: fixed;
                  right: 35px;
                  bottom: 45px;
                  display: inline-flex;
                  border-radius: 50%;
                  border: 1px solid #3c9f00;
                  box-sizing: border-box;
                  height: 48px;
                  width: 48px;
                  padding: 3px;
                  box-shadow: 1px 1px 3px 1px #3c9f00;
                  cursor: pointer;
                  background-color: #fff;
                  z-index: 1000;
          }
          .skbutton.hide{
            display: none;
          }
          .skbutton img {
              width: 100%;
              height: auto;
          }
          .sd-rd-button > span {
              display: none;
              color: #3c9f00;
          }
          .skbutton .close {
            position: absolute;
            top: -8px;
            right: -12px;
            padding: 4px;
            cursor: pointer;
          }

          .skbutton.activate--init .sd-rd-button {
            padding: 3px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            box-shadow: 1px 1px 3px 1px #aada8d;
            cursor: pointer;
            background-color: #fff;
            animation: init 0.3s linear forwards;
          }
          .skbutton.activate--init .sd-rm-button {
            padding: 3px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            box-shadow: 1px 1px 3px 1px #aada8d;
            cursor: pointer;
            background-color: #fff;
            animation: item-2 0.5s 0.5s linear forwards;
          }
          .skbutton [class*=-button] {
            position: absolute;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            border: 1px solid #ccc;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
            z-index: -1;
          }

          @keyframes init {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
              transform: translate(-50%, calc(-50% - 50px));
            }
          }
          @keyframes item-2 {
            0% {
              opacity: 0;
              transform: translate(-50%, calc(-50% - 55px));
            }
            100% {
              opacity: 1;
              transform: translate(-50%, calc(-50% - 95px));
            }
          }
      `;
        document.head.appendChild(style);
    }

    function createButton(classname, imgSrc) {
        const _d = document.querySelector(`.${classname}`);
        if (_d) {
            return;
        }

        const div = document.createElement('div');
        div.classList.add(classname);
        const img = document.createElement('img');
        img.src = imgSrc;
        div.appendChild(img);

        return div;
    }

    function createAddSdd9Button() {
        const button = createButton(
            'sd-rd-button',
            'https://i.pinimg.com/originals/ee/11/5e/ee115ead9702fecc987c92e8560977fc.png'
        );

        const span = document.createElement('span');
        span.innerText = 'wait';

        button.appendChild(span);

        button.addEventListener('click', async function (e) {
            e.stopPropagation();

            const img = button.querySelector('img');

            img.style.display = 'none';
            span.style.display = 'inline-block';

            await addSDD9();

            img.style.display = 'inline-block';
            span.style.display = 'none';
        });
        return button;
    }

    function createCreateRmButton() {
        const button = createButton(
            'sd-rm-button',
            'https://i.pinimg.com/originals/4b/14/79/4b14792cb7e482251bc71d47ec3b24e1.png'
        );

        button.addEventListener('click', async function (e) {
            document.execCommand('copy');
            setTimeout(() => {
                window.tools.valid && open('http://redmine.dc.zyxel.com.tw/projects/blitz/issues/new');
            }, 500);
        });
        return button;
    }

    function createFixedButton() {
        const button = createButton(
            'skbutton',
            'https://stickershop.line-scdn.net/stickershop/v1/product/10629/LINEStorePC/main.png;compress=true'
        );
        button.addEventListener(
            'click',
            function (e) {
                button.classList.toggle('activate--init');
            },
            false
        );

        const close = document.createElement('div');
        close.classList.add('close');
        close.innerText = '✖';
        close.addEventListener(
            'click',
            function (e) {
                e.stopPropagation();
                button.classList.add('hide');
            },
            false
        );
        button.appendChild(close);
        return button;
    }

    if (isIdle()) {
        window.tools.copyFunc();

        injectStyle();
        const fixedButton = createFixedButton();
        const addRdButton = createAddSdd9Button();
        const createRmButton = createCreateRmButton();

        fixedButton.appendChild(addRdButton);
        fixedButton.appendChild(createRmButton);
        document.body.appendChild(fixedButton);
    }
})();
