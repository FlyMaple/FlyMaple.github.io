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

            if (dom) {
                const _version_1 = dom.innerText.match(/(?<=[:|：]\s)(.+\d|-\d+)$/);
                const _version_2 = dom.innerHTML.match(/Version:.+$/);

                if (_version_1) {
                    return _version_1[0].trim();
                }

                if (_version_2) {
                    return _version_2[0].trim();
                }
            }
        } catch (e) {
            if (window.forGUI3) {
                return 'developing';
            }
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
            const p2 = location.href.match(/(group-wide|msp)/);
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
                group_name = (document.querySelector('.select-group')?.innerText || 'N/A')
                    .trim()
                    .replace(/_/g, '{backward_slash}');
            } else if (p2 == null) {
                org_id = p ? p[0] : org_id;
                org_name =
                    org_id === 'N/A'
                        ? 'N/A'
                        : document.querySelector('.select-org').innerText.trim().replace(/_/g, '{backward_slash}');
                if (p && p.length === 2) {
                    site_id = p[1];
                    site_name = document
                        .querySelector('.select-site')
                        .innerText.trim()
                        .replace(/_/g, '{backward_slash}');
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

    function get_email() {
        const dom = document.querySelector('div.zynet-account-overlay .email');

        return dom ? dom.textContent : 'N/A';
    }

    function go() {
        const { hostname } = location;
        let title_tmpl = `[17.20][CC]`;

        if (hostname.includes('aio')) {
            if (window.forGUI3) {
                title_tmpl = `[Phase15][GUI3][CC]`;
            }
        }
        const ctx_tmpl = `**[Page]**
{uri}

**[Reproduce step]**
step 1. 
step 2. 

**[Result]**


~~~

~~~

**[Expect]**

**[Env]**
Test Time: {t_time}
{version}
Browser: {browser}
Group name: {group_name}
Group id: {group_id}
Org name: {org_name}
Site name: {site_name}
Org id: {org_id}
Site id: {site_id}
Device id: {device_id}
Email: {email}
            `;
        try {
            const uri = location.href;
            const date = new Date();
            const t_time = `${date.toLocaleDateString()} ${('0' + date.getHours()).substr(-2)}:${(
                '0' + date.getMinutes()
            ).substr(-2)}`;
            const b_version = get_version();
            const browser = get_browser();
            const group_org_site_device = get_group_org_site_device();
            const email = get_email();
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
                .replace(/{device_id}/, group_org_site_device.device_id)
                .replace(/{email}/, email);

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
        'ebeta.nebula.zyxel.com': 'ebetaccapi.nebula.zyxel.com',
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
            if (window.forGUI3) {
                return 'gammaccapi.nebula.zyxel.com';
            }

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
                //   right: 35px;
                //   bottom: 45px;
                  right: 100px;
                  bottom: 28px;
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
                  z-index: 9999;
          }
          .skbutton.hide{
            display: none;
          }
          .skbutton img {
              width: 100%;
              height: auto;
          }
          .sd-rd-button > span,
          .sd-delete-org-button > span {
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
            animation: item-2 0.3s 0.3s linear forwards;
          }
          .skbutton.activate--init .sd-delete-org-button {
            padding: 3px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            box-shadow: 1px 1px 3px 1px #aada8d;
            cursor: pointer;
            background-color: #fff;
            animation: item-3 0.3s 0.6s linear forwards;
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
          @keyframes item-3 {
            0% {
              opacity: 0;
              transform: translate(-50%, calc(-50% - 95px));
            }
            100% {
              opacity: 1;
              transform: translate(-50%, calc(-50% - 140px));
            }
          }

          /* delete org dialog */
          .sk-delete-org-setup {
          }
          .sk-delete-org-setup .line {
            display: flex;
            margin-bottom: 0.5rem;
          }
          .sk-delete-org-setup .line b {
            display: inline-block;
            width: 150px;
          }
          .sk-delete-org-setup .line input, .sk-delete-org-setup .line textarea {
            width: 300px;
          }
          .sk-delete-org-setup .footer {
            text-align: right;
          }
      `;
        document.head.appendChild(style);
    }

    function insertDeleteOrgSetupDialog() {
        const dialog_template = `
            <dialog class="sk-delete-org-setup">
                <div class="line">
                    <b class="bold">Email: </b><input type="text" class="email" placeholder="your account email" disabled>
                </div>
                <div class="line">
                    <b class="bold">License transfer to: </b><input type="text" class="transfer" placeholder="org id" value="60efdc78a086d3a892dc205c">
                </div>
                <div class="line">
                    <b class="bold">Organizations: </b>
                    <textarea class="orgs" cols="30" rows="5" placeholder="org_id_1&#10;org_id_2"></textarea>
                </div>
                <div class="footer">
                    <button class="ok">Go</button>
                </div>
            </dialog>`;

        const parser = new DOMParser();
        const doc = parser.parseFromString(dialog_template, 'text/html');
        dialog = doc.querySelector('dialog');

        dialog.querySelector('.ok').addEventListener('click', async () => {
            const email = dialog.querySelector('.email').value.trim();
            const transfer_org = dialog.querySelector('.transfer').value.trim();
            const orgs = dialog
                .querySelector('.orgs')
                .value.trim()
                .split(/\n/)
                .map((org) => org.trim());

            if (window.publicTool && window.publicTool.deleteOrg) {
                const params = window.publicTool.deleteOrg.params;

                window.publicTool.deleteOrg.params = {
                    email,
                    transfer_org: '60efdc78a086d3a892dc205c',
                    orgs,
                };

                const { img, span } = window.publicTool.deleteOrg.button;
                img.style.display = 'none';
                span.style.display = 'inline-block';

                await window.publicTool.deleteOrg.main();

                img.style.display = 'inline-block';
                span.style.display = 'none';

                // deleteOrg.email = email;
                // deleteOrg.orgs = orgs;
                // deleteOrg.transfer_org = transfer;

                // localStorage.setItem(
                //     'skye://deleteOrg',
                //     JSON.stringify({
                //         email,
                //         transfer,
                //         orgs,
                //     })
                // );
            }

            dialog.close();
        });

        document.body.appendChild(dialog);
    }

    function createButton(classname, imgSrc, title) {
        const _d = document.querySelector(`.${classname}`);
        if (_d) {
            return;
        }

        const div = document.createElement('div');
        div.classList.add(classname);
        div.setAttribute('title', title);
        const img = document.createElement('img');
        img.src = imgSrc;
        div.appendChild(img);

        return div;
    }

    function createAddSdd9Button() {
        const button = createButton(
            'sd-rd-button',
            'https://i.pinimg.com/originals/ee/11/5e/ee115ead9702fecc987c92e8560977fc.png',
            'Admin'
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
            'https://i.pinimg.com/originals/4b/14/79/4b14792cb7e482251bc71d47ec3b24e1.png',
            '開 Bug'
        );

        button.addEventListener('click', async function (e) {
            document.execCommand('copy');
            setTimeout(() => {
                window.tools.valid && open('http://redmine.dc.zyxel.com.tw/projects/blitz/issues/new');
            }, 500);
        });
        return button;
    }

    function createDeleteOrgButton() {
        const button = createButton(
            'sd-delete-org-button',
            'https://reality.inc/assets/images/tie-up/snoopy/item14_l.png',
            '刪除 Org'
        );

        const span = document.createElement('span');
        span.innerText = 'wait';

        button.appendChild(span);

        button.addEventListener('click', async function (e) {
            e.stopPropagation();

            const dialog = document.querySelector('.sk-delete-org-setup');
            // const _storage = JSON.parse(localStorage.getItem('skye://deleteOrg') || '{}');
            const email = dialog.querySelector('.email');
            const transfer = dialog.querySelector('.transfer');
            const orgs = dialog.querySelector('.orgs');
            const currentEmail = document.querySelector('div.zynet-account-overlay .email');

            email.value = currentEmail.textContent;
            // transfer.value = _storage.transfer || '';
            dialog.showModal();

            const img = button.querySelector('img');

            window.publicTool.deleteOrg.button.img = img;
            window.publicTool.deleteOrg.button.span = span;
        });
        return button;
    }

    function createFixedButton() {
        const button = createButton(
            'skbutton',
            'https://stickershop.line-scdn.net/stickershop/v1/product/10629/LINEStorePC/main.png;compress=true',
            '小工具'
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
        const deleteOrgButton = createDeleteOrgButton();
        insertDeleteOrgSetupDialog();

        fixedButton.appendChild(addRdButton);
        fixedButton.appendChild(createRmButton);
        fixedButton.appendChild(deleteOrgButton);
        document.body.appendChild(fixedButton);
    }
})();

/**
 * Inject AI assignees suggest
 */
(() => {
    if (location.href.match(/projects\/blitz\/issues\/new/)) {
        const originalAssignDom = document.querySelector('#issue_assigned_to_id');
        const originalAssignOptionsDom = Array.from(originalAssignDom.querySelectorAll('option'));

        async function getHistory() {
            const uri =
                'http://redmine.dc.zyxel.com.tw/projects/blitz/issues?c%5B%5D=tracker&c%5B%5D=status&c%5B%5D=priority&c%5B%5D=subject&c%5B%5D=assigned_to&c%5B%5D=start_date&f%5B%5D=author_id&f%5B%5D=start_date&f%5B%5D=&group_by=&op%5Bauthor_id%5D=%3D&op%5Bstart_date%5D=%3E%3D&per_page=25&set_filter=1&utf8=%E2%9C%93&v%5Bauthor_id%5D%5B%5D=582&v%5Bstart_date%5D%5B%5D=2021-01-01';

            const parser = new DOMParser();

            const content = await fetch(uri).then((res) => res.text());
            const document = parser.parseFromString(content, 'text/html');

            return document;
        }

        function parseAssignees(document) {
            const list = Array.from(document.querySelectorAll('.assigned_to'));
            const assigneesDict = {};
            const assignees = [];

            list.map((item, idx) => {
                const assign = item.textContent.trim();

                if (assigneesDict[assign] == null) {
                    assigneesDict[assign] = 0;
                }

                assigneesDict[assign] += idx < 10 ? 1.5 : 1;
            });

            Object.entries(assigneesDict).map(([assign, weight]) => {
                assignees.push({
                    assign,
                    weight,
                });
            });
            assignees
                .sort((self, other) => {
                    return self.weight - other.weight;
                })
                .reverse();

            const filterAssignees = assignees.filter(({ assign }) => {
                return (
                    assign !== '國麟 黃' &&
                    assign !== 'David Kuo' &&
                    assign !== 'sofina kuo' &&
                    assign !== 'Ken Phung' &&
                    assign !== 'yt lu'
                );
            });

            return filterAssignees;
        }

        function unshiftSpecificAssignees(assignees) {
            const list = JSON.parse(JSON.stringify(assignees));

            list.unshift(
                ...[
                    {
                        assign: '國麟 黃',
                        weight: 99,
                        specific: true,
                    },
                    {
                        assign: 'David Kuo',
                        weight: 99,
                        specific: true,
                    },
                    null,
                ]
            );

            return list;
        }

        function createAssigneesDom(assignees) {
            const doms = [];

            for (const assign of assignees) {
                if (assign == null) {
                    doms.push(null);
                    continue;
                }

                const matchOption = originalAssignOptionsDom.find((option) => {
                    return option.textContent.trim() === assign.assign;
                });

                if (matchOption) {
                    const assignDom = document.createElement('a');
                    assignDom.href = '#';
                    assignDom.innerText = `${assign.assign}`;

                    assignDom.addEventListener('click', (evt) => {
                        evt.preventDefault();

                        originalAssignDom.value = matchOption.value;
                    });

                    doms.push(assignDom);
                }
            }

            return doms;
        }

        function injectDom(assignees) {
            if (assignees.length < 1) {
                return;
            }

            let firstDisplay = true;
            const pDom = document.createElement('p');
            for (const assign of assignees) {
                if (assign == null) {
                    pDom.append(' | ');
                    firstDisplay = true;
                    continue;
                }

                if (!firstDisplay) {
                    pDom.append(', ');
                }
                firstDisplay = false;

                pDom.appendChild(assign);
            }

            originalAssignDom.closest('p').after(pDom);
        }

        async function main() {
            // inject style

            // list original data
            const document = await getHistory();

            // analytics assignees weight
            // assignees re-sorting by specific list
            const assignees = unshiftSpecificAssignees(parseAssignees(document));

            // generate dom
            const assigneesDom = createAssigneesDom(assignees);

            // inject dom
            injectDom(assigneesDom);
        }

        main();
    }
})();

/**
 * Inject AI assignees suggest
 */
(() => {
    /*
    window.publicTool = {
        deleteOrg: {
            // mzc email 每次 login 都要確認
            email: '',

            // 單個: ['org_id'],
            // 多個: ['org_id', 'org_id']
            orgs: [''],

            // license 要轉移到哪
            transfer_org: '',
        }
    };
    */

    let _deleteOrg = (ORG_ID, EMAIL) => {
        console.clear();
        /* eslint-disable */
        const HEADERS = {
            accept: 'application/json, text/plain, */*',
            'accept-language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'cache-control': 'no-cache',
            'Content-type': 'application/json; charset=UTF-8',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'x-auth-renew': 'true',
        };

        const ENTRY = 'https://gammaccapi.nebula.zyxel.com';
        const REFERRER = 'https://gamma.nebula.zyxel.com/';
        const TRANSFER_ORG_ID = window.publicTool.deleteOrg.transfer_org;

        function normalizeText(str) {
            return str.replace(/<orgId>/, ORG_ID);
        }

        function getToken() {
            const token = sessionStorage.getItem('nebula://session/x-auth-token');

            return token ? token.replace(/"/g, '') : null;
        }

        function getHeaders(xAuthToken, xReferPage) {
            return { ...HEADERS, 'x-auth-token': xAuthToken, 'x-refer-page': normalizeText(xReferPage) };
        }

        function throughError(funcName, response) {
            if (response.request && response.response) {
                throw new Error(`${funcName}\n${JSON.stringify(response, null, 4)}`);
            }
        }

        async function f(url, options) {
            const initObj = {
                headers: getHeaders(getToken(), options.xReferPage),
                referrer: REFERRER,
                referrerPolicy: 'strict-origin-when-cross-origin',
                body: JSON.stringify(options.body),
                method: options.method,
                mode: 'cors',
                credentials: 'include',
            };

            const r = await fetch(normalizeText(`${ENTRY}${url}`), initObj);
            if (options.method === 'DELETE') {
                return r;
            }

            if (r.status !== 200) {
                return {
                    request: {
                        url: r.url,
                        methid: options.method,
                        'x-auth-token': getToken(),
                        'x-refer-page': normalizeText(options.xReferPage),
                        payload: options.body,
                    },
                    response: {
                        status: r.status,
                        body: (await r.json()).body,
                    },
                };
            }

            return (await r.json()).body;
        }

        function assignLicenseToDevices(licenses, devices) {
            return new Promise(async (resolve, reject) => {
                const noLicenseDevices = devices.filter((d) => d.licenses.length > 0);
                const noUseLicenses = licenses.filter((l) => l.registered_at == null);

                if (noUseLicenses.length) {
                    return resolve(
                        await f('/nebula/v11/organization/<orgId>/inventory', {
                            method: 'POST',
                            xReferPage: '/<orgId>/organization-wide/configure/license-and-inventory',
                            body: {
                                devices: [],
                                licenses: noUseLicenses.map((l) => {
                                    return {
                                        license_key: l.license_key,
                                        mac_address: noLicenseDevices[0].mac_address,
                                        serial_number: noLicenseDevices[0].serial_number,
                                    };
                                }),
                                ncc_upgrade: null,
                                dryrun: false,
                            },
                        })
                    );
                }

                resolve();
            });
        }

        async function transferLicenseToOrg(licenses) {
            const noUseLicenses = licenses.filter((l) => l.device_id == null);

            if (noUseLicenses.length) {
                const response = await f('/nebula/v11/organization/inventory/transfer', {
                    method: 'PUT',
                    xReferPage: '/<orgId>/organization-wide/configure/license-and-inventory',
                    body: {
                        unused_license_keys: noUseLicenses.map((license) => {
                            return {
                                license_key: license.license_key,
                                src_org_id: ORG_ID,
                                dst_org_id: TRANSFER_ORG_ID,
                            };
                        }),
                    },
                });

                throughError('transferLicenseToOrg', response);

                return response;
            }

            return Promise.resolve(true);
        }

        async function getDevices() {
            const response = await f('/nebula/v11/organization/<orgId>/inventory', {
                method: 'GET',
                xReferPage: '/<orgId>/organization-wide/configure/license-and-inventory',
            });

            throughError('getDevices', response);

            const devices = response.devices;

            // {
            //     "status": 200,
            //     "message": null,
            //     "body": {
            //       "epoch": 1645510807248,
            //       "org_owner_id": "5b7e4cba30ed16364fd7e818",
            //       "devices": [
            //         {
            //           "serial_number": "201806251751",
            //           "mac_address": "20:18:06:25:17:51",
            //           "model_name": "NSG100",
            //           "model_variant": null,
            //           "device_type": "GW",
            //           "register_status": "REGISTERED",
            //           "licenses": [
            //             {
            //               "license_type": "NSS",
            //               "license_subtype": "EMPTY",
            //               "description": null,
            //               "expired_at": null,
            //               "predicted_expired_at": null,
            //               "grace_period_until": null,
            //               "status": "EMPTY",
            //               "details": []
            //             }
            //           ],
            //           "available_promotions": [],
            //           "device_id": "b283be18-c3a5-436b-bc1d-3a0d4e4a2a62",
            //           "org_added_time": 1537508585920,
            //           "country": null,
            //           "site_id": null,
            //           "device_name": null,
            //           "device_labels": null,
            //           "ztp_status": null
            //         },

            return devices;
        }

        async function removeDevices(devices) {
            if (devices.length === 0) {
                return Promise.resolve(true);
            }

            const response = await f('/nebula/v11/organization/<orgId>/inventory', {
                method: 'DELETE',
                xReferPage: '/<orgId>/organization-wide/configure/license-and-inventory',
                body: {
                    devices: devices.map((d) => {
                        return {
                            serial_number: d.serial_number,
                            mac_address: d.mac_address,
                            remove_from_site: true,
                        };
                    }),
                    dryrun: false,
                },
            });

            throughError('removeDevices', response);

            return response;
        }

        // 還未 assign 的要先 assign to device, 然後再跑 removeDevices
        async function getLicenses() {
            const response = await f('/nebula/v11/organization/<orgId>/inventory', {
                method: 'GET',
                xReferPage: '/<orgId>/organization-wide/configure/license-and-inventory',
            });

            throughError('getLicenses', response);

            const licenses = response.licenses;
            // "licenses": [
            //     {
            //       "license_key": "LIC-PLUS-1MO-202106170043",
            //       "description": "Nebula Plus Pack License, 1MO",
            //       "serial_number": null,
            //       "mac_address": null,
            //       "model_name": null,
            //       "device_type": null,
            //       "site_id": null,
            //       "device_name": null,
            //       "registered_at": 1645511464000,
            //       "associated_at": 1645511464000,
            //       "operated_at": null,
            //       "expired_at": null,
            return licenses;
        }

        async function getSites() {
            const response = await f('/nebula/v9/organization/<orgId>/sites', {
                method: 'POST',
                xReferPage: '/<orgId>/overview',
            });

            throughError('getSites', response);

            return response.sites;

            // {
            //     "status": 200,
            //     "message": null,
            //     "body": {
            //       "organization_id": "<orgId>",
            //       "sites": [
            //         {
            //           "site_id": "5ba484e67a3e7918e0be1b32",
            //           "site_name": "180921-1",
            //           "timezone": "Asia/Taipei",
            //           "gateway_type": "NSG",
            //           "gateway_flex_preset_model_name": null,
            //           "is_gateway_flex_preset_model_name_set": null,
            //           "deleted": null,
            //           "gw_model_name": "NSG100",
            //           "device_count": 0,
            //           "device_count_by_type": {
            //             "AP": 0,
            //             "GW": 0,
            //             "SW": 0,
            //             "GW_FLX": 0,
            //             "MGW": 0
            //           },
            //           "access": "FULL",
            //           "extra_access": [],
            //           "site_access": null,
            //           "site_tag_access": {},
            //           "model_variant": null
            //         }
            //       ],
            //       "site_templates": [],
            //       "ref_epoch": 1645512594366
            //     }
            //   }
        }

        async function removeSites(sites) {
            if (sites.length === 0) {
                return Promise.resolve(true);
            }

            const promises = [];

            for (let i = 0; i < sites.length; i++) {
                ((_s, _i) => {
                    setTimeout(() => {
                        promises.push(
                            new Promise((resolve) => {
                                f(`/nebula/v9/organization/<orgId>/site/${_s.site_id}`, {
                                    method: 'DELETE',
                                    xReferPage: '/<orgId>/overview',
                                }).then((response) => {
                                    throughError('removeSites', response);
                                    resolve();
                                });
                            })
                        );
                    }, _i * 1000);
                })(sites[i], i);
            }

            return Promise.all(promises);
        }

        async function getUsers() {
            const response = await f('/nebula/v3/organization/<orgId>/cloud-auth/user/accounts', {
                method: 'GET',
                xReferPage: '/<orgId>/organization-wide/configure/cloud-authentication',
            });

            throughError('getUsers', response);

            return response;

            // {
            //     "status": 200,
            //     "body": [
            //       {
            //         "_id": "621481dd6d4073ebe04fe129",
            //         "description": "",
            //         "notify_changes": true,
            //         "authorization_level": "ORG_LEVEL",
            //         "allow_methods": [],
            //         "organization_id": "<orgId>",
            //         "account_type": "user",
            //         "creator": "skye.wu@zyxel.com.tw",
            //         "created_time": 1645511133257,
            //         "email": "aaaa@gmail.com",
            //         "username": null,
            //         "dppsk": null,
            //         "dppsk_state": false,
            //         "vlan_id": null,
            //         "sites_configs": {},
            //         "login_method": "EMAIL",
            //         "password": "pLdlizpi",
            //         "org_authorization": {
            //           "authorized": false,
            //           "last_updator": "skye.wu@zyxel.com.tw",
            //           "updated_time": 1645511133221
            //         },
            //         "sites_authorization": {},
            //         "mfa": {
            //           "enrolled": false,
            //           "bypass": false,
            //           "code": null
            //         }
            //       }
            //     ]
            //   }
        }

        async function removeUsers(users) {
            if (users.length === 0) {
                return Promise.resolve(true);
            }

            const response = await f('/nebula/v3/organization/<orgId>/cloud-auth/user/accounts', {
                method: 'DELETE',
                xReferPage: '/<orgId>/organization-wide/configure/cloud-authentication',
                body: users.map((u) => {
                    return {
                        _id: u._id,
                    };
                }),
            });

            throughError('removeUsers', response);

            return response;
        }

        async function getAdministrators() {
            const response = await f('/nebula/v3/organization/<orgId>/administrator', {
                method: 'GET',
                xReferPage: '/<orgId>/organization-wide/configure/administrators',
            });

            throughError('getAdministrators', response);

            return response.filter((a) => a.tier === 'ORGANIZATION');

            // "body": [
            //     {
            //       "tier": "ORGANIZATION",
            //       "user_id": "5b7e4cba30ed16364fd7e818",
            //       "admin_email": "skye.wu@zyxel.com.tw",
            //       "admin_last_active": 1645510401890,
            //       "admin_name": "吳 智楷",
            //       "add_time": 1537508581137,
            //       "status_change_time": 1537508581137,
            //       "verified": true,
            //       "activated": true,
            //       "is_org_owner": true,
            //       "delegated": false,
            //       "org_priv": {
            //         "granted_time": 1537508581137,
            //         "access": "FULL"
            //       },
            //       "sitetag_priv": {},
            //       "site_priv": {},
        }

        async function removeAdministrators(admins) {
            if (admins.length === 0) {
                return Promise.resolve(true);
            }

            const promises = admins
                .filter((a) => !a.is_org_owner)
                .map((a) => {
                    return f(`/nebula/v3/organization/<orgId>/administrator/${a.user_id}`, {
                        method: 'DELETE',
                        xReferPage: '/<orgId>/organization-wide/configure/administrators',
                    });
                });

            return Promise.all(promises);
        }

        async function removeOrg() {
            return new Promise((r) => {
                setTimeout(() => {
                    r(
                        f('/nebula/v3/organization/<orgId>', {
                            method: 'DELETE',
                            xReferPage: '/<orgId>/organization-wide/configure/settings',
                        })
                    );
                }, 500);
            });
        }

        async function main() {
            // Get administrators
            const admins = await getAdministrators();
            const owner = admins.find((a) => a.admin_email === EMAIL && a.is_org_owner);

            if (Boolean(owner)) {
                // Get licenses
                const licenses = await getLicenses();
                // Get devices
                const devices = await getDevices();
                // Get sites
                const sites = await getSites();
                // Get user
                const users = await getUsers();

                if (sites.length > 10) {
                    console.warn(`///////// ${ORG_ID} have much site, program will skip this org.`);
                    return Promise.resolve(true);
                } else if (admins.length > 10) {
                    console.warn(`///////// ${ORG_ID} have much admin, program will skip this org.`);
                    return Promise.resolve(true);
                }

                // Assign license to device
                // await assignLicenseToDevices(licenses, devices);

                // Transfer license to target org
                await transferLicenseToOrg(licenses);

                // Remove device from org
                await removeDevices(devices);

                // Remove user
                await removeUsers(users);

                // Remove administrators
                await removeAdministrators(admins);

                // Remove sites
                await removeSites(sites);

                // Remove org
                await removeOrg();

                console.warn(`///////// Delete ${ORG_ID} success.`);
            } else {
                console.warn(`///////// This ${ORG_ID} isn't owner.`);
            }

            return Promise.resolve(true);
        }

        return main();
    };

    function global_setting(opts) {
        window.publicTool = {
            valid: true,
            deleteOrg: {
                main,
                params: null,
                button: {},
            },
        };

        return window.publicTool;
    }

    async function main() {
        if (
            window.publicTool == null ||
            window.publicTool.deleteOrg == null ||
            window.publicTool.deleteOrg.params == null
        ) {
            throw new Error('Please setup options.');
        }

        let list = window.publicTool.deleteOrg.params.orgs;

        const eList = [];
        for (const orgId of list) {
            try {
                await _deleteOrg(orgId, window.publicTool.deleteOrg.params.email);
            } catch (e) {
                console.log(e);
                eList.push(orgId);
                // console.warn(`///////// Delete ${orgId} failure.`);
            }
        }
        console.log(`///////// Still have these org:`, eList);
    }

    global_setting();
})();
