import kaplay from "kaplay";

const k = kaplay({
     width: 1080,
    height: 1080,
    letterbox: true,
    background: '#000000',
    global: false,
    touchToMouse: true,
    buttons: {
        click: {
            mouse: ['left'],
            touch: ['tap'],
        }
    },
    debugKey: 'd',
    debug: true,

});

export default k;