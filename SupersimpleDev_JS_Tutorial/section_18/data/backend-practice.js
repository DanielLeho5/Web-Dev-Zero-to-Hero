const XHR = new XMLHttpRequest();

XHR.addEventListener('load', () => {
    console.log(XHR.response);
});

XHR.open('GET', 'https://supersimplebackend.dev');
XHR.send();