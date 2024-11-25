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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ProductsPage; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-query */ \"(app-pages-browser)/./node_modules/react-query/es/index.js\");\n/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/api */ \"(app-pages-browser)/./src/lib/api.ts\");\n/* harmony import */ var _components_products_ProductCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/products/ProductCard */ \"(app-pages-browser)/./src/components/products/ProductCard.tsx\");\n/* harmony import */ var _components_products_ProductFilters__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/products/ProductFilters */ \"(app-pages-browser)/./src/components/products/ProductFilters.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction ProductsPage() {\n    _s();\n    const [page, setPage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);\n    const [filters, setFilters] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});\n    const itemsPerPage = 12;\n    const { data, isLoading } = (0,react_query__WEBPACK_IMPORTED_MODULE_2__.useQuery)([\n        \"products\",\n        page,\n        filters\n    ], ()=>(0,_lib_api__WEBPACK_IMPORTED_MODULE_3__.fetchProducts)({\n            page,\n            ...filters\n        }), {\n        keepPreviousData: true\n    });\n    const products = (data === null || data === void 0 ? void 0 : data.data) || [];\n    const totalPages = Math.ceil(((data === null || data === void 0 ? void 0 : data.total) || 0) / itemsPerPage);\n    if (isLoading) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: \"Loading...\"\n        }, void 0, false, {\n            fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\products\\\\page.tsx\",\n            lineNumber: 26,\n            columnNumber: 12\n        }, this);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"flex gap-8\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"w-64 flex-shrink-0\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_products_ProductFilters__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                        onFilterChange: setFilters\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\products\\\\page.tsx\",\n                        lineNumber: 34,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\products\\\\page.tsx\",\n                    lineNumber: 33,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex-1\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\",\n                            children: products.map((product)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_products_ProductCard__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                    product: product\n                                }, product.id, false, {\n                                    fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\products\\\\page.tsx\",\n                                    lineNumber: 41,\n                                    columnNumber: 15\n                                }, this))\n                        }, void 0, false, {\n                            fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\products\\\\page.tsx\",\n                            lineNumber: 39,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"mt-8 flex justify-center space-x-2\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    onClick: ()=>setPage((p)=>Math.max(1, p - 1)),\n                                    disabled: page === 1,\n                                    className: \"px-4 py-2 border rounded disabled:opacity-50\",\n                                    children: \"Previous\"\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\products\\\\page.tsx\",\n                                    lineNumber: 47,\n                                    columnNumber: 13\n                                }, this),\n                                Array.from({\n                                    length: totalPages\n                                }, (_, i)=>i + 1).map((pageNum)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                        onClick: ()=>setPage(pageNum),\n                                        className: \"px-4 py-2 border rounded \".concat(pageNum === page ? \"bg-black text-white\" : \"\"),\n                                        children: pageNum\n                                    }, pageNum, false, {\n                                        fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\products\\\\page.tsx\",\n                                        lineNumber: 56,\n                                        columnNumber: 15\n                                    }, this)),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    onClick: ()=>setPage((p)=>Math.min(totalPages, p + 1)),\n                                    disabled: page === totalPages,\n                                    className: \"px-4 py-2 border rounded disabled:opacity-50\",\n                                    children: \"Next\"\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\products\\\\page.tsx\",\n                                    lineNumber: 67,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\products\\\\page.tsx\",\n                            lineNumber: 46,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\products\\\\page.tsx\",\n                    lineNumber: 38,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\products\\\\page.tsx\",\n            lineNumber: 31,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\products\\\\page.tsx\",\n        lineNumber: 30,\n        columnNumber: 5\n    }, this);\n}\n_s(ProductsPage, \"Mv2Y3IzdmeySIs7Siu+MS0S9HBA=\", false, function() {\n    return [\n        react_query__WEBPACK_IMPORTED_MODULE_2__.useQuery\n    ];\n});\n_c = ProductsPage;\nvar _c;\n$RefreshReg$(_c, \"ProductsPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcHJvZHVjdHMvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUVnQztBQUNNO0FBQ0c7QUFDa0I7QUFDTTtBQUVsRCxTQUFTSzs7SUFDdEIsTUFBTSxDQUFDQyxNQUFNQyxRQUFRLEdBQUdQLCtDQUFRQSxDQUFDO0lBQ2pDLE1BQU0sQ0FBQ1EsU0FBU0MsV0FBVyxHQUFHVCwrQ0FBUUEsQ0FBQyxDQUFDO0lBQ3hDLE1BQU1VLGVBQWU7SUFFckIsTUFBTSxFQUFFQyxJQUFJLEVBQUVDLFNBQVMsRUFBRSxHQUFHWCxxREFBUUEsQ0FDbEM7UUFBQztRQUFZSztRQUFNRTtLQUFRLEVBQzNCLElBQU1OLHVEQUFhQSxDQUFDO1lBQUVJO1lBQU0sR0FBR0UsT0FBTztRQUFDLElBQ3ZDO1FBQ0VLLGtCQUFrQjtJQUNwQjtJQUdGLE1BQU1DLFdBQVdILENBQUFBLGlCQUFBQSwyQkFBQUEsS0FBTUEsSUFBSSxLQUFJLEVBQUU7SUFDakMsTUFBTUksYUFBYUMsS0FBS0MsSUFBSSxDQUFDLENBQUNOLENBQUFBLGlCQUFBQSwyQkFBQUEsS0FBTU8sS0FBSyxLQUFJLEtBQUtSO0lBRWxELElBQUlFLFdBQVc7UUFDYixxQkFBTyw4REFBQ087c0JBQUk7Ozs7OztJQUNkO0lBRUEscUJBQ0UsOERBQUNBO1FBQUlDLFdBQVU7a0JBQ2IsNEVBQUNEO1lBQUlDLFdBQVU7OzhCQUViLDhEQUFDRDtvQkFBSUMsV0FBVTs4QkFDYiw0RUFBQ2hCLDJFQUFjQTt3QkFBQ2lCLGdCQUFnQlo7Ozs7Ozs7Ozs7OzhCQUlsQyw4REFBQ1U7b0JBQUlDLFdBQVU7O3NDQUNiLDhEQUFDRDs0QkFBSUMsV0FBVTtzQ0FDWk4sU0FBU1EsR0FBRyxDQUFDLENBQUNDLHdCQUNiLDhEQUFDcEIsd0VBQVdBO29DQUFrQm9CLFNBQVNBO21DQUFyQkEsUUFBUUMsRUFBRTs7Ozs7Ozs7OztzQ0FLaEMsOERBQUNMOzRCQUFJQyxXQUFVOzs4Q0FDYiw4REFBQ0s7b0NBQ0NDLFNBQVMsSUFBTW5CLFFBQVEsQ0FBQ29CLElBQU1YLEtBQUtZLEdBQUcsQ0FBQyxHQUFHRCxJQUFJO29DQUM5Q0UsVUFBVXZCLFNBQVM7b0NBQ25CYyxXQUFVOzhDQUNYOzs7Ozs7Z0NBSUFVLE1BQU1DLElBQUksQ0FBQztvQ0FBRUMsUUFBUWpCO2dDQUFXLEdBQUcsQ0FBQ2tCLEdBQUdDLElBQU1BLElBQUksR0FBR1osR0FBRyxDQUFDLENBQUNhLHdCQUN4RCw4REFBQ1Y7d0NBRUNDLFNBQVMsSUFBTW5CLFFBQVE0Qjt3Q0FDdkJmLFdBQVcsNEJBRVYsT0FEQ2UsWUFBWTdCLE9BQU8sd0JBQXdCO2tEQUc1QzZCO3VDQU5JQTs7Ozs7OENBVVQsOERBQUNWO29DQUNDQyxTQUFTLElBQU1uQixRQUFRLENBQUNvQixJQUFNWCxLQUFLb0IsR0FBRyxDQUFDckIsWUFBWVksSUFBSTtvQ0FDdkRFLFVBQVV2QixTQUFTUztvQ0FDbkJLLFdBQVU7OENBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUWI7R0F0RXdCZjs7UUFLTUosaURBQVFBOzs7S0FMZEkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9wcm9kdWN0cy9wYWdlLnRzeD80ZTdkIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50J1xuXG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgdXNlUXVlcnkgfSBmcm9tICdyZWFjdC1xdWVyeSdcbmltcG9ydCB7IGZldGNoUHJvZHVjdHMgfSBmcm9tICdAL2xpYi9hcGknXG5pbXBvcnQgUHJvZHVjdENhcmQgZnJvbSAnQC9jb21wb25lbnRzL3Byb2R1Y3RzL1Byb2R1Y3RDYXJkJ1xuaW1wb3J0IFByb2R1Y3RGaWx0ZXJzIGZyb20gJ0AvY29tcG9uZW50cy9wcm9kdWN0cy9Qcm9kdWN0RmlsdGVycydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUHJvZHVjdHNQYWdlKCkge1xuICBjb25zdCBbcGFnZSwgc2V0UGFnZV0gPSB1c2VTdGF0ZSgxKVxuICBjb25zdCBbZmlsdGVycywgc2V0RmlsdGVyc10gPSB1c2VTdGF0ZSh7fSlcbiAgY29uc3QgaXRlbXNQZXJQYWdlID0gMTJcblxuICBjb25zdCB7IGRhdGEsIGlzTG9hZGluZyB9ID0gdXNlUXVlcnkoXG4gICAgWydwcm9kdWN0cycsIHBhZ2UsIGZpbHRlcnNdLFxuICAgICgpID0+IGZldGNoUHJvZHVjdHMoeyBwYWdlLCAuLi5maWx0ZXJzIH0pLFxuICAgIHtcbiAgICAgIGtlZXBQcmV2aW91c0RhdGE6IHRydWVcbiAgICB9XG4gIClcblxuICBjb25zdCBwcm9kdWN0cyA9IGRhdGE/LmRhdGEgfHwgW11cbiAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbCgoZGF0YT8udG90YWwgfHwgMCkgLyBpdGVtc1BlclBhZ2UpXG5cbiAgaWYgKGlzTG9hZGluZykge1xuICAgIHJldHVybiA8ZGl2PkxvYWRpbmcuLi48L2Rpdj5cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOCBweS0xMlwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC04XCI+XG4gICAgICAgIHsvKiDQpNC40LvRjNGC0YDRiyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTY0IGZsZXgtc2hyaW5rLTBcIj5cbiAgICAgICAgICA8UHJvZHVjdEZpbHRlcnMgb25GaWx0ZXJDaGFuZ2U9e3NldEZpbHRlcnN9IC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiDQodC/0LjRgdC+0Log0L/RgNC+0LTRg9C60YLQvtCyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtMyBnYXAtNlwiPlxuICAgICAgICAgICAge3Byb2R1Y3RzLm1hcCgocHJvZHVjdCkgPT4gKFxuICAgICAgICAgICAgICA8UHJvZHVjdENhcmQga2V5PXtwcm9kdWN0LmlkfSBwcm9kdWN0PXtwcm9kdWN0fSAvPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7Lyog0J/QsNCz0LjQvdCw0YbQuNGPICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtOCBmbGV4IGp1c3RpZnktY2VudGVyIHNwYWNlLXgtMlwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKChwKSA9PiBNYXRoLm1heCgxLCBwIC0gMSkpfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17cGFnZSA9PT0gMX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIGJvcmRlciByb3VuZGVkIGRpc2FibGVkOm9wYWNpdHktNTBcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBQcmV2aW91c1xuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHtBcnJheS5mcm9tKHsgbGVuZ3RoOiB0b3RhbFBhZ2VzIH0sIChfLCBpKSA9PiBpICsgMSkubWFwKChwYWdlTnVtKSA9PiAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBrZXk9e3BhZ2VOdW19XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZShwYWdlTnVtKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIgYm9yZGVyIHJvdW5kZWQgJHtcbiAgICAgICAgICAgICAgICAgIHBhZ2VOdW0gPT09IHBhZ2UgPyAnYmctYmxhY2sgdGV4dC13aGl0ZScgOiAnJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3BhZ2VOdW19XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZSgocCkgPT4gTWF0aC5taW4odG90YWxQYWdlcywgcCArIDEpKX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e3BhZ2UgPT09IHRvdGFsUGFnZXN9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiBib3JkZXIgcm91bmRlZCBkaXNhYmxlZDpvcGFjaXR5LTUwXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgTmV4dFxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcbn0iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VRdWVyeSIsImZldGNoUHJvZHVjdHMiLCJQcm9kdWN0Q2FyZCIsIlByb2R1Y3RGaWx0ZXJzIiwiUHJvZHVjdHNQYWdlIiwicGFnZSIsInNldFBhZ2UiLCJmaWx0ZXJzIiwic2V0RmlsdGVycyIsIml0ZW1zUGVyUGFnZSIsImRhdGEiLCJpc0xvYWRpbmciLCJrZWVwUHJldmlvdXNEYXRhIiwicHJvZHVjdHMiLCJ0b3RhbFBhZ2VzIiwiTWF0aCIsImNlaWwiLCJ0b3RhbCIsImRpdiIsImNsYXNzTmFtZSIsIm9uRmlsdGVyQ2hhbmdlIiwibWFwIiwicHJvZHVjdCIsImlkIiwiYnV0dG9uIiwib25DbGljayIsInAiLCJtYXgiLCJkaXNhYmxlZCIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsIl8iLCJpIiwicGFnZU51bSIsIm1pbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/products/page.tsx\n"));

/***/ }),

/***/ "(app-pages-browser)/./src/components/products/ProductCard.tsx":
/*!*************************************************!*\
  !*** ./src/components/products/ProductCard.tsx ***!
  \*************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ProductCard; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n\n\nfunction ProductCard(param) {\n    let { product } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        href: \"/products/\".concat(product.id),\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"group relative\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                        src: product.images[0],\n                        alt: product.name,\n                        className: \"h-full w-full object-cover object-center group-hover:opacity-75\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\components\\\\products\\\\ProductCard.tsx\",\n                        lineNumber: 13,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\components\\\\products\\\\ProductCard.tsx\",\n                    lineNumber: 12,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"mt-4 space-y-1\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                            className: \"text-sm text-gray-700\",\n                            children: product.name\n                        }, void 0, false, {\n                            fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\components\\\\products\\\\ProductCard.tsx\",\n                            lineNumber: 20,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: \"text-lg font-medium text-gray-900\",\n                            children: [\n                                \"$\",\n                                product.price\n                            ]\n                        }, void 0, true, {\n                            fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\components\\\\products\\\\ProductCard.tsx\",\n                            lineNumber: 21,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: \"text-sm text-gray-500 capitalize\",\n                            children: product.condition\n                        }, void 0, false, {\n                            fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\components\\\\products\\\\ProductCard.tsx\",\n                            lineNumber: 22,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\components\\\\products\\\\ProductCard.tsx\",\n                    lineNumber: 19,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\components\\\\products\\\\ProductCard.tsx\",\n            lineNumber: 11,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\components\\\\products\\\\ProductCard.tsx\",\n        lineNumber: 10,\n        columnNumber: 5\n    }, this);\n}\n_c = ProductCard;\nvar _c;\n$RefreshReg$(_c, \"ProductCard\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL3Byb2R1Y3RzL1Byb2R1Y3RDYXJkLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQTRCO0FBT2IsU0FBU0MsWUFBWSxLQUE2QjtRQUE3QixFQUFFQyxPQUFPLEVBQW9CLEdBQTdCO0lBQ2xDLHFCQUNFLDhEQUFDRixpREFBSUE7UUFBQ0csTUFBTSxhQUF3QixPQUFYRCxRQUFRRSxFQUFFO2tCQUNqQyw0RUFBQ0M7WUFBSUMsV0FBVTs7OEJBQ2IsOERBQUNEO29CQUFJQyxXQUFVOzhCQUNiLDRFQUFDQzt3QkFDQ0MsS0FBS04sUUFBUU8sTUFBTSxDQUFDLEVBQUU7d0JBQ3RCQyxLQUFLUixRQUFRUyxJQUFJO3dCQUNqQkwsV0FBVTs7Ozs7Ozs7Ozs7OEJBR2QsOERBQUNEO29CQUFJQyxXQUFVOztzQ0FDYiw4REFBQ007NEJBQUdOLFdBQVU7c0NBQXlCSixRQUFRUyxJQUFJOzs7Ozs7c0NBQ25ELDhEQUFDRTs0QkFBRVAsV0FBVTs7Z0NBQW9DO2dDQUFFSixRQUFRWSxLQUFLOzs7Ozs7O3NDQUNoRSw4REFBQ0Q7NEJBQUVQLFdBQVU7c0NBQW9DSixRQUFRYSxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUs1RTtLQW5Cd0JkIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL3Byb2R1Y3RzL1Byb2R1Y3RDYXJkLnRzeD81YmQ3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluaydcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tICdAL3R5cGVzL3Byb2R1Y3QnXG5cbnR5cGUgUHJvZHVjdENhcmRQcm9wcyA9IHtcbiAgcHJvZHVjdDogUHJvZHVjdFxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQcm9kdWN0Q2FyZCh7IHByb2R1Y3QgfTogUHJvZHVjdENhcmRQcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxMaW5rIGhyZWY9e2AvcHJvZHVjdHMvJHtwcm9kdWN0LmlkfWB9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncm91cCByZWxhdGl2ZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFzcGVjdC1oLTEgYXNwZWN0LXctMSB3LWZ1bGwgb3ZlcmZsb3ctaGlkZGVuIHJvdW5kZWQtbGcgYmctZ3JheS0yMDBcIj5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBzcmM9e3Byb2R1Y3QuaW1hZ2VzWzBdfVxuICAgICAgICAgICAgYWx0PXtwcm9kdWN0Lm5hbWV9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJoLWZ1bGwgdy1mdWxsIG9iamVjdC1jb3ZlciBvYmplY3QtY2VudGVyIGdyb3VwLWhvdmVyOm9wYWNpdHktNzVcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgc3BhY2UteS0xXCI+XG4gICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTcwMFwiPntwcm9kdWN0Lm5hbWV9PC9oMz5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDBcIj4ke3Byb2R1Y3QucHJpY2V9PC9wPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTUwMCBjYXBpdGFsaXplXCI+e3Byb2R1Y3QuY29uZGl0aW9ufTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L0xpbms+XG4gIClcbn0iXSwibmFtZXMiOlsiTGluayIsIlByb2R1Y3RDYXJkIiwicHJvZHVjdCIsImhyZWYiLCJpZCIsImRpdiIsImNsYXNzTmFtZSIsImltZyIsInNyYyIsImltYWdlcyIsImFsdCIsIm5hbWUiLCJoMyIsInAiLCJwcmljZSIsImNvbmRpdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/products/ProductCard.tsx\n"));

/***/ })

});