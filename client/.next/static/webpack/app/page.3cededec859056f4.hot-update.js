"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/components/home/FeaturedProducts.tsx":
/*!**************************************************!*\
  !*** ./src/components/home/FeaturedProducts.tsx ***!
  \**************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ FeaturedProducts; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-query */ \"(app-pages-browser)/./node_modules/react-query/es/index.js\");\n/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/api */ \"(app-pages-browser)/./src/lib/api.ts\");\n/* harmony import */ var _components_products_ProductCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/products/ProductCard */ \"(app-pages-browser)/./src/components/products/ProductCard.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction FeaturedProducts() {\n    _s();\n    const { data, error, isLoading } = (0,react_query__WEBPACK_IMPORTED_MODULE_1__.useQuery)(\"featuredProducts\", ()=>(0,_lib_api__WEBPACK_IMPORTED_MODULE_2__.fetchProducts)({\n            sort: \"popular\",\n            limit: \"4\"\n        }));\n    // Получаем массив продуктов из ответа API\n    const products = (data === null || data === void 0 ? void 0 : data.data) || [];\n    if (isLoading) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\",\n            children: [\n                1,\n                2,\n                3\n            ].map((n)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"animate-pulse\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"bg-gray-200 aspect-square rounded-lg\"\n                        }, void 0, false, {\n                            fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\components\\\\home\\\\FeaturedProducts.tsx\",\n                            lineNumber: 32,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"mt-4 space-y-4\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"h-4 bg-gray-200 rounded\"\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\components\\\\home\\\\FeaturedProducts.tsx\",\n                                    lineNumber: 34,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"h-4 bg-gray-200 rounded w-3/4\"\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\components\\\\home\\\\FeaturedProducts.tsx\",\n                                    lineNumber: 35,\n                                    columnNumber: 15\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\components\\\\home\\\\FeaturedProducts.tsx\",\n                            lineNumber: 33,\n                            columnNumber: 13\n                        }, this)\n                    ]\n                }, n, true, {\n                    fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\components\\\\home\\\\FeaturedProducts.tsx\",\n                    lineNumber: 31,\n                    columnNumber: 11\n                }, this))\n        }, void 0, false, {\n            fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\components\\\\home\\\\FeaturedProducts.tsx\",\n            lineNumber: 29,\n            columnNumber: 7\n        }, this);\n    }\n    if (error) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"text-red-500\",\n            children: \"Error loading products\"\n        }, void 0, false, {\n            fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\components\\\\home\\\\FeaturedProducts.tsx\",\n            lineNumber: 44,\n            columnNumber: 12\n        }, this);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex justify-between items-center mb-6\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                        className: \"text-2xl font-bold text-gray-900\",\n                        children: \"Featured Items\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\components\\\\home\\\\FeaturedProducts.tsx\",\n                        lineNumber: 50,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                        href: \"/products\",\n                        className: \"text-gray-600 hover:text-gray-900\",\n                        children: \"View all →\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\components\\\\home\\\\FeaturedProducts.tsx\",\n                        lineNumber: 51,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\components\\\\home\\\\FeaturedProducts.tsx\",\n                lineNumber: 49,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\",\n                children: products.map((product)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_products_ProductCard__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                        product: product\n                    }, product.id, false, {\n                        fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\components\\\\home\\\\FeaturedProducts.tsx\",\n                        lineNumber: 57,\n                        columnNumber: 11\n                    }, this))\n            }, void 0, false, {\n                fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\components\\\\home\\\\FeaturedProducts.tsx\",\n                lineNumber: 55,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\components\\\\home\\\\FeaturedProducts.tsx\",\n        lineNumber: 48,\n        columnNumber: 5\n    }, this);\n}\n_s(FeaturedProducts, \"vamb9feK/asxjJLX6wcKCD8DQJA=\", false, function() {\n    return [\n        react_query__WEBPACK_IMPORTED_MODULE_1__.useQuery\n    ];\n});\n_c = FeaturedProducts;\nvar _c;\n$RefreshReg$(_c, \"FeaturedProducts\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL2hvbWUvRmVhdHVyZWRQcm9kdWN0cy50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUdzQztBQUNHO0FBQ2tCO0FBWTVDLFNBQVNHOztJQUN0QixNQUFNLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFQyxTQUFTLEVBQUUsR0FBR04scURBQVFBLENBQ3pDLG9CQUNBLElBQU1DLHVEQUFhQSxDQUFDO1lBQUVNLE1BQU07WUFBV0MsT0FBTztRQUFJO0lBR3BELDBDQUEwQztJQUMxQyxNQUFNQyxXQUFXTCxDQUFBQSxpQkFBQUEsMkJBQUFBLEtBQU1BLElBQUksS0FBSSxFQUFFO0lBRWpDLElBQUlFLFdBQVc7UUFDYixxQkFDRSw4REFBQ0k7WUFBSUMsV0FBVTtzQkFDWjtnQkFBQztnQkFBRztnQkFBRzthQUFFLENBQUNDLEdBQUcsQ0FBQyxDQUFDQyxrQkFDZCw4REFBQ0g7b0JBQVlDLFdBQVU7O3NDQUNyQiw4REFBQ0Q7NEJBQUlDLFdBQVU7Ozs7OztzQ0FDZiw4REFBQ0Q7NEJBQUlDLFdBQVU7OzhDQUNiLDhEQUFDRDtvQ0FBSUMsV0FBVTs7Ozs7OzhDQUNmLDhEQUFDRDtvQ0FBSUMsV0FBVTs7Ozs7Ozs7Ozs7OzttQkFKVEU7Ozs7Ozs7Ozs7SUFVbEI7SUFFQSxJQUFJUixPQUFPO1FBQ1QscUJBQU8sOERBQUNLO1lBQUlDLFdBQVU7c0JBQWU7Ozs7OztJQUN2QztJQUVBLHFCQUNFLDhEQUFDRzs7MEJBQ0MsOERBQUNKO2dCQUFJQyxXQUFVOztrQ0FDYiw4REFBQ0k7d0JBQUdKLFdBQVU7a0NBQW1DOzs7Ozs7a0NBQ2pELDhEQUFDSzt3QkFBRUMsTUFBSzt3QkFBWU4sV0FBVTtrQ0FBb0M7Ozs7Ozs7Ozs7OzswQkFJcEUsOERBQUNEO2dCQUFJQyxXQUFVOzBCQUNaRixTQUFTRyxHQUFHLENBQUMsQ0FBQ00sd0JBQ2IsOERBQUNoQix3RUFBV0E7d0JBQWtCZ0IsU0FBU0E7dUJBQXJCQSxRQUFRQyxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O0FBS3RDO0dBNUN3QmhCOztRQUNhSCxpREFBUUE7OztLQURyQkciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvaG9tZS9GZWF0dXJlZFByb2R1Y3RzLnRzeD85MWEzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50J1xuXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyB1c2VRdWVyeSB9IGZyb20gJ3JlYWN0LXF1ZXJ5J1xuaW1wb3J0IHsgZmV0Y2hQcm9kdWN0cyB9IGZyb20gJ0AvbGliL2FwaSdcbmltcG9ydCBQcm9kdWN0Q2FyZCBmcm9tICdAL2NvbXBvbmVudHMvcHJvZHVjdHMvUHJvZHVjdENhcmQnXG5cbmludGVyZmFjZSBQcm9kdWN0IHtcbiAgaWQ6IHN0cmluZ1xuICBuYW1lOiBzdHJpbmdcbiAgcHJpY2U6IG51bWJlclxuICBjYXRlZ29yeTogc3RyaW5nXG4gIGltYWdlOiBzdHJpbmdcbiAgY29uZGl0aW9uOiBzdHJpbmdcbiAgYnJhbmQ6IHN0cmluZ1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBGZWF0dXJlZFByb2R1Y3RzKCkge1xuICBjb25zdCB7IGRhdGEsIGVycm9yLCBpc0xvYWRpbmcgfSA9IHVzZVF1ZXJ5KFxuICAgICdmZWF0dXJlZFByb2R1Y3RzJyxcbiAgICAoKSA9PiBmZXRjaFByb2R1Y3RzKHsgc29ydDogJ3BvcHVsYXInLCBsaW1pdDogJzQnIH0pXG4gIClcblxuICAvLyDQn9C+0LvRg9GH0LDQtdC8INC80LDRgdGB0LjQsiDQv9GA0L7QtNGD0LrRgtC+0LIg0LjQtyDQvtGC0LLQtdGC0LAgQVBJXG4gIGNvbnN0IHByb2R1Y3RzID0gZGF0YT8uZGF0YSB8fCBbXVxuXG4gIGlmIChpc0xvYWRpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy0zIGdhcC02XCI+XG4gICAgICAgIHtbMSwgMiwgM10ubWFwKChuKSA9PiAoXG4gICAgICAgICAgPGRpdiBrZXk9e259IGNsYXNzTmFtZT1cImFuaW1hdGUtcHVsc2VcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JheS0yMDAgYXNwZWN0LXNxdWFyZSByb3VuZGVkLWxnXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgc3BhY2UteS00XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaC00IGJnLWdyYXktMjAwIHJvdW5kZWRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoLTQgYmctZ3JheS0yMDAgcm91bmRlZCB3LTMvNFwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgaWYgKGVycm9yKSB7XG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1yZWQtNTAwXCI+RXJyb3IgbG9hZGluZyBwcm9kdWN0czwvZGl2PlxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIG1iLTZcIj5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwXCI+RmVhdHVyZWQgSXRlbXM8L2gyPlxuICAgICAgICA8YSBocmVmPVwiL3Byb2R1Y3RzXCIgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTYwMCBob3Zlcjp0ZXh0LWdyYXktOTAwXCI+XG4gICAgICAgICAgVmlldyBhbGwg4oaSXG4gICAgICAgIDwvYT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy0zIGdhcC02XCI+XG4gICAgICAgIHtwcm9kdWN0cy5tYXAoKHByb2R1Y3Q6IFByb2R1Y3QpID0+IChcbiAgICAgICAgICA8UHJvZHVjdENhcmQga2V5PXtwcm9kdWN0LmlkfSBwcm9kdWN0PXtwcm9kdWN0fSAvPlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgKVxufSAiXSwibmFtZXMiOlsidXNlUXVlcnkiLCJmZXRjaFByb2R1Y3RzIiwiUHJvZHVjdENhcmQiLCJGZWF0dXJlZFByb2R1Y3RzIiwiZGF0YSIsImVycm9yIiwiaXNMb2FkaW5nIiwic29ydCIsImxpbWl0IiwicHJvZHVjdHMiLCJkaXYiLCJjbGFzc05hbWUiLCJtYXAiLCJuIiwic2VjdGlvbiIsImgyIiwiYSIsImhyZWYiLCJwcm9kdWN0IiwiaWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/home/FeaturedProducts.tsx\n"));

/***/ })

});