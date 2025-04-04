var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ROUTES } from 'common/src/constants.ts';
import ExampleButton from './ExampleButton.tsx';
// Component definition
var ExampleComponent = function () {
    // React useState hook — read more here: https://react.dev/reference/react/useState
    var _a = useState(0), score = _a[0], setScore = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    // React useEffect hook — read more here: https://react.dev/reference/react/useEffect
    // This will run on page load
    useEffect(function () {
        fetchScore();
    }, []);
    // Fetches the current score from the backend and updates the corresponding useStates
    function fetchScore() {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios.get(API_ROUTES.SCORE)];
                    case 1:
                        res = _a.sent();
                        // HTTP 200 = OK (the request was successful)
                        if (res.status === 200) {
                            setLoading(false);
                            // res.data holds a JSON object with a property called score
                            // This object is created in the backend route (score.ts)
                            // It's a good idea to define the property keys in a common constants file
                            // To avoid potential runtime errors due to typos or missing properties
                            // You can then use bracket notation to access these properties dynamically
                            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors#bracket_notation
                            setScore(res.data.score);
                        }
                        // HTTP 204 = No data (sent by the backend when the DB is empty)
                        else if (res.status === 204) {
                            // Set loading to false and use default value of score
                            setLoading(false);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log('Error fetching score, retrying:', error_1);
                        // Retry the request after a short delay
                        // During development, if the frontend loads before the backend, the request will fail
                        setTimeout(function () { return fetchScore(); }, 1500);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    // Sends a post request to update the score
    function submitScore() {
        return __awaiter(this, void 0, void 0, function () {
            var data, res, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = JSON.stringify({
                            time: new Date(),
                            score: score,
                        });
                        return [4 /*yield*/, axios.post(API_ROUTES.SCORE, data, {
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            })];
                    case 1:
                        res = _a.sent();
                        // This will output in your browser console
                        if (res.status == 200) {
                            console.log('Added score');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log('Error submitting score:', error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    return (_jsxs("div", { className: "bg-gray-100 rounded-lg shadow-md p-6 w-64", children: [_jsx("div", { className: "text-2xl font-bold mb-4 text-center py-2 rounded", children: loading ? 'Connecting...' : "Score: ".concat(score) }), _jsxs("div", { className: "flex flex-row gap-2", children: [_jsx(ExampleButton, { onClick: function () { return setScore(score - 1); }, variant: "secondary", disabled: loading, children: "-" }), _jsx(ExampleButton, { onClick: function () { return setScore(score + 1); }, variant: "secondary", disabled: loading, children: "+" }), _jsx(ExampleButton, { onClick: function () { return submitScore(); }, variant: "primary", disabled: loading, children: "Submit" })] })] }));
};
export default ExampleComponent;
