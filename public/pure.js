'use strict';

// Dummy icons.
// TODO: please replace by correct svg icon.
var circle =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><defs><style>.a{fill:#4d4d4d;}</style></defs><title>circle</title><path class="a" d="M17.15,7.15a2.83,2.83,0,0,0-1.62.51L12.32,4.44a2.8,2.8,0,0,0,.51-1.61,2.83,2.83,0,1,0-5.66,0,2.8,2.8,0,0,0,.51,1.61L4.47,7.66a2.83,2.83,0,1,0,0,4.62l3.21,3.21a2.83,2.83,0,1,0,4.62,0l3.21-3.21a2.78,2.78,0,0,0,1.63.52,2.83,2.83,0,0,0,0-5.65ZM10,14.29a2.81,2.81,0,0,0-1.6.5L5.18,11.58A2.87,2.87,0,0,0,5.68,10a2.78,2.78,0,0,0-.51-1.61L8.38,5.14a2.83,2.83,0,0,0,3.24,0l3.21,3.22A2.78,2.78,0,0,0,14.32,10a2.87,2.87,0,0,0,.5,1.61L11.61,14.8A2.8,2.8,0,0,0,10,14.29ZM10,1A1.84,1.84,0,1,1,8.16,2.83,1.84,1.84,0,0,1,10,1ZM2.85,11.81A1.84,1.84,0,1,1,4.69,10,1.83,1.83,0,0,1,2.85,11.81ZM10,19a1.84,1.84,0,1,1,1.84-1.84A1.85,1.85,0,0,1,10,19Zm7.15-7.15A1.84,1.84,0,1,1,19,10,1.84,1.84,0,0,1,17.15,11.81Z"/></svg>';
var nebula = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
<title>marketplace</title>
<rect x="0.01" y="0.01" width="19.99" height="19.99" style="fill: #fcfcfc"/>
<g>
    <path d="M15.65,4.77a15.85,15.85,0,0,1-5.16-2.13.93.93,0,0,0-1,0A15.85,15.85,0,0,1,4.35,4.77a1,1,0,0,0-.78,1l.17,5.46a1.1,1.1,0,0,0,0,.18c.14.63,1.14,4.17,5.89,6.07a.91.91,0,0,0,.7,0c4.75-1.9,5.75-5.44,5.89-6.07a1.1,1.1,0,0,0,0-.18l.17-5.46A1,1,0,0,0,15.65,4.77Zm-.21,6.38v0a6.71,6.71,0,0,1-1.09,2.26,8.28,8.28,0,0,1-1.61,1.69A10.87,10.87,0,0,1,10,16.67H10a10.87,10.87,0,0,1-2.7-1.54,8.28,8.28,0,0,1-1.61-1.69,6.71,6.71,0,0,1-1.09-2.26v0L4.4,5.7a.11.11,0,0,1,.09-.12A16.39,16.39,0,0,0,9.94,3.34l.06,0,.06,0a16.39,16.39,0,0,0,5.45,2.24.11.11,0,0,1,.09.12Z" style="fill: #4d4d4d"/>
    <path d="M13,12.23l-2.28-1.31a1.54,1.54,0,0,0-1.5,0L7,12.23a.75.75,0,0,0-.13,1.21c.16.15.33.3.51.44A10.72,10.72,0,0,0,9.7,15.47a.78.78,0,0,0,.6,0,10.72,10.72,0,0,0,2.36-1.59c.18-.14.35-.29.51-.44A.75.75,0,0,0,13,12.23Z" style="fill: #4d4d4d"/>
</g>
</svg>
`;
var myzyxel = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
<title>myzyxel</title>
<g>
    <path d="M18.21,5h0V4.72l0,0v0l0,0v0l0,0h0l0,0h0l0,0h0L10.16.07h0l-.06,0h0L10,0H3.88A2.1,2.1,0,0,0,1.79,2.09V17.91A2.1,2.1,0,0,0,3.88,20H16.12a2.1,2.1,0,0,0,2.09-2.09V5ZM15.6,4.45H11.47a1,1,0,0,1-1-1.1V1.49Zm.52,14.45H3.88a1,1,0,0,1-1-1V2.09a1,1,0,0,1,1-1H9.34V3.35a2.09,2.09,0,0,0,2.13,2.19h5.64V17.91A1,1,0,0,1,16.12,18.9Z" style="fill: #4d4d4d"/>
    <path d="M14.91,8.26H5.09a.55.55,0,0,0,0,1.1h9.82a.55.55,0,0,0,0-1.1Z" style="fill: #4d4d4d"/>
    <path d="M14.91,11.82H5.09a.55.55,0,1,0,0,1.09h9.82a.55.55,0,1,0,0-1.09Z" style="fill: #4d4d4d"/>
    <path d="M14.91,15.37H5.09a.55.55,0,0,0,0,1.1h9.82a.55.55,0,0,0,0-1.1Z" style="fill: #4d4d4d"/>
</g>
</svg>
`;
var marketplace = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Status</title><path d="M14.49,2.21A9,9,0,0,0,10,1h0A9,9,0,0,0,1.31,12.33,9,9,0,0,0,10,19a9,9,0,0,0,8.7-11.33A8.91,8.91,0,0,0,14.49,2.21Z" style="fill:#64be00"/><path d="M19.65,7.42A10,10,0,0,0,10,0h0A10,10,0,0,0,1.34,5,10,10,0,0,0,5,18.66,10,10,0,0,0,10,20h0a10,10,0,0,0,8.66-5A9.9,9.9,0,0,0,19.65,7.42ZM5.51,17.79A9,9,0,0,1,2.21,5.5,9,9,0,0,1,10,1h0A9,9,0,1,1,5.51,17.79Z" style="fill:#3c9f00"/></svg>`;
var secureporter = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Status</title><path d="M14.49,2.21A9,9,0,0,0,10,1h0A9,9,0,0,0,1.31,12.33,9,9,0,0,0,10,19a9,9,0,0,0,8.7-11.33A8.91,8.91,0,0,0,14.49,2.21Z" style="fill:#64be00"/><path d="M19.65,7.42A10,10,0,0,0,10,0h0A10,10,0,0,0,1.34,5,10,10,0,0,0,5,18.66,10,10,0,0,0,10,20h0a10,10,0,0,0,8.66-5A9.9,9.9,0,0,0,19.65,7.42ZM5.51,17.79A9,9,0,0,1,2.21,5.5,9,9,0,0,1,10,1h0A9,9,0,1,1,5.51,17.79Z" style="fill:#3c9f00"/></svg>`;
var zyxelcnc = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
<title>topology_gw_with_bg</title>
<rect x="0.01" y="0.01" width="19.99" height="19.99" style="fill: #fcfcfc"/>
<g>
    <path d="M15.65,4.77a15.85,15.85,0,0,1-5.16-2.13.93.93,0,0,0-1,0A15.85,15.85,0,0,1,4.35,4.77a1,1,0,0,0-.78,1l.17,5.46a1.1,1.1,0,0,0,0,.18c.14.63,1.14,4.17,5.89,6.07a.91.91,0,0,0,.7,0c4.75-1.9,5.75-5.44,5.89-6.07a1.1,1.1,0,0,0,0-.18l.17-5.46A1,1,0,0,0,15.65,4.77Zm-.21,6.38v0a6.71,6.71,0,0,1-1.09,2.26,8.28,8.28,0,0,1-1.61,1.69A10.87,10.87,0,0,1,10,16.67H10a10.87,10.87,0,0,1-2.7-1.54,8.28,8.28,0,0,1-1.61-1.69,6.71,6.71,0,0,1-1.09-2.26v0L4.4,5.7a.11.11,0,0,1,.09-.12A16.39,16.39,0,0,0,9.94,3.34l.06,0,.06,0a16.39,16.39,0,0,0,5.45,2.24.11.11,0,0,1,.09.12Z" style="fill: #4d4d4d"/>
    <path d="M13,12.23l-2.28-1.31a1.54,1.54,0,0,0-1.5,0L7,12.23a.75.75,0,0,0-.13,1.21c.16.15.33.3.51.44A10.72,10.72,0,0,0,9.7,15.47a.78.78,0,0,0,.6,0,10.72,10.72,0,0,0,2.36-1.59c.18-.14.35-.29.51-.44A.75.75,0,0,0,13,12.23Z" style="fill: #4d4d4d"/>
</g>
</svg>
`;
var zyxelconnunity = `<svg class="zyxel-logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 156 43">
<title>header_nebula_logo</title>
<g id="Content">
  <g>
    <path d="M19.32,26.18A7.63,7.63,0,0,0,23,24.86a22,22,0,0,0,.16,2.93c-2.16,2.05-7,3.13-9.16,4.48l0,0a48.5,48.5,0,0,0,5.32-6" style="fill: #6caa25"/>
    <path d="M29.21,16.5a7.73,7.73,0,0,0-3.74,1.32,22,22,0,0,0-.15-2.93c2.15-2.05,7.07-3.14,9.18-4.49l0,0a48.67,48.67,0,0,0-5.33,6.06" style="fill: #6caa25"/>
    <path d="M24.17,28.11a7.67,7.67,0,0,0,1.69-3.54,23.64,23.64,0,0,0,2.21,1.91h0c.05,3-2.78,7.38-3.31,9.88H24.7a50.6,50.6,0,0,0-.53-8.25" style="fill: #6caa25"/>
    <path d="M27.64,22.49a22.69,22.69,0,0,0,3.08-.24c2.13,2.11,3.35,7.08,4.78,9.11l0,0A51.33,51.33,0,0,0,29,26a7.64,7.64,0,0,0-1.32-3.5" style="fill: #6caa25"/>
    <path d="M24.36,14.57a7.56,7.56,0,0,0-1.69,3.55,22.36,22.36,0,0,0-2.22-1.91h0c-.05-3,2.71-7.27,3.3-9.79h.07a50.63,50.63,0,0,0,.54,8.16" style="fill: #6caa25"/>
    <path d="M17.51,21.4A7.49,7.49,0,0,0,20.92,23a24.77,24.77,0,0,0-2.05,2.3c-2.94-.08-7.07-2.54-9.5-3v-.08a49.51,49.51,0,0,0,8.15-.75" style="fill: #6caa25"/>
    <path d="M31,21.28a7.45,7.45,0,0,0-3.41-1.56,23.65,23.65,0,0,0,2.06-2.3c3,.09,7.22,2.63,9.62,3.07v.05a49.87,49.87,0,0,0-8.27.75" style="fill: #6caa25"/>
    <path d="M20.88,20.19a22.42,22.42,0,0,0-3.07.24c-2.09-2.07-3.3-6.86-4.69-9l.05-.06a51.56,51.56,0,0,0,6.39,5.3,7.64,7.64,0,0,0,1.32,3.5" style="fill: #6caa25"/>
    <path d="M33.46,16.77a7.84,7.84,0,0,1,5.09,1.71,3.62,3.62,0,0,1,.42.36,4,4,0,0,0-3.47-6.3l0,0Z" style="fill: #b1b2b3"/>
    <path d="M27.6,11.18a7.94,7.94,0,0,1,4.5-2.07l.48,0a4,4,0,0,0-2.46-2.85,4,4,0,0,0-4.07.67Z" style="fill: #b1b2b3"/>
    <path d="M19.56,12.15a7.91,7.91,0,0,1,1.72-5,3.9,3.9,0,0,1,.33-.38,4,4,0,0,0-3.8-.31,4,4,0,0,0-2.43,3.69Z" style="fill: #b1b2b3"/>
    <path d="M29.42,31a7.9,7.9,0,0,1-1.72,4.84,6,6,0,0,1-.59.64,4.05,4.05,0,0,0,3.62.19,4,4,0,0,0,2.43-3.9Z" style="fill: #b1b2b3"/>
    <path d="M38.57,23.22l-4.13,1.49a7.93,7.93,0,0,1,2.23,4.66,5.27,5.27,0,0,1,0,.56,4.07,4.07,0,0,0,2.71-2.43,4,4,0,0,0-.85-4.28" style="fill: #b1b2b3"/>
    <path d="M10,19.92l4.24-1.54a7.84,7.84,0,0,1-2.44-4.84,2.38,2.38,0,0,1,0-.39,4.06,4.06,0,0,0-2.7,2.42A4,4,0,0,0,10,19.92" style="fill: #b1b2b3"/>
    <path d="M21.14,31.88a8,8,0,0,1-4.47,2.05,5.42,5.42,0,0,1-.9,0,4.08,4.08,0,0,0,2.46,2.82,4,4,0,0,0,4.35-.9Z" style="fill: #b1b2b3"/>
    <path d="M14.93,26.42a8,8,0,0,1-4.71-1.71,6.39,6.39,0,0,1-.54-.5,4.05,4.05,0,0,0-.34,3.86A4,4,0,0,0,13,30.49Z" style="fill: #b1b2b3"/>
  </g>
  <g>
    <path d="M57.63,8.93h.62v1.5h0a2.6,2.6,0,0,1,2.6-1.63,2.67,2.67,0,0,1,2.81,2.92V17h-.64V11.8a2.2,2.2,0,0,0-2.26-2.42,2.51,2.51,0,0,0-2.54,2.7V17h-.62Z" style="fill: #646569;stroke: #646569;stroke-miterlimit: 10;stroke-width: 0.25px"/>
    <path d="M65.88,13.43v-.86c0-2.44,1.23-3.77,3.14-3.77s3.14,1.32,3.14,3.79V13H66.51v.4c0,2,1,3.15,2.6,3.15A2.13,2.13,0,0,0,71.41,15H72a2.72,2.72,0,0,1-3,2.18C67.1,17.14,65.88,15.77,65.88,13.43Zm5.64-1v0c0-1.92-1-3.07-2.5-3.07s-2.51,1.15-2.51,3.07v0Z" style="fill: #646569;stroke: #646569;stroke-miterlimit: 10;stroke-width: 0.25px"/>
    <path d="M75.09,15.45h0V17h-.61V5.81h.63v4.66h0A2.75,2.75,0,0,1,77.74,8.8c1.77,0,3.09,1.3,3.09,3.46v1.4c0,2.3-1.44,3.48-3.11,3.48A2.7,2.7,0,0,1,75.09,15.45Zm5.1-1.9v-1.2c0-1.92-1.1-3-2.49-3a2.68,2.68,0,0,0-2.64,3v1.25a2.69,2.69,0,0,0,2.64,3C79,16.56,80.19,15.6,80.19,13.55Z" style="fill: #646569;stroke: #646569;stroke-miterlimit: 10;stroke-width: 0.25px"/>
    <path d="M89.07,17h-.63V15.5h0a2.64,2.64,0,0,1-2.62,1.64A2.55,2.55,0,0,1,83,14.39V8.93h.63v5.34a2.09,2.09,0,0,0,2.22,2.28,2.59,2.59,0,0,0,2.57-2.78V8.93h.63Z" style="fill: #646569;stroke: #646569;stroke-miterlimit: 10;stroke-width: 0.25px"/>
    <path d="M91.82,5.81h.63V17h-.63Z" style="fill: #646569;stroke: #646569;stroke-miterlimit: 10;stroke-width: 0.25px"/>
    <path d="M97.32,17.14a2.37,2.37,0,0,1-2.64-2.4c0-1.34.93-2.25,2.74-2.25h2.47V11.35c0-1.36-.85-2-2.14-2A1.86,1.86,0,0,0,95.64,11H95c.14-1.27,1-2.16,2.75-2.16s2.73.85,2.73,2.43V17h-.61V15.69h0A2.65,2.65,0,0,1,97.32,17.14Zm2.57-2.85V13.05H97.44c-1.45,0-2.09.69-2.09,1.67a1.85,1.85,0,0,0,2.05,1.85A2.34,2.34,0,0,0,99.89,14.29Z" style="fill: #646569;stroke: #646569;stroke-miterlimit: 10;stroke-width: 0.25px"/>
    <path d="M58,32.62c0,2.21,1,4,3.37,4,1.9,0,3.08-1.2,3.08-2.63h.62v0c0,1.61-1.34,3.19-3.7,3.19-2.79,0-4-2-4-4.63v-1.8c0-2.61,1.27-4.66,4-4.66A3.41,3.41,0,0,1,65,29.34v0h-.62a2.87,2.87,0,0,0-3.05-2.67c-2.26,0-3.33,1.78-3.33,4Z" style="fill: #646569;stroke: #646569;stroke-miterlimit: 10;stroke-width: 0.25px"/>
    <path d="M73.54,32.36V33.5c0,2.28-1.39,3.59-3.3,3.59S67,35.78,67,33.5V32.36c0-2.3,1.35-3.61,3.28-3.61S73.54,30.09,73.54,32.36Zm-6,.06v1c0,2,1.12,3.08,2.67,3.08s2.65-1,2.65-3.08v-1c0-2-1.13-3.1-2.66-3.1S67.58,30.39,67.58,32.42Z" style="fill: #646569;stroke: #646569;stroke-miterlimit: 10;stroke-width: 0.25px"/>
    <path d="M75.83,28.88h.62v1.5h0a2.59,2.59,0,0,1,2.6-1.63,2.66,2.66,0,0,1,2.8,2.92V37h-.63v-5.2A2.2,2.2,0,0,0,79,29.33,2.51,2.51,0,0,0,76.45,32V37h-.62Z" style="fill: #646569;stroke: #646569;stroke-miterlimit: 10;stroke-width: 0.25px"/>
    <path d="M84.82,26.92h.63v2h2v.55h-2v5.79c0,1,.4,1.26,1.42,1.26a4.43,4.43,0,0,0,.69-.06V37a4.34,4.34,0,0,1-.81.07c-1.49,0-1.93-.52-1.93-1.92V29.43H83.54v-.55h1.28Z" style="fill: #646569;stroke: #646569;stroke-miterlimit: 10;stroke-width: 0.25px"/>
    <path d="M89.42,28.88H90v1.5h0a2.16,2.16,0,0,1,2.26-1.63,2.66,2.66,0,0,1,.59.06v.6a3.6,3.6,0,0,0-.67-.06c-1.47,0-2.21,1.14-2.21,2.88V37h-.62Z" style="fill: #646569;stroke: #646569;stroke-miterlimit: 10;stroke-width: 0.25px"/>
    <path d="M100.83,32.36V33.5c0,2.28-1.38,3.59-3.29,3.59s-3.28-1.31-3.28-3.59V32.36c0-2.3,1.35-3.61,3.28-3.61S100.83,30.09,100.83,32.36Zm-6,.06v1c0,2,1.11,3.08,2.66,3.08s2.66-1,2.66-3.08v-1c0-2-1.13-3.1-2.66-3.1S94.88,30.39,94.88,32.42Z" style="fill: #646569;stroke: #646569;stroke-miterlimit: 10;stroke-width: 0.25px"/>
    <path d="M103.22,25.76h.63V37h-.63Z" style="fill: #646569;stroke: #646569;stroke-miterlimit: 10;stroke-width: 0.25px"/>
    <path d="M110.25,32.62c0,2.21,1,4,3.38,4,1.9,0,3.08-1.2,3.08-2.63h.62v0c0,1.61-1.34,3.19-3.71,3.19-2.79,0-4-2-4-4.63v-1.8c0-2.61,1.27-4.66,4-4.66a3.41,3.41,0,0,1,3.67,3.24v0h-.62a2.87,2.87,0,0,0-3-2.67c-2.27,0-3.34,1.78-3.34,4Z" style="fill: #646569;stroke: #646569;stroke-miterlimit: 10;stroke-width: 0.25px"/>
    <path d="M119.22,33.38v-.86c0-2.44,1.23-3.77,3.14-3.77s3.14,1.32,3.14,3.79V33h-5.65v.4c0,2,1,3.15,2.6,3.15a2.13,2.13,0,0,0,2.3-1.61h.63a2.72,2.72,0,0,1-2.95,2.18C120.44,37.09,119.22,35.72,119.22,33.38Zm5.65-1v0c0-1.92-1-3.07-2.51-3.07s-2.51,1.15-2.51,3.07v0Z" style="fill: #646569;stroke: #646569;stroke-miterlimit: 10;stroke-width: 0.25px"/>
    <path d="M127.78,28.88h.62v1.5h0a2.6,2.6,0,0,1,2.6-1.63,2.67,2.67,0,0,1,2.81,2.92V37h-.64v-5.2a2.19,2.19,0,0,0-2.26-2.42A2.52,2.52,0,0,0,128.4,32V37h-.62Z" style="fill: #646569;stroke: #646569;stroke-miterlimit: 10;stroke-width: 0.25px"/>
    <path d="M136.77,26.92h.63v2h2v.55h-2v5.79c0,1,.4,1.26,1.42,1.26a4.57,4.57,0,0,0,.7-.06V37a4.53,4.53,0,0,1-.81.07c-1.5,0-1.94-.52-1.94-1.92V29.43h-1.28v-.55h1.28Z" style="fill: #646569;stroke: #646569;stroke-miterlimit: 10;stroke-width: 0.25px"/>
    <path d="M140.9,33.38v-.86c0-2.44,1.23-3.77,3.13-3.77s3.14,1.32,3.14,3.79V33h-5.65v.4c0,2,1,3.15,2.6,3.15a2.12,2.12,0,0,0,2.3-1.61h.63a2.72,2.72,0,0,1-2.94,2.18C142.11,37.09,140.9,35.72,140.9,33.38Zm5.64-1v0c0-1.92-1-3.07-2.51-3.07s-2.51,1.15-2.51,3.07v0Z" style="fill: #646569;stroke: #646569;stroke-miterlimit: 10;stroke-width: 0.25px"/>
    <path d="M149.45,28.88h.63v1.5h0a2.15,2.15,0,0,1,2.26-1.63,2.75,2.75,0,0,1,.59.06v.6a3.81,3.81,0,0,0-.67-.06c-1.47,0-2.21,1.14-2.21,2.88V37h-.63Z" style="fill: #646569;stroke: #646569;stroke-miterlimit: 10;stroke-width: 0.25px"/>
  </g>
  <rect y="0.05" width="156" height="42.9" style="fill: none"/>
</g>
</svg>
`;
var widget = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
<defs>
<style>.a{fill:#4d4d4d;}</style>
</defs>
<title>list_view</title>
<path class="a" d="M5.15,8.7H.55A.55.55,0,0,1,0,8.15V3.55A.55.55,0,0,1,.55,3h4.6a.55.55,0,0,1,.55.55v4.6A.55.55,0,0,1,5.15,8.7ZM1.1,7.6H4.6V4.1H1.1Z"/>
<path class="a" d="M5.15,17H.55A.55.55,0,0,1,0,16.45v-4.6a.55.55,0,0,1,.55-.55h4.6a.55.55,0,0,1,.55.55v4.6A.55.55,0,0,1,5.15,17ZM1.1,15.9H4.6V12.4H1.1Z"/>
<path class="a" d="M19.45,8.7H8.87a.55.55,0,0,1-.55-.55V3.55A.55.55,0,0,1,8.87,3H19.45a.55.55,0,0,1,.55.55v4.6A.55.55,0,0,1,19.45,8.7Zm-10-1.1H18.9V4.1H9.42Z"/>
<path class="a" d="M19.45,17H8.87a.55.55,0,0,1-.55-.55v-4.6a.55.55,0,0,1,.55-.55H19.45a.55.55,0,0,1,.55.55v4.6A.55.55,0,0,1,19.45,17Zm-10-1.1H18.9V12.4H9.42Z"/>
</svg>`;


class Item {
    constructor(prefixIcon, text, link, suffixIcon, height) {
        // svg's content of prefix icon
        this.prefixIcon = prefixIcon;

        // name of menu item
        this.text = text;

        // hyperlink
        this.link = link;

        // svg's content of suffix icon
        this.suffixIcon = suffixIcon;
        
        // default height of an item is 1.5rem + 0.25rem*2 (padding top, bottom) (26px + 8px = 32)
        this.height = height ? height : 32;
    }

    /**
     * Get tag content of an item which is hyperlink/text
     * @param {label/name of item} text 
     * @param {hyperlink} link 
     */
    getHyperlinkATagStr(text, link) {
        return link ? `<a href="${link}"><span title="${text}">${text}</span></a>` : `<span title="${text}">${text}</span>`;
    }
}

var MyZyxelEntry = {
    // item list on the popup
    itemList: [],
    /**
     * init portal entry
     * @param {*} dataStyle
     * target icon (widget icon) will be depended on height of portal's header
     * widthTargetIcon: width of target icon
     * heightTargetIcon: height of target icon
     */
    init: function (dataStyle) {
        var myzyxelEntryBtn = document.getElementById('myzyxel-entry');
        if (!myzyxelEntryBtn) {
            return;
        }

        if (this.itemList && this.itemList.length > 0) {
            this.setListItems(this.itemList);
        } else {
            this.setDummyItems(myzyxelEntryBtn);
        }

        var widgetIcon = document.createElement('div');
        widgetIcon.setAttribute('class', 'widget');
        widgetIcon.innerHTML = widget;
        
        if (dataStyle) {
            if (dataStyle.widthTargetIcon) {
                widgetIcon.style.width = dataStyle.widthTargetIcon;
            }
            if (dataStyle.heightTargetIcon) {
                widgetIcon.style.height = dataStyle.heigthTargetIcon;
            }
        }
        myzyxelEntryBtn.appendChild(widgetIcon);
        var me = this;
        window.addEventListener('click', function (e) {
            myzyxelEntryBtn = document.getElementById('myzyxel-entry');
            var $popup = document.getElementById('popover-magic-block');

            // TODO: overlay used to disable scrolling when popup is open.
            // same as popup/dropdown of select field.
            var $overlay = document.getElementById('overlay-widget');

            if ($popup) {
                if ($popup.contains(e.target) || myzyxelEntryBtn.contains(e.target)) {
                    if (myzyxelEntryBtn.contains(e.target) && $popup.style.display === 'block') {
                        $popup.style.display = 'none';
                    } else {
                        $popup.style.display = 'block';
                        $overlay.classList.add('overlay-widget-content');
                        $popup = me.updatePosition($popup, myzyxelEntryBtn);
                        var theme = myzyxelEntryBtn.getAttribute('theme');
                        $popup.setAttribute('class', `popover-magic-block${theme === 'dark' ? ' dark' : ''}`);
                    }
                } else {
                    $popup.style.display = 'none';
                    $overlay.classList.remove('overlay-widget-content');
                }
            } else {
                if (myzyxelEntryBtn.contains(e.target)) {

                    var overlay = document.createElement('div');
                    overlay.setAttribute('class', 'overlay-widget overlay-widget-content');
                    overlay.id = 'overlay-widget';
    
                    var popupdiv = document.createElement('div');
                    popupdiv.innerHTML = me.getHtml();
                    popupdiv.id = 'popover-magic-block';
                    var theme = myzyxelEntryBtn.getAttribute('theme');
                    popupdiv.setAttribute('class', `popover-magic-block${theme === 'dark' ? ' dark' : ''}`);
                    
                    if (dataStyle) {
                        popupdiv.style.cssText = me.setStyle(dataStyle);
                    }
    
                    $popup = me.updatePosition(popupdiv, myzyxelEntryBtn);
                    overlay.appendChild(popupdiv);
                    document.body.appendChild(overlay);
                }
            }
        });
    },
    /**
     * set/init item list from entry
     * @param {item list has been inputted} items 
     */
    setListItems: function (items) {
        this.itemList = items;
    },
    /**
     * dummy data of item list (default items).
     */
    setDummyItems: function(targetIcon) {
        var theme = targetIcon.getAttribute('theme');
        if (theme === 'dark') {   
            this.itemList = [
                new Item(secureporter, 'Circle', 'https://gamma.nebula.zyxel.com/cc/ui/index.html', ''),
                new Item(secureporter, 'Nebula', 'https://gamma.nebula.zyxel.com/cc/ui/index.html', ''),
                new Item(secureporter, 'myZyxel', 'https://gamma.nebula.zyxel.com/cc/ui/index.html', ''),
                new Item(secureporter, 'SecuReporter', 'https://gamma.nebula.zyxel.com/cc/ui/index.html', ''),
                new Item(secureporter, 'Marketplace', 'https://gamma.nebula.zyxel.com/cc/ui/index.html', ''),
                new Item(secureporter, 'ZYXEL CNC', 'https://gamma.nebula.zyxel.com/cc/ui/index.html', ''),
                new Item(zyxelconnunity, '', '', '', 32),
            ];   
        } else {
            this.itemList = [
                new Item(circle, 'Circle', 'https://gamma.nebula.zyxel.com/cc/ui/index.html', ''),
                new Item(nebula, 'Nebula', 'https://gamma.nebula.zyxel.com/cc/ui/index.html', ''),
                new Item(myzyxel, 'myZyxel', 'https://gamma.nebula.zyxel.com/cc/ui/index.html', ''),
                new Item(secureporter, 'SecuReporter', 'https://gamma.nebula.zyxel.com/cc/ui/index.html', ''),
                new Item(marketplace, 'Marketplace', 'https://gamma.nebula.zyxel.com/cc/ui/index.html', ''),
                new Item(zyxelcnc, 'ZYXEL CNC', 'https://gamma.nebula.zyxel.com/cc/ui/index.html', ''),
                new Item(zyxelconnunity, '', '', '', 32),
            ];
        }
    },
    /**
     * Get html of item list in popover.
     */
    getHtml: function() {
        let html = '<ul>';
        for (let i = 0; i < this.itemList.length; i++) {
            var item = this.itemList[i];
            html += `<li style="height: ${item.height}px">`;

            html += item.prefixIcon;
            html += item.getHyperlinkATagStr(item.text, item.link);
            html += '</li>';
        }
        html += '</ul>';
        return html;
    },
    /**
     * Update style if user has inputted.
     * @param {*} data 
     * font, fontSize, borderRadius, boxShadow, height
     */
    setStyle: function(data) {
        var customStyle = `padding: ${data.padding ? data.padding : '0 0.5rem'};
        border-radius: ${data.borderRadius ? data.borderRadius : '0.25rem'};
        box-shadow: ${data.boxShadow ? data.boxShadow : '2px 2px 0.5rem rgba(0, 0, 0, 0.5)'};`;
        if (data.fontSize) {
            customStyle += `font-size: ${data.fontSize};`;
        }
        if (data.font) {
            customStyle += `font: ${data.font};`;
        }
        if (data.height) {
            customStyle += `height: ${data.height};`;
        }
        return customStyle;
    },
    /**
     * calculate and update position of popover.
     * @param {current popup use for update position of popup} $popup
     * @param {use for detect position of widget icon*} widgets
     */
    updatePosition: function($popup, widgets) {
        // TODO: hardcode sizes of the popup for now. (based on length of menu text and number of items)
        var widthPopup = 190;

        // hieght: margin (top and bottom) + height of every item
        var heightPopup = 32;
        for (var i = 0; i < this.itemList.length; i++) {
            // height of item + padding (top and bottom)
            heightPopup += (this.itemList[i].height + 8);
        }
        var paddingDistance = 20;

        // sizes of screen should correct all browsers/devices
        var actualWidth =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth ||
            document.body.offsetWidth;
        var actualHeight =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight ||
            document.body.offsetHeight;

        var widgetIcon = document.getElementsByClassName('widget');
        // leftPopup: from left screen to last point on the right of widget button ( Magic Block icon).
        var rightPopup = widgets.getBoundingClientRect().left + widgetIcon[0].clientWidth + widthPopup + paddingDistance;
        // topPopup: from top screen to last point on the bottom of widget button ( Magic Block icon).
        var bottomPopup = widgets.getBoundingClientRect().top + widgetIcon[0].clientHeight + heightPopup + paddingDistance;

        // sizes of popup exceed size of screen
        if (rightPopup > actualWidth) {
            $popup.style.left = widgets.getBoundingClientRect().left + widgetIcon[0].clientWidth - (rightPopup - actualWidth) + 'px';
        } else {
            $popup.style.left = widgets.getBoundingClientRect().left + widgetIcon[0].clientWidth + 'px';
        }

        if (bottomPopup > actualHeight) {
            $popup.style.top = widgets.getBoundingClientRect().top - heightPopup - paddingDistance + 'px';
        } else {
            $popup.style.top = widgets.getBoundingClientRect().top + widgetIcon[0].clientHeight + 'px';
        }
        return $popup;
    }
}
