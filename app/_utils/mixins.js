import {css} from 'styled-components';

export const copyObj = (obj, newProperties) => {
    return Object.assign({}, obj, newProperties);
}

export const findParentElement = (el, tag) => {
    while (el.parentNode) {
        el = el.parentNode;
        if (el.tagName === tag) return true;
    }
    return false;
}

export const breakpoint = (width, args) => {
    return (...args) => css`
        @media (min-width: ${width}) {
            ${ css(...args) }
        }
    `
}

// export const bp = (...args) => cl('hello')

window.cl = (...mes) => {
    if(!PRODUCTION) console.log(...mes);
}