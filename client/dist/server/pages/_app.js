(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 4178:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6764);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_BottomNavigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5678);
/* harmony import */ var _mui_material_BottomNavigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_BottomNavigation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_BottomNavigationAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7307);
/* harmony import */ var _mui_material_BottomNavigationAction__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_BottomNavigationAction__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_icons_material_CodeOutlined__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6131);
/* harmony import */ var _mui_icons_material_CodeOutlined__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_CodeOutlined__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_icons_material_HomeOutlined__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9989);
/* harmony import */ var _mui_icons_material_HomeOutlined__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_HomeOutlined__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_icons_material_PlayCircleFilledWhiteOutlined__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5865);
/* harmony import */ var _mui_icons_material_PlayCircleFilledWhiteOutlined__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_PlayCircleFilledWhiteOutlined__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_icons_material_SettingsOutlined__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5649);
/* harmony import */ var _mui_icons_material_SettingsOutlined__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_SettingsOutlined__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mui_icons_material_HourglassEmptyOutlined__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1754);
/* harmony import */ var _mui_icons_material_HourglassEmptyOutlined__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_HourglassEmptyOutlined__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _mui_material_Stack__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8742);
/* harmony import */ var _mui_material_Stack__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(19);
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Box__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _src_Link__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3460);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(9648);
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(5941);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(903);
/* harmony import */ var react_use_websocket_dist_lib_use_websocket__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(9314);
/* harmony import */ var react_use_websocket_dist_lib_use_websocket__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(react_use_websocket_dist_lib_use_websocket__WEBPACK_IMPORTED_MODULE_17__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_14__, swr__WEBPACK_IMPORTED_MODULE_15__, _store__WEBPACK_IMPORTED_MODULE_16__]);
([axios__WEBPACK_IMPORTED_MODULE_14__, swr__WEBPACK_IMPORTED_MODULE_15__, _store__WEBPACK_IMPORTED_MODULE_16__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


















// type IndexResponse
const fetcher = (path)=>axios__WEBPACK_IMPORTED_MODULE_14__["default"].get(`/${path}`).then((res)=>res.data);
function App({ Component , pageProps  }) {
    const [value, setValue] = (0,react__WEBPACK_IMPORTED_MODULE_13__.useState)(0);
    const { data , error  } = (0,swr__WEBPACK_IMPORTED_MODULE_15__["default"])("api/index", fetcher);
    const universeState = (0,_store__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .Z)();
    // const [messageHistory, setMessageHistory] = useState([]);
    const websocket = (0,react_use_websocket_dist_lib_use_websocket__WEBPACK_IMPORTED_MODULE_17__.useWebSocket)("ws://localhost:4000/api/ws", {
        share: true
    });
    console.log(websocket);
    if (error) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            children: "Error beim laden der Daten"
        });
    }
    if (!data) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            children: "L\xe4dt..."
        });
    }
    if (universeState.fixtures !== data.fixtures) {
        universeState.setFixtures(data.fixtures);
    }
    if (universeState.mode !== data.mode) {
        universeState.setMode(data.mode);
    }
    if (universeState.name !== data.name) {
        universeState.setName(data.name);
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_12__.Paper, {
        sx: {
            idh: "100%",
            minHeight: "100vh"
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_Stack__WEBPACK_IMPORTED_MODULE_9___default()), {
            sx: {
                justifyContent: "space-between",
                minHeight: "100%"
            },
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Box__WEBPACK_IMPORTED_MODULE_10___default()), {
                    paddingBottom: "60px",
                    minHeight: "100vh",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                        ...pageProps
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_12__.Divider, {
                    orientation: "horizontal"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Box__WEBPACK_IMPORTED_MODULE_10___default()), {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_BottomNavigation__WEBPACK_IMPORTED_MODULE_2___default()), {
                        sx: {
                            idh: "100%",
                            position: "fixed",
                            bottom: 0,
                            borderTop: "1px soidrgba(0, 0, 0, 0.12)"
                        },
                        value: value,
                        onChange: (_event, newValue)=>{
                            setValue(newValue);
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_BottomNavigationAction__WEBPACK_IMPORTED_MODULE_3___default()), {
                                component: _src_Link__WEBPACK_IMPORTED_MODULE_11__/* .NextLinkComposed */ .Z,
                                to: "/",
                                sx: {
                                    minidh: "auto"
                                },
                                label: "Home",
                                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_HomeOutlined__WEBPACK_IMPORTED_MODULE_5___default()), {})
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_BottomNavigationAction__WEBPACK_IMPORTED_MODULE_3___default()), {
                                component: _src_Link__WEBPACK_IMPORTED_MODULE_11__/* .NextLinkComposed */ .Z,
                                to: "/program",
                                sx: {
                                    minidh: "auto"
                                },
                                label: "Program",
                                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_CodeOutlined__WEBPACK_IMPORTED_MODULE_4___default()), {})
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_BottomNavigationAction__WEBPACK_IMPORTED_MODULE_3___default()), {
                                component: _src_Link__WEBPACK_IMPORTED_MODULE_11__/* .NextLinkComposed */ .Z,
                                to: "/play",
                                sx: {
                                    minidh: "auto"
                                },
                                label: "Play",
                                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_PlayCircleFilledWhiteOutlined__WEBPACK_IMPORTED_MODULE_6___default()), {})
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_BottomNavigationAction__WEBPACK_IMPORTED_MODULE_3___default()), {
                                component: _src_Link__WEBPACK_IMPORTED_MODULE_11__/* .NextLinkComposed */ .Z,
                                to: "/timecode",
                                sx: {
                                    minidh: "auto"
                                },
                                label: "Timecode",
                                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_HourglassEmptyOutlined__WEBPACK_IMPORTED_MODULE_8___default()), {})
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_BottomNavigationAction__WEBPACK_IMPORTED_MODULE_3___default()), {
                                component: _src_Link__WEBPACK_IMPORTED_MODULE_11__/* .NextLinkComposed */ .Z,
                                to: "/settings",
                                sx: {
                                    minidh: "auto"
                                },
                                label: "Settings",
                                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_SettingsOutlined__WEBPACK_IMPORTED_MODULE_7___default()), {})
                            })
                        ]
                    })
                })
            ]
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3460:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ NextLinkComposed)
});

// UNUSED EXPORTS: default

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: external "clsx"
const external_clsx_namespaceObject = require("clsx");
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: external "@mui/material/Link"
const Link_namespaceObject = require("@mui/material/Link");
// EXTERNAL MODULE: external "@mui/material/styles"
var styles_ = __webpack_require__(8442);
;// CONCATENATED MODULE: ./src/Link.tsx







// Add support for the sx prop for consistency with the other branches.
const Anchor = (0,styles_.styled)("a")({});
const NextLinkComposed = /*#__PURE__*/ external_react_.forwardRef(function NextLinkComposed(props, ref) {
    const { to , linkAs , replace , scroll , shallow , prefetch , legacyBehavior =true , locale , ...other } = props;
    return /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
        href: to,
        prefetch: prefetch,
        as: linkAs,
        replace: replace,
        scroll: scroll,
        shallow: shallow,
        passHref: true,
        locale: locale,
        legacyBehavior: legacyBehavior,
        children: /*#__PURE__*/ jsx_runtime_.jsx(Anchor, {
            ref: ref,
            ...other
        })
    });
});
// A styled version of the Next.js Link component:
// https://nextjs.org/docs/api-reference/next/link
const Link = /*#__PURE__*/ (/* unused pure expression or super */ null && (React.forwardRef(function Link(props, ref) {
    const { activeClassName ="active" , as , className: classNameProps , href , legacyBehavior , linkAs: linkAsProp , locale , noLinkStyle , prefetch , replace , role , scroll , shallow , ...other } = props;
    const router = useRouter();
    const pathname = typeof href === "string" ? href : href.pathname;
    const className = clsx(classNameProps, {
        [activeClassName]: router.pathname === pathname && activeClassName
    });
    const isExternal = typeof href === "string" && (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0);
    if (isExternal) {
        if (noLinkStyle) {
            return /*#__PURE__*/ _jsx(Anchor, {
                className: className,
                href: href,
                ref: ref,
                ...other
            });
        }
        return /*#__PURE__*/ _jsx(MuiLink, {
            className: className,
            href: href,
            ref: ref,
            ...other
        });
    }
    const linkAs = linkAsProp || as;
    const nextjsProps = {
        to: href,
        linkAs,
        replace,
        scroll,
        shallow,
        prefetch,
        legacyBehavior,
        locale
    };
    if (noLinkStyle) {
        return /*#__PURE__*/ _jsx(NextLinkComposed, {
            className: className,
            ref: ref,
            ...nextjsProps,
            ...other
        });
    }
    return /*#__PURE__*/ _jsx(MuiLink, {
        component: NextLinkComposed,
        className: className,
        ref: ref,
        ...nextjsProps,
        ...other
    });
})));
/* harmony default export */ const src_Link = ((/* unused pure expression or super */ null && (Link)));


/***/ }),

/***/ 6764:
/***/ (() => {



/***/ }),

/***/ 6131:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/icons-material/CodeOutlined");

/***/ }),

/***/ 9989:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/icons-material/HomeOutlined");

/***/ }),

/***/ 1754:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/icons-material/HourglassEmptyOutlined");

/***/ }),

/***/ 5865:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/icons-material/PlayCircleFilledWhiteOutlined");

/***/ }),

/***/ 5649:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/icons-material/SettingsOutlined");

/***/ }),

/***/ 5692:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material");

/***/ }),

/***/ 5678:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/BottomNavigation");

/***/ }),

/***/ 7307:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/BottomNavigationAction");

/***/ }),

/***/ 19:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/Box");

/***/ }),

/***/ 8742:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/Stack");

/***/ }),

/***/ 8442:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/styles");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 1109:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 7782:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 9314:
/***/ ((module) => {

"use strict";
module.exports = require("react-use-websocket/dist/lib/use-websocket");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 9648:
/***/ ((module) => {

"use strict";
module.exports = import("axios");;

/***/ }),

/***/ 5941:
/***/ ((module) => {

"use strict";
module.exports = import("swr");;

/***/ }),

/***/ 6912:
/***/ ((module) => {

"use strict";
module.exports = import("zustand");;

/***/ }),

/***/ 3602:
/***/ ((module) => {

"use strict";
module.exports = import("zustand/middleware");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [664,903], () => (__webpack_exec__(4178)));
module.exports = __webpack_exports__;

})();