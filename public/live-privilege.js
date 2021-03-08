(async function () {
    function lookupEnv() {
        const env = {
            token: sessionStorage.getItem('nebula://session/x-auth-token').replace(/"/g, ''),
        };

        if (location.host.includes('gamma')) {
            Object.assign(env, {
                apiEntry: 'https://gammaccapi.nebula.zyxel.com',
                referrer: `${location.protocol}//${location.host}`,
            });

            return env;
        }

        if (location.host.includes('aio')) {
            Object.assign(env, {
                apiEntry: `${location.protocol}//${location.host}:4430`,
                referrer: `${location.protocol}//${location.host}`,
            });

            return env;
        }
    }

    class PrivilegeAccessor {
        privileges;

        constructor(priv) {
            this.privileges = priv || {};
        }

        /**
         * User can read in this page
         */
        get Read() {
            return this.privileges[Privilege.Read] === true;
        }

        /**
         * User can execute livetool in this page
         */
        get LiveTool() {
            return this.privileges[Privilege.LiveTool] === true;
        }

        /**
         * User can change non-configuration settings in this page
         */
        get Write() {
            return this.privileges[Privilege.Write] === true;
        }

        /**
         * User can change device configuration in this page
         */
        get Configure() {
            return this.privileges[Privilege.Configure] === true;
        }

        /**
         * User can execute debug livetools.
         * e.g: remote command line
         */
        get Debug() {
            return this.privileges[Privilege.Debug] === true;
        }

        /**
         * Get NCC-Plus license status
         */
        get NccPlus() {
            return this.privileges[Privilege.NCC_PLUS] === true;
        }

        /**
         * Get NCC-Pro license status
         */
        get NccPro() {
            return this.privileges[Privilege.NCC_PRO] === true;
        }

        /**
         * Get NCC license status
         * TODO: replacing this with NccPro / NccPlus before 11.0 release
         */
        get NccPack() {
            return this.NccPro;
        }

        /**
         * Get NSS license status
         */
        get NssPack() {
            return this.privileges[Privilege.NSS] === true;
        }

        /**
         * Get UTM license status
         */
        get UtmPack() {
            return this.privileges[Privilege.UTM] === true;
        }

        /**
         * Get SecureWifi license status
         */
        get SecureWiFi() {
            return this.privileges[Privilege.RAP] === true;
        }

        /**
         * Get MSP license status
         */
        get MspPack() {
            return this.privileges[Privilege.MSP] === true;
        }
    }

    const Privilege = {
        Read: 'Read',
        LiveTool: 'LiveTool',
        Write: 'Write',
        Configure: 'Configure',
        Debug: 'Debug',
        Owner: 'Owner',
        NCC_PLUS: 'NCC_PLUS',
        NCC_PRO: 'NCC_PRO',
        NSS: 'NSS',
        UTM: 'UTM',
        RAP: 'RAP',
        MSP: 'MSP',
    };

    const PRIV_BITS = {
        [Privilege.Read]: 0,
        [Privilege.LiveTool]: 1,
        [Privilege.Write]: 2,
        [Privilege.Configure]: 3,
        [Privilege.Debug]: 5,
        [Privilege.Owner]: 6,
        [Privilege.NCC_PLUS]: 7,
        [Privilege.NCC_PRO]: 8,
        [Privilege.NSS]: 9,
        [Privilege.UTM]: 10,
        [Privilege.RAP]: 11,
        [Privilege.MSP]: 13,
    };

    function lookupResourcePath(privHeap, resourcePath) {
        let privNum = privHeap[resourcePath]; // exactly match
        if (typeof privNum === 'number') {
            return decodePrivilegeNum(privNum);
        }
        // deep-first search
        privNum = (function dfsTravel(candidates, parts, prefix) {
            prefix = prefix || '';

            let node = privHeap[prefix];
            if (typeof node === 'number') {
                return node;
            }
            if (candidates.length === 0 || parts.length === 0) {
                return null;
            }
            let searchFor = `${prefix}/${parts[0]}`;
            const restParts = parts.slice(1);
            node = dfsTravel(
                candidates.filter((pth) => pth.startsWith(searchFor)),
                restParts,
                searchFor
            );
            if (node == null) {
                searchFor = `${prefix}/*`;
                node = dfsTravel(
                    candidates.filter((pth) => pth.startsWith(searchFor)),
                    restParts,
                    searchFor
                );
            }
            if (node == null) {
                searchFor = `${prefix}/**`;
                node = dfsTravel(
                    candidates.filter((pth) => pth.startsWith(searchFor)),
                    [],
                    searchFor
                );
            }
            if (node == null) {
            }
            return node;
        })(
            Object.keys(privHeap),
            resourcePath.split('/').filter((p) => p.length > 0)
        );
        return decodePrivilegeNum(privNum);
    }

    function decodePrivilegeNum(priv_num) {
        const privMap = {};
        Object.entries(PRIV_BITS).map(([priv, shifts]) => {
            privMap[priv] = priv_num & (1 << shifts) ? true : false;
        });
        return privMap;
    }

    function getPrivilegeHeap(group_id, org_id) {
        return fetch(`${env.apiEntry}/nebula/v3/account/privileges`, {
            headers: {
                accept: 'application/json, text/plain, */*',
                'accept-language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
                'x-auth-renew': 'true',
                'x-auth-token': env.token,
                'x-refer-page': '/',
            },
            referrer: `${env.referrer}/`,
            referrerPolicy: 'strict-origin-when-cross-origin',
            body: JSON.stringify({
                group_id,
                org_id,
            }),
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
        }).then((res) => res.json());
    }

    function isGroupLevel() {
        if (location.hash.match(/group-wide/)) {
            return true;
        }

        return false;
    }

    function isOrgLevel() {
        if (location.hash.match(/organization-wide/)) {
            return true;
        }

        return false;
    }

    function isSiteLevel() {
        if (location.hash.match(/#\/(.{24})\/(.{24})\//)) {
            return true;
        }

        return false;
    }

    async function getPrivilege() {
        const group = document.querySelector('.select-group [ng-reflect-selected]');
        const org = document.querySelector('.select-org [ng-reflect-selected]');
        const site = document.querySelector('.select-site [ng-reflect-selected]');
        const groupId = group ? group.getAttribute('ng-reflect-selected') : null;
        const orgId = org ? org.getAttribute('ng-reflect-selected') : null;
        const siteId = site ? site.getAttribute('ng-reflect-selected') : null;

        if (groupId == null && orgId == null) {
            return;
        }

        const privHeap = (await getPrivilegeHeap(groupId, orgId)).body;

        const privAccessor = new PrivilegeAccessor(lookupResourcePath(privHeap, location.hash.replace(/^#/, '')));

        window.tools = {
            privAccessor,
        };

        return true;
    }

    function appendStyle(classname, _) {
        const e = document.querySelector(`.${classname}`);
        if (e) {
            e.remove();
        }

        const style = document.createElement('style');
        style.setAttribute('class', classname);
        style.innerHTML = _;
        document.head.appendChild(style);
    }

    function injectCSS() {
        const tmpl = `
                .live-privilege {
                    position: fixed;
                    display: flex;
                    z-index: 999999999999999;
                    background-color: #edf6e5bf;
                    color: #000;
                    bottom: 0;
                    left: 50%;
                    transform: translate(-50%, 0);
                    border: 1px solid #c0ccb5;
                    border-radius: 5px;
                    border-bottom-left-radius: 0px;
                    border-bottom-right-radius: 0px;
                    padding-right: 20px;
                    padding-left: 15px;
                    box-shadow: 2px 2px 3px 0px #000000cf;
                }
                .live-privilege.hide {
                    display: none;
                }
                .live-privilege .box {
                    position: relative;
                    display: flex;
                    align-items: center;
                    margin-right: 7px;
                    padding: 4px;
                }
                .live-privilege .box.disabled {
                    opacity: 1;
                    color: #ccc;
                }
                .live-privilege .box.disabled .label {
                    opacity: 0.3;
                }
                .live-privilege .box .label {
                    font-weight: 600;
                    margin-right: 7px;
                }
                .live-privilege .box .content {
                    text-shadow: 0px 0px 0px #000000;
                    font-size: 14px;
                }
                .live-privilege .box .content > span {
                    display: inline-block;
                    padding: 5px;
                    border: 1px solid #4e963f;
                    border-radius: 3px;
                    color: #4e963f;
                    font-weight: 600;
                }
                .live-privilege .close {
                    position: absolute;
                    top: 0;
                    right: 0px;
                    padding: 4px;
                    cursor: pointer;
                }`;
        appendStyle('live-privilege-style', tmpl);
    }

    function generateInfo() {
        const div = document.querySelector('.live-privilege');
        if (div) {
            div.remove();
        }

        const tmpl = `
            <div class="live-privilege">
                <div class="box lic">
                    <div class="label">License</div>
                    <div class="content"><span>-</span></div>
                </div>
                <div class="box msp disabled">
                    <div class="label">❕</div>
                    <div class="content">MspPack</div>
                </div>
                <div class="box nss disabled">
                    <div class="label">❕</div>
                    <div class="content">NssPack</div>
                </div>
                <div class="box utm disabled">
                    <div class="label">❕</div>
                    <div class="content">UtmPack</div>
                </div>
                <div class="box secure disabled">
                    <div class="label">❕</div>
                    <div class="content">SecureWifi</div>
                </div>
                <div class="close">✖</div>
            </div>`;

        let _ = document.createElement('div');

        document.body.appendChild(_);
        _.outerHTML = tmpl;
        _ = document.querySelector('.live-privilege');
        _.querySelector('.close').addEventListener(
            'click',
            function () {
                _.classList.add('hide');
            },
            false
        );
    }

    function updateInfo() {
        const yes = '💲';
        const no = '❕';

        const div = document.querySelector('.live-privilege');
        if (tools.privAccessor.NccPro) {
            div.querySelector('.lic .content > span').innerText = 'Pro';
        } else if (tools.privAccessor.NccPlus) {
            div.querySelector('.lic .content > span').innerText = 'Plus';
        } else {
            div.querySelector('.lic .content > span').innerText = 'Free';
        }

        if (tools.privAccessor.MspPack) {
            div.querySelector('.msp').classList.remove('disabled');
            div.querySelector('.msp .label').innerText = yes;
        } else {
            div.querySelector('.msp').classList.add('disabled');
            div.querySelector('.msp .label').innerText = no;
        }

        if (tools.privAccessor.NssPack) {
            div.querySelector('.nss').classList.remove('disabled');
            div.querySelector('.nss .label').innerText = yes;
        } else {
            div.querySelector('.nss').classList.add('disabled');
            div.querySelector('.nss .label').innerText = no;
        }

        if (tools.privAccessor.UtmPack) {
            div.querySelector('.utm').classList.remove('disabled');
            div.querySelector('.utm .label').innerText = yes;
        } else {
            div.querySelector('.utm').classList.add('disabled');
            div.querySelector('.utm .label').innerText = no;
        }

        if (tools.privAccessor.SecureWifi) {
            div.querySelector('.secure').classList.remove('disabled');
            div.querySelector('.secure .label').innerText = yes;
        } else {
            div.querySelector('.secure').classList.add('disabled');
            div.querySelector('.secure .label').innerText = no;
        }
        div.classList.remove('hide');
    }

    const env = lookupEnv();

    window.myId = setInterval(async () => {
        if (location.href !== prevLocationHref) {
            prevLocationHref = location.href;
            await getPrivilege();
            updateInfo();
        }
    }, 500);

    let prevLocationHref = location.href;
    injectCSS();
    generateInfo();

    const initId = setInterval(async () => {
        if (window.tools != null) {
            clearInterval(initId);
        }

        await getPrivilege();
        updateInfo();
    }, 1000);
})();
