"use strict";
(() => {
var exports = {};
exports.id = 290;
exports.ids = [290];
exports.modules = {

/***/ 4096:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Show)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(903);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_icons_material_Save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9932);
/* harmony import */ var _mui_icons_material_Save__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Save__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_icons_material_FolderOpen__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2681);
/* harmony import */ var _mui_icons_material_FolderOpen__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_FolderOpen__WEBPACK_IMPORTED_MODULE_5__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_store__WEBPACK_IMPORTED_MODULE_1__]);
_store__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






function Show() {
    const universeState = (0,_store__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)();
    console.log(universeState.mode);
    const [anchorEl, setAnchorEl] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(null);
    const open = Boolean(anchorEl);
    const handleClick = (event)=>{
        setAnchorEl(event.currentTarget);
    };
    const handleClose = ()=>{
        setAnchorEl(null);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Stack, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.AppBar, {
                component: "nav",
                sx: {
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    padding: "0.5rem 0.5rem",
                    opacity: "90%"
                },
                position: "sticky",
                children: [
                    universeState.mode.Programming === null || universeState.mode.Programming === undefined ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Card, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.TextField, {
                            color: "secondary",
                            id: "program-name",
                            label: "Programmname",
                            variant: "filled",
                            InputProps: {
                                endAdornment: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.IconButton, {
                                    color: "inherit",
                                    "aria-label": "open drawer",
                                    edge: "start",
                                    sx: {
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        margin: "0",
                                        padding: "0rem 0rem 0rem 0.3rem"
                                    },
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Save__WEBPACK_IMPORTED_MODULE_3___default()), {})
                                })
                            }
                        })
                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Card, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.TextField, {
                            id: "program-name",
                            label: universeState.mode.Programming,
                            variant: "filled"
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Card, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.IconButton, {
                            "aria-label": "\xd6ffnen",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_FolderOpen__WEBPACK_IMPORTED_MODULE_5___default()), {})
                        })
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Stack, {
                direction: "column",
                justifyContent: "space-evenly",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Typography, {
                    variant: "h6",
                    children: "Szenen"
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2681:
/***/ ((module) => {

module.exports = require("@mui/icons-material/FolderOpen");

/***/ }),

/***/ 9932:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Save");

/***/ }),

/***/ 5692:
/***/ ((module) => {

module.exports = require("@mui/material");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 6912:
/***/ ((module) => {

module.exports = import("zustand");;

/***/ }),

/***/ 3602:
/***/ ((module) => {

module.exports = import("zustand/middleware");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [903], () => (__webpack_exec__(4096)));
module.exports = __webpack_exports__;

})();