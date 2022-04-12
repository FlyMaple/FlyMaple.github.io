(async () => {
    const styleId = 'sk-commit-behind';

    const style = `
        .sk-commit-behind {
            margin-left: 7px;
            opacity: .9;
        }
        
        .sk-commit-behind.sk-commit-behind--rebase {
            margin-left: 7px;
            opacity: 1;
            color: red;
            font-size: 1.2em;
        }
    `;

    function appendStyle(context) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = context;
        document.head.appendChild(style);
    }

    function injectStyle() {
        if (document.querySelector(`#${styleId}`) == null) {
            appendStyle(style);
        }
    }

    function parseCommitBehindNumber(target) {
        let num = -1;

        const pattern = /(\d+)\scommits*\sbehind/;

        const matcher = target.innerText.match(pattern);

        if (matcher != null) {
            num = parseInt(matcher[1], 10);
        }

        return num;
    }

    function iteratorMrs() {
        let index = 0;
        const mrs = Array.from(document.querySelectorAll('div.merge-request-title.title > span > a'));

        return {
            [Symbol.asyncIterator]: () => {
                return {
                    next: async () => {
                        const mrPattern = /\/(\d+)$/;
                        const mr = mrs[index];
                        const mrHref = mr.href.match(mrPattern);

                        if (mrHref != null) {
                            const content = await fetch(
                                `https://gitlab.dc.zyxel.com.tw/nebula-fe/nfe.gui3/merge_requests/${mrHref[1]}`
                            )
                                .then((res) => res.text())
                                .catch((e) => '');
                            const done = index === mrs.length - 1 ? true : false;

                            index += 1;

                            return {
                                value: {
                                    mr,
                                    content,
                                },
                                done,
                            };
                        }

                        return {
                            done: true,
                        };
                    },
                };
            },
        };
    }

    async function core() {
        if (
            location.href.match(
                /https:\/\/gitlab.dc.zyxel.com.tw\/nebula-fe\/nfe.gui3\/merge_requests\?scope=all&sort=id_desc&state=opened|https:\/\/gitlab.dc.zyxel.com.tw\/nebula-fe\/nfe.gui3\/merge_requests$/
            )
        ) {
            const parser = new DOMParser();

            const iterators = iteratorMrs();

            for await (const { mr, content } of iterators) {
                try {
                    const document = parser.parseFromString(content, 'text/html');

                    const target = document.querySelector('.label-branch:nth-child(4)~span');

                    if (target) {
                        const behindNumber = parseCommitBehindNumber(target);
                        const commitBehind = document.createElement('span');

                        commitBehind.innerText = target.innerText;
                        commitBehind.classList.add('sk-commit-behind');

                        if (behindNumber >= 20) {
                            commitBehind.classList.add('sk-commit-behind--rebase');
                        }

                        const nextElement = mr.nextElementSibling;
                        if (nextElement) {
                            nextElement.remove();
                        }
                        mr.after(commitBehind);
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }

    function injectWatcher() {
        const skcb = document.createElement('div');
        skcb.classList.add('sk-commit-behind');

        document.addEventListener('click', () => {
            setTimeout(() => {
                const skcb = document.querySelector('.sk-commit-behind');

                if (skcb == null) {
                    core();
                }
            }, 2000);
        });

        document.body.appendChild(skcb);
    }

    async function main() {
        injectStyle();
        injectWatcher();
        core();
    }

    try {
        main();
    } catch (e) {
        console.log('[SkyeTools] Git MR commit behind detect failure.');
    }
})();
