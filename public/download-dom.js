(function (_window) {
    const html2canvas = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';

    function appendScript(uri) {
        const script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.src = uri;
        document.head.appendChild(script);
    }

    function downloadDOM(dom, filename) {
        _window
            .html2canvas(dom, {
                allowTaint: true,
                imageTimeout: 15000,
                logging: true,
                useCORS: true,
                scrollX: -_window.scrollX,
                scrollY: -_window.scrollY,
            })
            .then((canvas) => {
                const a = document.createElement('a');
                a.setAttribute('download', `${filename}.png`);
                a.href = canvas.toDataURL();
                a.click();
            });
    }

    appendScript(html2canvas);

    const id = setInterval(() => {
        if (html2canvas) {
            clearInterval(id);

            _window.SkyeTool = {
                downloadDOM,
            };

            console.warn('Skye tool initialized.');
        }
    }, 100);
})(window);
