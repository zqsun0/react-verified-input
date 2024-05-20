"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
/**
 * @fileOverview 表单验证的输入组件
 * 可以开启输入结果验证是否合法
 * 如果用type='number'，可以输入e，-，+，小数点等，不符合需求
 * 封装的number input组件， 用的是原生的input
 * @author zqsun
 * @version 5.0
 */
var clsx_1 = require("clsx");
var react_1 = require("react");
var ai_1 = require("react-icons/ai");
require("../style/index.css");
/**
 * 表单验证的输入组件
 * @param value 输入框的值
 * @param onChange 输入框值变化时的回调函数
 * @param maxVal 最大值
 * @param isMinValueEnabled 是否启用最小值验证，默认为 false
 * @param minVal 最小值，默认为 0
 * @param isInteger 是否为整数，默认为 true
 * @param isShowArrow 是否显示数字 input 上下箭头，默认为 true
 * @param isZeroStart 是否可以输入以 0 开头的数字（例如 001），默认为 false
 * @param type 输入框类型，支持 'text' , 'number', 'password'
 * @param enableValidation 是否开启验证，默认为 false
 * @param validationFunction 自定义验证函数，默认为 () => true
 * @param buttonTouchedFlag 父组件是否已点击提交按钮，默认为 false
 * @param errorMessage 错误消息文本
 * @param errorMessageClassName 错误消息的样式类名
 * @param errorInputClassName 错误输入框的样式类名
 * @param isShowPassword 在密码模式下，是否可以看密码
 * @param isShowEndIcon 是否显示结束图标
 * @param endIcon 结束图标
 * @param prop
 * @returns 表单验证的输入组件
 */
var VerifiedInput = function (_a) {
    var 
    // 输入框的值
    value = _a.value, 
    // 输入框值变化时的回调函数
    onChange = _a.onChange, 
    // 最大值
    maxVal = _a.maxVal, 
    // 是否启用最小值验证
    _b = _a.isMinValueEnabled, 
    // 是否启用最小值验证
    isMinValueEnabled = _b === void 0 ? false : _b, 
    // 最小值，默认为 0
    _c = _a.minVal, 
    // 最小值，默认为 0
    minVal = _c === void 0 ? 0 : _c, 
    // 默认必须是整数,默认为 true,不可以输入小数点
    _d = _a.isInteger, 
    // 默认必须是整数,默认为 true,不可以输入小数点
    isInteger = _d === void 0 ? true : _d, 
    // 是否显示数字 input 上下箭头，默认为 true
    _e = _a.isShowArrow, 
    // 是否显示数字 input 上下箭头，默认为 true
    isShowArrow = _e === void 0 ? true : _e, 
    // 默认不可以输入0为开头的数字
    _f = _a.isZeroStart, 
    // 默认不可以输入0为开头的数字
    isZeroStart = _f === void 0 ? false : _f, 
    // 文本还是数字
    type = _a.type, 
    // 是否开启验证输入合法性
    _g = _a.enableValidation, 
    // 是否开启验证输入合法性
    enableValidation = _g === void 0 ? false : _g, 
    // 如果不传，那么默认为验证成功
    _h = _a.validationFunction, 
    // 如果不传，那么默认为验证成功
    validationFunction = _h === void 0 ? function () { return true; } : _h, 
    // 父组件是否已经点击过提交按钮
    _j = _a.buttonTouchedFlag, 
    // 父组件是否已经点击过提交按钮
    buttonTouchedFlag = _j === void 0 ? false : _j, 
    // 错误消息文本
    errorMessage = _a.errorMessage, 
    // 错误消息的样式类名
    errorMessageClassName = _a.errorMessageClassName, 
    // 错误输入框的样式类名
    errorInputClassName = _a.errorInputClassName, 
    // 在密码模式下，是否可以看密码
    _k = _a.isShowPassword, 
    // 在密码模式下，是否可以看密码
    isShowPassword = _k === void 0 ? false : _k, 
    // 结束图标
    endIcon = _a.endIcon, prop = __rest(_a, ["value", "onChange", "maxVal", "isMinValueEnabled", "minVal", "isInteger", "isShowArrow", "isZeroStart", "type", "enableValidation", "validationFunction", "buttonTouchedFlag", "errorMessage", "errorMessageClassName", "errorInputClassName", "isShowPassword", "endIcon"]);
    /* START: state*/
    // 是否被点过，默认没有被点过
    var _l = (0, react_1.useState)(false), isTouched = _l[0], setIsTouched = _l[1];
    // input value
    var _m = (0, react_1.useState)("".concat(value)), inputValue = _m[0], setInputValue = _m[1];
    // show password text
    var _o = (0, react_1.useState)(false), showPasswordText = _o[0], setShowPasswordText = _o[1];
    var isError = (0, react_1.useMemo)(function () {
        // 如果touched或者buttonTouchedFlag都为false，不显示错误
        if (!isTouched && !buttonTouchedFlag) {
            return false;
        }
        // 如果没开启校验，不显示错误
        if (!enableValidation) {
            return false;
        }
        // 如果开启了校验，但是校验函数返回true，不显示错误
        if (enableValidation && validationFunction(inputValue)) {
            return false;
        }
        // 其他情况，未能通过校验，显示错误
        return true;
    }, [
        inputValue,
        value,
        isTouched,
        enableValidation,
        validationFunction,
        buttonTouchedFlag,
    ]);
    var inputType = (0, react_1.useMemo)(function () {
        // 如果是密码模式
        if (type === "password") {
            // 如果是允许查看密码，并且正在显示
            if (isShowPassword && showPasswordText) {
                return "text";
            }
            return "password";
        }
        return type;
    }, [isShowPassword, showPasswordText, type]);
    /* END: state*/
    /* START: function*/
    var handleTouched = function () {
        setIsTouched(true);
    };
    /**
     * 检查输入数字的值是否符合要求
     *
     * @param inputValue 输入框的值
     * @returns 是否符合要求
     */
    var checkNumberAfterChange = function (inputValue) {
        if (Number.isNaN(Number(inputValue))) {
            return false;
        }
        if (maxVal !== undefined) {
            if (Number(inputValue) > maxVal) {
                return false;
            }
        }
        // 如果开启了最小值验证
        if (isMinValueEnabled) {
            if (Number(inputValue) < minVal && inputValue !== "") {
                return false;
            }
            // 如果最小值为0，那么不能输入负数
            if (minVal === 0) {
                if (inputValue.includes("-")) {
                    return false;
                }
            }
        }
        // 不可以输入小数
        if (isInteger) {
            if (!Number.isInteger(Number(inputValue))) {
                return false;
            }
        }
        // 不可以输入+和e
        if (inputValue.includes("+") || inputValue.includes("e")) {
            return false;
        }
        return true;
    };
    // 当type=number时
    var handleInputNumberOnChange = function (e) {
        var inputNumberValue = e.target.value;
        // 当用户删除所有输入内容时，设置输入值为空字符串并返回
        if (inputNumberValue === "") {
            e.target.value = "";
            setInputValue("");
            onChange(e);
            return;
        }
        var inputValueNumber = +e.target.value;
        var checkResult = checkNumberAfterChange(inputNumberValue);
        if (checkResult) {
            // 防止首位是0，依然可以输入，比如 0123
            if (isZeroStart) {
                e.target.value = inputNumberValue.toString();
                setInputValue(inputNumberValue.toString());
            }
            else {
                e.target.value = inputValueNumber.toString();
                setInputValue(inputValueNumber.toString());
            }
            onChange(e);
        }
    };
    // 当type=text时，
    var handleInputTextOnChange = function (e) {
        var inputTextValue = e.target.value;
        setInputValue(inputTextValue);
        onChange(e);
    };
    // 在 onKeyDown 事件中阻止输入小数点
    var handleKeyDown = function (e) {
        // 在HTML中，当使用<input type="number">的时候，只有当输入的值是有效的数字时，才会触发 onChange 事件。
        // 在输入小数点（"."）时，因为小数点本身并不构成一个完整的有效数字，所以不会触发 onChange 事件。
        if (type === "number" && isInteger && e.key === ".") {
            e.preventDefault();
        }
    };
    var handleShowPasswordTextClick = function () {
        setShowPasswordText(function (v) { return !v; });
    };
    /* END: function*/
    return ((0, jsx_runtime_1.jsx)("div", { className: "VerifiedInput-container", children: (0, jsx_runtime_1.jsxs)("div", { className: "VerifiedInput-content", children: [(0, jsx_runtime_1.jsx)("input", __assign({}, prop, { value: value, 
                    // 处理是输入普通文本还是数字
                    onChange: type === "number"
                        ? handleInputNumberOnChange
                        : handleInputTextOnChange, onBlur: handleTouched, "data-error": isError, className: (0, clsx_1.clsx)(!isShowArrow && "VerifiedInput_hiddenArrow", prop.className, "VerifiedInput_root", prop.disabled && "VerifiedInput_disabled", isError && errorInputClassName), type: inputType, onKeyDown: handleKeyDown })), isShowPassword && showPasswordText && ((0, jsx_runtime_1.jsx)(ai_1.AiOutlineEye, { className: "VerifiedInput_showPasswordEyes", onClick: handleShowPasswordTextClick })), isShowPassword && !showPasswordText && ((0, jsx_runtime_1.jsx)(ai_1.AiOutlineEyeInvisible, { className: "VerifiedInput_showPasswordEyes", onClick: handleShowPasswordTextClick })), endIcon && ((0, jsx_runtime_1.jsx)("div", { className: "VerifiedInput-icon-wrapper", children: (0, react_1.cloneElement)(endIcon, {
                        className: (0, clsx_1.clsx)("VerifiedInput_icon", endIcon.props.className),
                    }) })), (0, jsx_runtime_1.jsx)("span", { children: isError && ((0, jsx_runtime_1.jsx)("span", { className: (0, clsx_1.clsx)("VerifiedInput_errorMessage", errorMessageClassName), children: errorMessage })) })] }) }));
};
exports.default = VerifiedInput;
