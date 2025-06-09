import{j as t,S as e}from"./index-CkfK2x5R.js";/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]],u=t("house",d);/**
* @license lucide-react v0.510.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const h=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],m=t("refresh-cw",h);/**
* @license lucide-react v0.510.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const x=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],r=t("triangle-alert",x),f=({title:l="Something went wrong",message:o="We encountered an unexpected error. Please try again.",onRetry:n=null,onGoHome:s=null,type:a="error"})=>{const c=()=>{switch(a){case"network":return e.jsx(r,{className:"h-12 w-12 text-orange-500"});case"warning":return e.jsx(r,{className:"h-12 w-12 text-yellow-500"});default:return e.jsx(r,{className:"h-12 w-12 text-red-500"})}},i=()=>{switch(a){case"network":return"bg-orange-50 border-orange-200";case"warning":return"bg-yellow-50 border-yellow-200";default:return"bg-red-50 border-red-200"}};return e.jsx("div",{className:"flex justify-center py-12",children:e.jsxs("div",{className:`max-w-md w-full mx-4 p-8 rounded-lg border-2 ${i()} text-center`,children:[e.jsx("div",{className:"flex justify-center mb-4",children:c()}),e.jsx("h3",{className:"text-xl font-semibold text-gray-900 mb-2",children:l}),e.jsx("p",{className:"text-gray-600 mb-6 leading-relaxed",children:o}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-3 justify-center",children:[n&&e.jsxs("button",{onClick:n,className:"inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",children:[e.jsx(m,{className:"h-4 w-4 mr-2"}),"Try Again"]}),s&&e.jsxs("button",{onClick:s,className:"inline-flex items-center px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",children:[e.jsx(u,{className:"h-4 w-4 mr-2"}),"Go Home"]})]})]})})};export{f};
