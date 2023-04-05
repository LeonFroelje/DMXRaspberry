"use strict";
exports.id = 903;
exports.ids = [903];
exports.modules = {

/***/ 903:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6912);
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3602);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zustand__WEBPACK_IMPORTED_MODULE_0__, zustand_middleware__WEBPACK_IMPORTED_MODULE_1__]);
([zustand__WEBPACK_IMPORTED_MODULE_0__, zustand_middleware__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


const useUniverseState = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)()((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__.devtools)((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__.persist)((set)=>({
        name: "",
        mode: "",
        fixtures: [],
        fetchErrors: [],
        setFixtures: (fixtures)=>set({
                fixtures: fixtures
            }),
        setName: (name)=>set({
                name: name
            }),
        setMode: (mode)=>set({
                mode: mode
            }),
        updateFixture: (fixture)=>{
            set((state)=>({
                    fixtures: state.fixtures !== undefined ? state.fixtures.map((f)=>{
                        return f.id === fixture.id ? fixture : f;
                    }) : state.fixtures
                }));
        },
        addFixture: (fixture)=>{
            set((state)=>({
                    fixtures: state.fixtures !== undefined ? [
                        ...state.fixtures,
                        fixture
                    ] : state.fixtures
                }));
        },
        removeFixture: (fixture)=>{
            set((state)=>({
                    fixtures: state.fixtures !== undefined ? state.fixtures.filter((f)=>{
                        return f.id !== fixture.id;
                    }) : state.fixtures
                }));
        },
        addError: (err)=>{
            set((state)=>({
                    fetchErrors: [
                        ...state.fetchErrors,
                        err
                    ]
                }));
        },
        popError: ()=>{
        // set(state => ({
        //     fetchErrors
        // }))
        }
    }), {
    name: "universe-storage"
})));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useUniverseState);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;