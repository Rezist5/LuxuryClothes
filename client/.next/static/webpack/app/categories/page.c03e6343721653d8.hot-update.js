"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/categories/page",{

/***/ "(app-pages-browser)/./src/app/categories/page.tsx":
/*!*************************************!*\
  !*** ./src/app/categories/page.tsx ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ CategoriesPage; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-query */ \"(app-pages-browser)/./node_modules/react-query/es/index.js\");\n/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/api */ \"(app-pages-browser)/./src/lib/api.ts\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction CategoriesPage() {\n    _s();\n    const { data: categories, isLoading } = (0,react_query__WEBPACK_IMPORTED_MODULE_1__.useQuery)(\"categories\", _lib_api__WEBPACK_IMPORTED_MODULE_2__.fetchCategories);\n    if (isLoading) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\",\n                children: [\n                    ...Array(6)\n                ].map((_, i)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"animate-pulse\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"bg-gray-200 h-64 rounded-lg\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\categories\\\\page.tsx\",\n                                lineNumber: 17,\n                                columnNumber: 15\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"mt-4 space-y-2\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"h-4 bg-gray-200 rounded w-3/4\"\n                                    }, void 0, false, {\n                                        fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\categories\\\\page.tsx\",\n                                        lineNumber: 19,\n                                        columnNumber: 17\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"h-4 bg-gray-200 rounded w-1/2\"\n                                    }, void 0, false, {\n                                        fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\categories\\\\page.tsx\",\n                                        lineNumber: 20,\n                                        columnNumber: 17\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\categories\\\\page.tsx\",\n                                lineNumber: 18,\n                                columnNumber: 15\n                            }, this)\n                        ]\n                    }, i, true, {\n                        fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\categories\\\\page.tsx\",\n                        lineNumber: 16,\n                        columnNumber: 13\n                    }, this))\n            }, void 0, false, {\n                fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\categories\\\\page.tsx\",\n                lineNumber: 14,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\categories\\\\page.tsx\",\n            lineNumber: 13,\n            columnNumber: 7\n        }, this);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                className: \"text-3xl font-bold text-gray-900 mb-8\",\n                children: \"Все категории\"\n            }, void 0, false, {\n                fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\categories\\\\page.tsx\",\n                lineNumber: 31,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\",\n                children: categories === null || categories === void 0 ? void 0 : categories.map((category)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                        href: \"/categories/\".concat(category.slug),\n                        className: \"group block\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"aspect-square w-full overflow-hidden rounded-lg bg-gray-100\",\n                                children: category.image ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                                    src: category.image,\n                                    alt: category.name,\n                                    className: \"h-full w-full object-cover object-center group-hover:opacity-75\"\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\categories\\\\page.tsx\",\n                                    lineNumber: 42,\n                                    columnNumber: 17\n                                }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"h-full w-full flex items-center justify-center bg-gray-200\",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"text-center\",\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                                className: \"text-xl font-medium text-gray-900\",\n                                                children: category.name\n                                            }, void 0, false, {\n                                                fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\categories\\\\page.tsx\",\n                                                lineNumber: 50,\n                                                columnNumber: 21\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                                className: \"mt-2 text-sm text-gray-500\",\n                                                children: [\n                                                    category.products_count || 0,\n                                                    \" товаров\"\n                                                ]\n                                            }, void 0, true, {\n                                                fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\categories\\\\page.tsx\",\n                                                lineNumber: 51,\n                                                columnNumber: 21\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\categories\\\\page.tsx\",\n                                        lineNumber: 49,\n                                        columnNumber: 19\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\categories\\\\page.tsx\",\n                                    lineNumber: 48,\n                                    columnNumber: 17\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\categories\\\\page.tsx\",\n                                lineNumber: 40,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"mt-4\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                        className: \"text-lg font-medium text-gray-900\",\n                                        children: category.name\n                                    }, void 0, false, {\n                                        fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\categories\\\\page.tsx\",\n                                        lineNumber: 59,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        className: \"mt-1 text-sm text-gray-500\",\n                                        children: [\n                                            category.products_count || 0,\n                                            \" \",\n                                            getProductsLabel(category.products_count || 0)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\categories\\\\page.tsx\",\n                                        lineNumber: 60,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        className: \"mt-1 text-sm text-gray-500\",\n                                        children: category.description || \"Стильная одежда и аксессуары\"\n                                    }, void 0, false, {\n                                        fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\categories\\\\page.tsx\",\n                                        lineNumber: 63,\n                                        columnNumber: 15\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\categories\\\\page.tsx\",\n                                lineNumber: 58,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, category.id, true, {\n                        fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\categories\\\\page.tsx\",\n                        lineNumber: 35,\n                        columnNumber: 11\n                    }, this))\n            }, void 0, false, {\n                fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\categories\\\\page.tsx\",\n                lineNumber: 33,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\Projects\\\\LuxuryClothes\\\\project\\\\client\\\\src\\\\app\\\\categories\\\\page.tsx\",\n        lineNumber: 30,\n        columnNumber: 5\n    }, this);\n}\n_s(CategoriesPage, \"7K+HdXeu90gMZgYWxe7cAdp2PFI=\", false, function() {\n    return [\n        react_query__WEBPACK_IMPORTED_MODULE_1__.useQuery\n    ];\n});\n_c = CategoriesPage;\n// Функция для правильного склонения слова \"товар\"\nfunction getProductsLabel(count) {\n    if (count === 1) return \"товар\";\n    if (count > 1 && count < 5) return \"товара\";\n    return \"товаров\";\n}\nvar _c;\n$RefreshReg$(_c, \"CategoriesPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvY2F0ZWdvcmllcy9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRXNDO0FBQ0s7QUFDZjtBQUdiLFNBQVNHOztJQUN0QixNQUFNLEVBQUVDLE1BQU1DLFVBQVUsRUFBRUMsU0FBUyxFQUFFLEdBQUdOLHFEQUFRQSxDQUFhLGNBQWNDLHFEQUFlQTtJQUUxRixJQUFJSyxXQUFXO1FBQ2IscUJBQ0UsOERBQUNDO1lBQUlDLFdBQVU7c0JBQ2IsNEVBQUNEO2dCQUFJQyxXQUFVOzBCQUNaO3VCQUFJQyxNQUFNO2lCQUFHLENBQUNDLEdBQUcsQ0FBQyxDQUFDQyxHQUFHQyxrQkFDckIsOERBQUNMO3dCQUFZQyxXQUFVOzswQ0FDckIsOERBQUNEO2dDQUFJQyxXQUFVOzs7Ozs7MENBQ2YsOERBQUNEO2dDQUFJQyxXQUFVOztrREFDYiw4REFBQ0Q7d0NBQUlDLFdBQVU7Ozs7OztrREFDZiw4REFBQ0Q7d0NBQUlDLFdBQVU7Ozs7Ozs7Ozs7Ozs7dUJBSlRJOzs7Ozs7Ozs7Ozs7Ozs7SUFXcEI7SUFFQSxxQkFDRSw4REFBQ0w7UUFBSUMsV0FBVTs7MEJBQ2IsOERBQUNLO2dCQUFHTCxXQUFVOzBCQUF3Qzs7Ozs7OzBCQUV0RCw4REFBQ0Q7Z0JBQUlDLFdBQVU7MEJBQ1pILHVCQUFBQSxpQ0FBQUEsV0FBWUssR0FBRyxDQUFDLENBQUNJLHlCQUNoQiw4REFBQ1osaURBQUlBO3dCQUVIYSxNQUFNLGVBQTZCLE9BQWRELFNBQVNFLElBQUk7d0JBQ2xDUixXQUFVOzswQ0FFViw4REFBQ0Q7Z0NBQUlDLFdBQVU7MENBQ1pNLFNBQVNHLEtBQUssaUJBQ2IsOERBQUNDO29DQUNDQyxLQUFLTCxTQUFTRyxLQUFLO29DQUNuQkcsS0FBS04sU0FBU08sSUFBSTtvQ0FDbEJiLFdBQVU7Ozs7O3lEQUdaLDhEQUFDRDtvQ0FBSUMsV0FBVTs4Q0FDYiw0RUFBQ0Q7d0NBQUlDLFdBQVU7OzBEQUNiLDhEQUFDYztnREFBR2QsV0FBVTswREFBcUNNLFNBQVNPLElBQUk7Ozs7OzswREFDaEUsOERBQUNFO2dEQUFFZixXQUFVOztvREFDVk0sU0FBU1UsY0FBYyxJQUFJO29EQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQ0FNeEMsOERBQUNqQjtnQ0FBSUMsV0FBVTs7a0RBQ2IsOERBQUNjO3dDQUFHZCxXQUFVO2tEQUFxQ00sU0FBU08sSUFBSTs7Ozs7O2tEQUNoRSw4REFBQ0U7d0NBQUVmLFdBQVU7OzRDQUNWTSxTQUFTVSxjQUFjLElBQUk7NENBQUU7NENBQUVDLGlCQUFpQlgsU0FBU1UsY0FBYyxJQUFJOzs7Ozs7O2tEQUU5RSw4REFBQ0Q7d0NBQUVmLFdBQVU7a0RBQ1ZNLFNBQVNZLFdBQVcsSUFBSTs7Ozs7Ozs7Ozs7Ozt1QkE1QnhCWixTQUFTYSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O0FBb0M1QjtHQWhFd0J4Qjs7UUFDa0JILGlEQUFRQTs7O0tBRDFCRztBQWtFeEIsa0RBQWtEO0FBQ2xELFNBQVNzQixpQkFBaUJHLEtBQWE7SUFDckMsSUFBSUEsVUFBVSxHQUFHLE9BQU87SUFDeEIsSUFBSUEsUUFBUSxLQUFLQSxRQUFRLEdBQUcsT0FBTztJQUNuQyxPQUFPO0FBQ1QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9jYXRlZ29yaWVzL3BhZ2UudHN4PzgxODMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnXG5cbmltcG9ydCB7IHVzZVF1ZXJ5IH0gZnJvbSAncmVhY3QtcXVlcnknXG5pbXBvcnQgeyBmZXRjaENhdGVnb3JpZXMgfSBmcm9tICdAL2xpYi9hcGknXG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnXG5pbXBvcnQgdHlwZSB7IENhdGVnb3J5IH0gZnJvbSAnQC90eXBlcy9jYXRlZ29yeSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2F0ZWdvcmllc1BhZ2UoKSB7XG4gIGNvbnN0IHsgZGF0YTogY2F0ZWdvcmllcywgaXNMb2FkaW5nIH0gPSB1c2VRdWVyeTxDYXRlZ29yeVtdPignY2F0ZWdvcmllcycsIGZldGNoQ2F0ZWdvcmllcylcblxuICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LTggcHktMTJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy0zIGdhcC02XCI+XG4gICAgICAgICAge1suLi5BcnJheSg2KV0ubWFwKChfLCBpKSA9PiAoXG4gICAgICAgICAgICA8ZGl2IGtleT17aX0gY2xhc3NOYW1lPVwiYW5pbWF0ZS1wdWxzZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYXktMjAwIGgtNjQgcm91bmRlZC1sZ1wiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoLTQgYmctZ3JheS0yMDAgcm91bmRlZCB3LTMvNFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaC00IGJnLWdyYXktMjAwIHJvdW5kZWQgdy0xLzJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LTggcHktMTJcIj5cbiAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMCBtYi04XCI+0JLRgdC1INC60LDRgtC10LPQvtGA0LjQuDwvaDE+XG4gICAgICBcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtMyBnYXAtNlwiPlxuICAgICAgICB7Y2F0ZWdvcmllcz8ubWFwKChjYXRlZ29yeSkgPT4gKFxuICAgICAgICAgIDxMaW5rXG4gICAgICAgICAgICBrZXk9e2NhdGVnb3J5LmlkfVxuICAgICAgICAgICAgaHJlZj17YC9jYXRlZ29yaWVzLyR7Y2F0ZWdvcnkuc2x1Z31gfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ3JvdXAgYmxvY2tcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXNwZWN0LXNxdWFyZSB3LWZ1bGwgb3ZlcmZsb3ctaGlkZGVuIHJvdW5kZWQtbGcgYmctZ3JheS0xMDBcIj5cbiAgICAgICAgICAgICAge2NhdGVnb3J5LmltYWdlID8gKFxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIHNyYz17Y2F0ZWdvcnkuaW1hZ2V9XG4gICAgICAgICAgICAgICAgICBhbHQ9e2NhdGVnb3J5Lm5hbWV9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLWZ1bGwgdy1mdWxsIG9iamVjdC1jb3ZlciBvYmplY3QtY2VudGVyIGdyb3VwLWhvdmVyOm9wYWNpdHktNzVcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoLWZ1bGwgdy1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWdyYXktMjAwXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDBcIj57Y2F0ZWdvcnkubmFtZX08L2gzPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0yIHRleHQtc20gdGV4dC1ncmF5LTUwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtjYXRlZ29yeS5wcm9kdWN0c19jb3VudCB8fCAwfSDRgtC+0LLQsNGA0L7QslxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00XCI+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDBcIj57Y2F0ZWdvcnkubmFtZX08L2gzPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0xIHRleHQtc20gdGV4dC1ncmF5LTUwMFwiPlxuICAgICAgICAgICAgICAgIHtjYXRlZ29yeS5wcm9kdWN0c19jb3VudCB8fCAwfSB7Z2V0UHJvZHVjdHNMYWJlbChjYXRlZ29yeS5wcm9kdWN0c19jb3VudCB8fCAwKX1cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0xIHRleHQtc20gdGV4dC1ncmF5LTUwMFwiPlxuICAgICAgICAgICAgICAgIHtjYXRlZ29yeS5kZXNjcmlwdGlvbiB8fCAn0KHRgtC40LvRjNC90LDRjyDQvtC00LXQttC00LAg0Lgg0LDQutGB0LXRgdGB0YPQsNGA0YsnfVxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINC/0YDQsNCy0LjQu9GM0L3QvtCz0L4g0YHQutC70L7QvdC10L3QuNGPINGB0LvQvtCy0LAgXCLRgtC+0LLQsNGAXCJcbmZ1bmN0aW9uIGdldFByb2R1Y3RzTGFiZWwoY291bnQ6IG51bWJlcik6IHN0cmluZyB7XG4gIGlmIChjb3VudCA9PT0gMSkgcmV0dXJuICfRgtC+0LLQsNGAJztcbiAgaWYgKGNvdW50ID4gMSAmJiBjb3VudCA8IDUpIHJldHVybiAn0YLQvtCy0LDRgNCwJztcbiAgcmV0dXJuICfRgtC+0LLQsNGA0L7Qsic7XG59Il0sIm5hbWVzIjpbInVzZVF1ZXJ5IiwiZmV0Y2hDYXRlZ29yaWVzIiwiTGluayIsIkNhdGVnb3JpZXNQYWdlIiwiZGF0YSIsImNhdGVnb3JpZXMiLCJpc0xvYWRpbmciLCJkaXYiLCJjbGFzc05hbWUiLCJBcnJheSIsIm1hcCIsIl8iLCJpIiwiaDEiLCJjYXRlZ29yeSIsImhyZWYiLCJzbHVnIiwiaW1hZ2UiLCJpbWciLCJzcmMiLCJhbHQiLCJuYW1lIiwiaDMiLCJwIiwicHJvZHVjdHNfY291bnQiLCJnZXRQcm9kdWN0c0xhYmVsIiwiZGVzY3JpcHRpb24iLCJpZCIsImNvdW50Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/categories/page.tsx\n"));

/***/ })

});