"use strict";
(() => {
var exports = {};
exports.id = 370;
exports.ids = [370];
exports.modules = {

/***/ 2844:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FixturePage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_icons_material_MoreVertOutlined__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4658);
/* harmony import */ var _mui_icons_material_MoreVertOutlined__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_MoreVertOutlined__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(903);
/* harmony import */ var _mui_icons_material_AddCircleOutline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1507);
/* harmony import */ var _mui_icons_material_AddCircleOutline__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_AddCircleOutline__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_use_websocket__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7636);
/* harmony import */ var react_use_websocket__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_use_websocket__WEBPACK_IMPORTED_MODULE_6__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_store__WEBPACK_IMPORTED_MODULE_4__]);
_store__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];







function FixturePage() {
    var _universeState_fixtures;
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const { fid  } = router.query;
    const universeState = (0,_store__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)();
    const websocket = react_use_websocket__WEBPACK_IMPORTED_MODULE_6___default()("ws://192.168.178.150:4000/api/ws", {
        share: true
    });
    let fixture = (_universeState_fixtures = universeState.fixtures) === null || _universeState_fixtures === void 0 ? void 0 : _universeState_fixtures.find((fixture)=>{
        return fixture.id == fid;
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Stack, {
        sx: {
            width: "100%",
            minHeight: "100%"
        },
        rowGap: "1rem",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_1__.AppBar, {
                component: "nav",
                sx: {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0rem 0.5rem",
                    opacity: "90%"
                },
                position: "sticky",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Typography, {
                        variant: "h5",
                        component: "div",
                        children: fixture === null || fixture === void 0 ? void 0 : fixture.name
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Toolbar, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.IconButton, {
                            color: "inherit",
                            "aria-label": "open drawer",
                            edge: "start",
                            onClick: ()=>{},
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_MoreVertOutlined__WEBPACK_IMPORTED_MODULE_3___default()), {})
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Card, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.CardHeader, {
                        titleTypographyProps: {
                            fontWeight: "500",
                            fontSize: "1rem",
                            lineHeight: "1"
                        },
                        title: "Szenen und Effekte",
                        action: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.IconButton, {
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_AddCircleOutline__WEBPACK_IMPORTED_MODULE_5___default()), {})
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.CardContent, {
                        children: "TODO: Szenen und Effekte(z.B. Lauflicht) f\xfcr einzelne Lampen bzw. Gruppen von Lampen einrichten"
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                direction: "row",
                gap: "2rem",
                height: "50vh",
                justifyContent: "space-between",
                padding: "0rem 1rem 6re 1rem",
                overflow: "auto",
                children: fixture === null || fixture === void 0 ? void 0 : fixture.active_mode.map((channel, index)=>{
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                direction: "column",
                                alignItems: "center",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Typography, {
                                        variant: "caption",
                                        children: channel.address
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Box, {
                                        height: "75%",
                                        marginBottom: "1rem",
                                        marginTop: "1rem",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Slider, {
                                            min: 0,
                                            max: 255,
                                            sx: {
                                                '& input[type="range"]': {
                                                    WebkitAppearance: "slider-vertical"
                                                }
                                            },
                                            id: index.toString(),
                                            orientation: "vertical",
                                            defaultValue: channel.data,
                                            "aria-label": channel.channel_type,
                                            valueLabelDisplay: "auto",
                                            onChange: (_event, value)=>{
                                                if (fixture) {
                                                    fixture.active_mode[index].data = value;
                                                    universeState.updateFixture(fixture);
                                                    let msg = {
                                                        url: "/fixtures/update",
                                                        text: JSON.stringify(fixture)
                                                    };
                                                    try {
                                                        websocket.sendJsonMessage(msg);
                                                    } catch  {
                                                        console.log("Kein Websocket");
                                                    }
                                                }
                                            }
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Typography, {
                                        variant: "caption",
                                        children: channel.channel_type
                                    })
                                ]
                            }, channel.address),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Divider, {
                                orientation: "vertical"
                            })
                        ]
                    });
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1507:
/***/ ((module) => {

module.exports = require("@mui/icons-material/AddCircleOutline");

/***/ }),

/***/ 4658:
/***/ ((module) => {

module.exports = require("@mui/icons-material/MoreVertOutlined");

/***/ }),

/***/ 5692:
/***/ ((module) => {

module.exports = require("@mui/material");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 7636:
/***/ ((module) => {

module.exports = require("react-use-websocket");

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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [903], () => (__webpack_exec__(2844)));
module.exports = __webpack_exports__;

})();