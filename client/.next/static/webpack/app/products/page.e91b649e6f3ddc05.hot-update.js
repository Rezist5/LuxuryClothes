"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/products/page",{

/***/ "(app-pages-browser)/./src/app/products/page.tsx":
/*!***********************************!*\
  !*** ./src/app/products/page.tsx ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ProductsPage; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-query */ \"(app-pages-browser)/./node_modules/react-query/es/index.js\");\n/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/api */ \"(app-pages-browser)/./src/lib/api.ts\");\n/* harmony import */ var _components_products_ProductCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/products/ProductCard */ \"(app-pages-browser)/./src/components/products/ProductCard.tsx\");\n/* harmony import */ var _components_products_ProductFilters__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/products/ProductFilters */ \"(app-pages-browser)/./src/components/products/ProductFilters.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction ProductsPage() {\n    _s();\n    const [filters, setFilters] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({\n        gender: \"\",\n        condition: \"\",\n        minPrice: \"\",\n        maxPrice: \"\",\n        sort: \"latest\"\n    });\n    const { data: products, isLoading } = (0,react_query__WEBPACK_IMPORTED_MODULE_2__.useQuery)([\n        \"products\",\n        filters\n    ], ()=>(0,_lib_api__WEBPACK_IMPORTED_MODULE_3__.fetchProducts)(filters));\n    if (isLoading) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: \"Loading...\"\n        }, void 0, false, {\n            fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\products\\\\page.tsx\",\n            lineNumber: 24,\n            columnNumber: 12\n        }, this);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"flex gap-8\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"w-64 flex-shrink-0\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_products_ProductFilters__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                        filters: filters,\n                        onFilterChange: setFilters\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\products\\\\page.tsx\",\n                        lineNumber: 32,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\products\\\\page.tsx\",\n                    lineNumber: 31,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex-1\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\",\n                        children: products === null || products === void 0 ? void 0 : products.map((product)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_products_ProductCard__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                product: product\n                            }, product.id, false, {\n                                fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\products\\\\page.tsx\",\n                                lineNumber: 39,\n                                columnNumber: 15\n                            }, this))\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\products\\\\page.tsx\",\n                        lineNumber: 37,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\products\\\\page.tsx\",\n                    lineNumber: 36,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\products\\\\page.tsx\",\n            lineNumber: 29,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\products\\\\page.tsx\",\n        lineNumber: 28,\n        columnNumber: 5\n    }, this);\n}\n_s(ProductsPage, \"aiHTupFsWZC8oxQB2WE3R8QCKNk=\", false, function() {\n    return [\n        react_query__WEBPACK_IMPORTED_MODULE_2__.useQuery\n    ];\n});\n_c = ProductsPage;\nvar _c;\n$RefreshReg$(_c, \"ProductsPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcHJvZHVjdHMvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUVnQztBQUNNO0FBQ0c7QUFDa0I7QUFDTTtBQUVsRCxTQUFTSzs7SUFDdEIsTUFBTSxDQUFDQyxTQUFTQyxXQUFXLEdBQUdQLCtDQUFRQSxDQUFDO1FBQ3JDUSxRQUFRO1FBQ1JDLFdBQVc7UUFDWEMsVUFBVTtRQUNWQyxVQUFVO1FBQ1ZDLE1BQU07SUFDUjtJQUVBLE1BQU0sRUFBRUMsTUFBTUMsUUFBUSxFQUFFQyxTQUFTLEVBQUUsR0FBR2QscURBQVFBLENBQzVDO1FBQUM7UUFBWUs7S0FBUSxFQUNyQixJQUFNSix1REFBYUEsQ0FBQ0k7SUFHdEIsSUFBSVMsV0FBVztRQUNiLHFCQUFPLDhEQUFDQztzQkFBSTs7Ozs7O0lBQ2Q7SUFFQSxxQkFDRSw4REFBQ0E7UUFBSUMsV0FBVTtrQkFDYiw0RUFBQ0Q7WUFBSUMsV0FBVTs7OEJBRWIsOERBQUNEO29CQUFJQyxXQUFVOzhCQUNiLDRFQUFDYiwyRUFBY0E7d0JBQUNFLFNBQVNBO3dCQUFTWSxnQkFBZ0JYOzs7Ozs7Ozs7Ozs4QkFJcEQsOERBQUNTO29CQUFJQyxXQUFVOzhCQUNiLDRFQUFDRDt3QkFBSUMsV0FBVTtrQ0FDWkgscUJBQUFBLCtCQUFBQSxTQUFVSyxHQUFHLENBQUMsQ0FBQ0Msd0JBQ2QsOERBQUNqQix3RUFBV0E7Z0NBQWtCaUIsU0FBU0E7K0JBQXJCQSxRQUFRQyxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU8xQztHQXJDd0JoQjs7UUFTZ0JKLGlEQUFRQTs7O0tBVHhCSSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL3Byb2R1Y3RzL3BhZ2UudHN4PzRlN2QiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnXG5cbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyB1c2VRdWVyeSB9IGZyb20gJ3JlYWN0LXF1ZXJ5J1xuaW1wb3J0IHsgZmV0Y2hQcm9kdWN0cyB9IGZyb20gJ0AvbGliL2FwaSdcbmltcG9ydCBQcm9kdWN0Q2FyZCBmcm9tICdAL2NvbXBvbmVudHMvcHJvZHVjdHMvUHJvZHVjdENhcmQnXG5pbXBvcnQgUHJvZHVjdEZpbHRlcnMgZnJvbSAnQC9jb21wb25lbnRzL3Byb2R1Y3RzL1Byb2R1Y3RGaWx0ZXJzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQcm9kdWN0c1BhZ2UoKSB7XG4gIGNvbnN0IFtmaWx0ZXJzLCBzZXRGaWx0ZXJzXSA9IHVzZVN0YXRlKHtcbiAgICBnZW5kZXI6ICcnLFxuICAgIGNvbmRpdGlvbjogJycsXG4gICAgbWluUHJpY2U6ICcnLFxuICAgIG1heFByaWNlOiAnJyxcbiAgICBzb3J0OiAnbGF0ZXN0J1xuICB9KVxuXG4gIGNvbnN0IHsgZGF0YTogcHJvZHVjdHMsIGlzTG9hZGluZyB9ID0gdXNlUXVlcnkoXG4gICAgWydwcm9kdWN0cycsIGZpbHRlcnNdLFxuICAgICgpID0+IGZldGNoUHJvZHVjdHMoZmlsdGVycylcbiAgKVxuXG4gIGlmIChpc0xvYWRpbmcpIHtcbiAgICByZXR1cm4gPGRpdj5Mb2FkaW5nLi4uPC9kaXY+XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LTggcHktMTJcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtOFwiPlxuICAgICAgICB7Lyog0KTQuNC70YzRgtGA0YsgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy02NCBmbGV4LXNocmluay0wXCI+XG4gICAgICAgICAgPFByb2R1Y3RGaWx0ZXJzIGZpbHRlcnM9e2ZpbHRlcnN9IG9uRmlsdGVyQ2hhbmdlPXtzZXRGaWx0ZXJzfSAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7Lyog0KHQv9C40YHQvtC6INC/0YDQvtC00YPQutGC0L7QsiAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTFcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTMgZ2FwLTZcIj5cbiAgICAgICAgICAgIHtwcm9kdWN0cz8ubWFwKChwcm9kdWN0KSA9PiAoXG4gICAgICAgICAgICAgIDxQcm9kdWN0Q2FyZCBrZXk9e3Byb2R1Y3QuaWR9IHByb2R1Y3Q9e3Byb2R1Y3R9IC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKVxufSJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZVF1ZXJ5IiwiZmV0Y2hQcm9kdWN0cyIsIlByb2R1Y3RDYXJkIiwiUHJvZHVjdEZpbHRlcnMiLCJQcm9kdWN0c1BhZ2UiLCJmaWx0ZXJzIiwic2V0RmlsdGVycyIsImdlbmRlciIsImNvbmRpdGlvbiIsIm1pblByaWNlIiwibWF4UHJpY2UiLCJzb3J0IiwiZGF0YSIsInByb2R1Y3RzIiwiaXNMb2FkaW5nIiwiZGl2IiwiY2xhc3NOYW1lIiwib25GaWx0ZXJDaGFuZ2UiLCJtYXAiLCJwcm9kdWN0IiwiaWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/products/page.tsx\n"));

/***/ })

});