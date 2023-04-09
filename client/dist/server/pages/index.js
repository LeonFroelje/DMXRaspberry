"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 2603:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Home)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(580);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(903);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_Stack__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8742);
/* harmony import */ var _mui_material_Stack__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19);
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Box__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_material_AppBar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3882);
/* harmony import */ var _mui_material_AppBar__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_AppBar__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mui_material_Avatar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2120);
/* harmony import */ var _mui_material_Avatar__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Avatar__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7934);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _mui_material_List__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4192);
/* harmony import */ var _mui_material_List__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_mui_material_List__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _mui_material_ListItem__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(834);
/* harmony import */ var _mui_material_ListItem__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_mui_material_ListItem__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1011);
/* harmony import */ var _mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(8315);
/* harmony import */ var _mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _mui_icons_material_MoreVertOutlined__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(4658);
/* harmony import */ var _mui_icons_material_MoreVertOutlined__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_MoreVertOutlined__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _mui_material_Toolbar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(1431);
/* harmony import */ var _mui_material_Toolbar__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Toolbar__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _mui_material_Switch__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(3191);
/* harmony import */ var _mui_material_Switch__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Switch__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(8442);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(5574);
/* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_mui_material_colors__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _mui_material_ListItemAvatar__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(2101);
/* harmony import */ var _mui_material_ListItemAvatar__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_mui_material_ListItemAvatar__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _mui_material_Dialog__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(8611);
/* harmony import */ var _mui_material_Dialog__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Dialog__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(6146);
/* harmony import */ var _mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _src_components_fixturecard__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(8647);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_store__WEBPACK_IMPORTED_MODULE_2__, _src_components_fixturecard__WEBPACK_IMPORTED_MODULE_22__]);
([_store__WEBPACK_IMPORTED_MODULE_2__, _src_components_fixturecard__WEBPACK_IMPORTED_MODULE_22__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
























function Home() {
    const [settingsOpen, setSettingsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [universeOutput, setUniverseOutput] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(true);
    const universeState = (0,_store__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)();
    const handleChange = (e)=>{
    // if (e.target.checked) {
    // }
    // TODO: Send request to server that switches entire universe off
    };
    const handleClick = ()=>{};
    const handleClickOpen = ()=>{
        setSettingsOpen(true);
    };
    const handleClose = (value)=>{
        setSettingsOpen(false);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_Stack__WEBPACK_IMPORTED_MODULE_4___default()), {
        sx: {
            width: "100%"
        },
        rowGap: "1rem",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_AppBar__WEBPACK_IMPORTED_MODULE_6___default()), {
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
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.Typography, {
                        variant: "h5",
                        component: "div",
                        children: universeState.name
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_Toolbar__WEBPACK_IMPORTED_MODULE_15___default()), {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_9___default()), {
                                color: "inherit",
                                "aria-label": "open drawer",
                                edge: "start",
                                onClick: handleClickOpen,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_MoreVertOutlined__WEBPACK_IMPORTED_MODULE_14___default()), {})
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(UniverseDialog, {
                                open: settingsOpen,
                                onClose: handleClose
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(GreenSwitch, {
                                checked: universeOutput,
                                onChange: handleChange
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_Stack__WEBPACK_IMPORTED_MODULE_4___default()), {
                flexDirection: "column",
                padding: "1rem",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_5___default()), {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.Typography, {
                                variant: "h6",
                                component: "div",
                                children: "Lampen"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Stack__WEBPACK_IMPORTED_MODULE_4___default()), {
                                gap: ".5rem",
                                children: universeState.fixtures !== undefined ? universeState.fixtures.map((fixture, index)=>{
                                    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_fixturecard__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .Z, {
                                        fixture: fixture,
                                        index: index
                                    }, fixture.id);
                                }) : "Keine Lampen"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_5___default()), {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.Typography, {
                                variant: "h6",
                                component: "div",
                                children: "Gruppen"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.Typography, {
                                variant: "h6",
                                component: "div",
                                children: "jksadjalsjdska"
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
function UniverseDialog(props) {
    const { onClose , selectedValue , open  } = props;
    const handleClose = ()=>{
        onClose(selectedValue);
    };
    const handleListItemClick = (value)=>{
        onClose(value);
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Dialog__WEBPACK_IMPORTED_MODULE_20___default()), {
        onClose: handleClose,
        open: open,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_List__WEBPACK_IMPORTED_MODULE_10___default()), {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_ListItem__WEBPACK_IMPORTED_MODULE_11___default()), {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_12___default()), {
                        autoFocus: true,
                        onClick: ()=>handleListItemClick("addFixture"),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_ListItemAvatar__WEBPACK_IMPORTED_MODULE_19___default()), {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Avatar__WEBPACK_IMPORTED_MODULE_8___default()), {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_21___default()), {})
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_13___default()), {
                                primary: "Lampe hinzuf\xfcgen"
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_ListItem__WEBPACK_IMPORTED_MODULE_11___default()), {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_12___default()), {
                        autoFocus: true,
                        onClick: ()=>handleListItemClick("addGroup"),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_ListItemAvatar__WEBPACK_IMPORTED_MODULE_19___default()), {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Avatar__WEBPACK_IMPORTED_MODULE_8___default()), {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_21___default()), {})
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_13___default()), {
                                primary: "Gruppe erstellen"
                            })
                        ]
                    })
                })
            ]
        })
    });
}
UniverseDialog.propTypes = {
    onClose: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func.isRequired),
    open: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool.isRequired)
};
const GreenSwitch = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_17__.styled)((_mui_material_Switch__WEBPACK_IMPORTED_MODULE_16___default()))(({ theme  })=>({
        "& .MuiSwitch-switchBase.Mui-checked": {
            color: _mui_material_colors__WEBPACK_IMPORTED_MODULE_18__.green[300],
            "&:hover": {
                backgroundColor: (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_17__.alpha)(_mui_material_colors__WEBPACK_IMPORTED_MODULE_18__.green[300], theme.palette.action.hoverOpacity)
            }
        },
        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            backgroundColor: _mui_material_colors__WEBPACK_IMPORTED_MODULE_18__.green[300]
        }
    }));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8647:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ FixtureCard)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_icons_material_Lightbulb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(549);
/* harmony import */ var _mui_icons_material_Lightbulb__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Lightbulb__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(903);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_store__WEBPACK_IMPORTED_MODULE_3__, axios__WEBPACK_IMPORTED_MODULE_6__]);
([_store__WEBPACK_IMPORTED_MODULE_3__, axios__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const findIntensityChannel = (fixture)=>{
    return fixture.active_mode.findIndex((channel)=>{
        return channel.channel_type === "Intensity";
    });
};
const fixtureHasOnlyIntensity = (fixture)=>{
    if (fixture.active_mode.filter((channel)=>{
        return channel.channel_type.includes("ntensity");
    }).length === fixture.active_mode.length) {
        return true;
    }
    return false;
};
const updateIntensity = (fixture, value)=>{
    const index = findIntensityChannel(fixture);
    fixture.active_mode[index].data = value;
    return fixture;
};
const updateAll = (fixture, value)=>{
    for(let i = 0; i < fixture.active_mode.length; i++){
        const channel = fixture.active_mode[i];
        fixture.active_mode[i].data = channel.data > 0 ? channel.data - 1 : channel.data;
    }
    return fixture;
};
function FixtureCard(props) {
    const universeState = (0,_store__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)();
    let fixture = props.fixture;
    const intensityChannel = findIntensityChannel(fixture);
    const initial_value = intensityChannel >= 0 ? fixture.active_mode[intensityChannel].data : ()=>{
        let f = fixture.active_mode.reduce((prev, curr, index)=>{
            return {
                address: index,
                data: prev.data + curr.data,
                channel_type: "",
                default_value: -1,
                capabilities: new Map
            };
        });
        return f.data / f.address;
    };
    const [value, setValue] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(initial_value);
    const handleChange = (event, value)=>{
        let f = updateIntensity(fixture, value);
        universeState.updateFixture({
            ...f
        });
        axios__WEBPACK_IMPORTED_MODULE_6__["default"].post("/api/fixtures/update", fixture).then((res)=>res.data).catch((err)=>err);
    };
    // const handleChangeNoIntensity = (event, value) => {
    //     fixture.active_mode.forEach(channel => {
    //         if(channel.data - value > 0){
    //             channel.data --;
    //         }
    //     })
    // }
    const handleFixtureToggle = (e)=>{
    // universeState.toggleFixtureState(!e.target.checked, e.target.id.split("-")[1]);
    // send request to server to toggle the fixture state
    // at fixture index i of universe
    };
    if (intensityChannel < 0) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_5___default()), {
            color: "#000",
            href: `/fixtures/${fixture.id}`,
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Card, {
                id: `fixture-${fixture.id}-card`,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.CardHeader, {
                        avatar: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Lightbulb__WEBPACK_IMPORTED_MODULE_2___default()), {}),
                        action: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Switch, {
                            checked: fixture.active_mode.filter((c)=>{
                                c.data > 0;
                            }).length > 0,
                            id: `fixture-${fixture.id}-switch`,
                            onChange: handleFixtureToggle,
                            onClick: (event)=>{
                                event.stopPropagation();
                                event.preventDefault();
                            }
                        }),
                        title: fixture.name,
                        subheader: `${fixture.active_mode.length}-channels, ${fixture.fixture_type}`
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.CardActions, {
                        sx: {
                            padding: "0.5rem 1rem 0.5rem"
                        },
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Slider, {
                            min: 0,
                            max: 255,
                            "aria-label": "Intensity",
                            value: value,
                            onChange: (event, newValue)=>{
                                let f = updateAll(fixture, value);
                                universeState.updateFixture({
                                    ...f
                                });
                                axios__WEBPACK_IMPORTED_MODULE_6__["default"].post("/api/fixtures/update", fixture).then((res)=>res.data).catch((err)=>err);
                            },
                            onClick: (event)=>{
                                event.stopPropagation();
                                event.preventDefault();
                            },
                            sx: {
                                boxSizing: "border-box"
                            }
                        })
                    })
                ]
            })
        });
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_5___default()), {
        href: `/fixtures/${fixture.id}`,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Card, {
            id: `fixture-${fixture.id}-card`,
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.CardHeader, {
                    avatar: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Lightbulb__WEBPACK_IMPORTED_MODULE_2___default()), {}),
                    action: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Switch, {
                        checked: fixture.active_mode.filter((c)=>{
                            c.data > 0;
                        }).length > 0,
                        id: `fixture-${fixture.id}-switch`,
                        onChange: handleFixtureToggle,
                        onClick: (event)=>{
                            event.stopPropagation();
                            event.preventDefault();
                        }
                    }),
                    title: fixture.name,
                    subheader: fixture.fixture_type
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.CardActions, {
                    sx: {
                        padding: "0.5rem 1rem 0.5rem"
                    },
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Slider, {
                        min: 0,
                        max: 255,
                        "aria-label": "Intensity",
                        value: value,
                        onChangeCommitted: handleChange,
                        onChange: (event, newValue)=>{
                            setValue(newValue);
                        },
                        onClick: (event)=>{
                            event.stopPropagation();
                            event.preventDefault();
                        },
                        sx: {
                            boxSizing: "border-box"
                        }
                    })
                })
            ]
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6146:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Add");

/***/ }),

/***/ 549:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Lightbulb");

/***/ }),

/***/ 4658:
/***/ ((module) => {

module.exports = require("@mui/icons-material/MoreVertOutlined");

/***/ }),

/***/ 5692:
/***/ ((module) => {

module.exports = require("@mui/material");

/***/ }),

/***/ 3882:
/***/ ((module) => {

module.exports = require("@mui/material/AppBar");

/***/ }),

/***/ 2120:
/***/ ((module) => {

module.exports = require("@mui/material/Avatar");

/***/ }),

/***/ 19:
/***/ ((module) => {

module.exports = require("@mui/material/Box");

/***/ }),

/***/ 8611:
/***/ ((module) => {

module.exports = require("@mui/material/Dialog");

/***/ }),

/***/ 7934:
/***/ ((module) => {

module.exports = require("@mui/material/IconButton");

/***/ }),

/***/ 4192:
/***/ ((module) => {

module.exports = require("@mui/material/List");

/***/ }),

/***/ 834:
/***/ ((module) => {

module.exports = require("@mui/material/ListItem");

/***/ }),

/***/ 2101:
/***/ ((module) => {

module.exports = require("@mui/material/ListItemAvatar");

/***/ }),

/***/ 1011:
/***/ ((module) => {

module.exports = require("@mui/material/ListItemButton");

/***/ }),

/***/ 8315:
/***/ ((module) => {

module.exports = require("@mui/material/ListItemText");

/***/ }),

/***/ 8742:
/***/ ((module) => {

module.exports = require("@mui/material/Stack");

/***/ }),

/***/ 3191:
/***/ ((module) => {

module.exports = require("@mui/material/Switch");

/***/ }),

/***/ 1431:
/***/ ((module) => {

module.exports = require("@mui/material/Toolbar");

/***/ }),

/***/ 5574:
/***/ ((module) => {

module.exports = require("@mui/material/colors");

/***/ }),

/***/ 8442:
/***/ ((module) => {

module.exports = require("@mui/material/styles");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 1109:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 7782:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 580:
/***/ ((module) => {

module.exports = require("prop-types");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 9648:
/***/ ((module) => {

module.exports = import("axios");;

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
var __webpack_exports__ = __webpack_require__.X(0, [664,903], () => (__webpack_exec__(2603)));
module.exports = __webpack_exports__;

})();