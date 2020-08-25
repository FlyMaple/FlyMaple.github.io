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

  function createButton() {
    const _d = document.querySelector('.skbutton');
    if (_d) {
      return;
    }

    const div = document.createElement('div');
    div.classList.add('skbutton');
    const img = document.createElement('img');
    img.src =
      'https://stickershop.line-scdn.net/stickershop/v1/product/10629/LINEStorePC/main.png;compress=true';
    const span = document.createElement('span');
    span.innerText = 'wait';
    div.appendChild(img);
    div.appendChild(span);
    const style = document.createElement('style');
    style.setAttribute('rel', 'stylesheet');
    style.innerText = `
          .skbutton {
                  position: fixed;
                  right: 35px;
                  bottom: 45px;
                  display: inline-flex;
                  justify-content: center;
                  align-items: center;
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
          .skbutton > img {
              width: 100%;
              height: auto;
          }
          .skbutton > span {
              display: none;
              color: #3c9f00;
          }
      `;
    div.addEventListener('click', async function () {
      img.style.display = 'none';
      span.style.display = 'inline-block';

      await addSDD9();

      img.style.display = 'inline-block';
      span.style.display = 'none';
    });
    document.head.appendChild(style);
    document.body.appendChild(div);
  }

  createButton();
})();
