/**
 * @fileOverview 表单验证的输入组件
 * 可以开启输入结果验证是否合法
 * 如果用type='number'，可以输入e，-，+，小数点等，不符合需求
 * 封装的number input组件， 用的是原生的input
 * @author zqsun
 * @version 5.0
 */
import { clsx } from "clsx";
import {
  ChangeEvent,
  cloneElement,
  InputHTMLAttributes,
  KeyboardEvent,
  useMemo,
  useState,
} from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "../style/index.css";

/**
 *  value 和 onChange 为必传参数
 *  maxVal 最大值
 *  minVal 最小值
 *  isInteger 必须是整数
 *  isShowArrow 是否显示数字input上下箭头
 *  isZeroStart 是否可以输入0开头的数字（比如001）
 *  type 文本还是数字
 *  enableValidation 是否开启验证
 *  validationFunction 验证是否合法
 *  validationMessage 验证不合法时的提示
 *  buttonTouchedFlag 父组件是否点击过提交按钮
 *  buttonTouchedFlag 父组件是否点击过提交按钮
 *  errorMessage 验证不合法时的提示
 *  isShowPassword 是否显示密码
 *  isShowPasswordEyeIcon 是否显示密码眼睛
 *  endIcon 末尾图标
 *  其他参数为原生input的参数
 */
interface VerifiedInputProp extends InputHTMLAttributes<HTMLInputElement> {
  // 输入框的值
  value: string | number;
  // 输入框值变化时的回调函数
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  // 最大值
  maxVal?: number;
  // 是否启用最小值验证
  isMinValueEnabled?: boolean;
  // 最小值
  minVal?: number;
  // 默认必须是整数,默认为 true,不可以输入小数点
  isInteger?: boolean;
  // 是否显示数字 input 上下箭头，默认为 true
  isShowArrow?: boolean;
  // 是否可以输入0为开头的数字（比如001）
  isZeroStart?: boolean;
  // 文本,数字，密码
  type: "text" | "number" | "password";
  // 是否开启验证输入合法性
  enableValidation?: boolean;
  // 如果不传，那么默认为验证成功
  validationFunction?: (v: string) => boolean;
  // 父组件是否已经点击过提交按钮
  buttonTouchedFlag?: boolean;
  // 错误消息文本
  errorMessage?: string;
  // 错误消息的样式类名
  errorMessageClassName?: string;
  // 错误输入框的样式类名
  errorInputClassName?: string;
  // 在密码模式下，是否可以看密码
  isShowPassword?: boolean;
  // 开始图标
  startIcon?: JSX.Element;
  // 结束图标
  endIcon?: JSX.Element;
}

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
 * @param startIcon 开始图标
 * @param endIcon 结束图标
 * @param prop
 * @returns 表单验证的输入组件
 */

const VerifiedInput = ({
  // 输入框的值
  value,
  // 输入框值变化时的回调函数
  onChange,
  // 最大值
  maxVal,
  // 是否启用最小值验证
  isMinValueEnabled = false,
  // 最小值，默认为 0
  minVal = 0,
  // 默认必须是整数,默认为 true,不可以输入小数点
  isInteger = true,
  // 是否显示数字 input 上下箭头，默认为 true
  isShowArrow = true,
  // 默认不可以输入0为开头的数字
  isZeroStart = false,
  // 文本还是数字
  type,
  // 是否开启验证输入合法性
  enableValidation = false,
  // 如果不传，那么默认为验证成功
  validationFunction = () => true,
  // 父组件是否已经点击过提交按钮
  buttonTouchedFlag = false,
  // 错误消息文本
  errorMessage,
  // 错误消息的样式类名
  errorMessageClassName,
  // 错误输入框的样式类名
  errorInputClassName,
  // 在密码模式下，是否可以看密码
  isShowPassword = false,
  // 开始图标
  startIcon,
  // 结束图标
  endIcon,
  ...prop
}: VerifiedInputProp) => {
  /* START: state*/
  // 是否被点过，默认没有被点过
  const [isTouched, setIsTouched] = useState<boolean>(false);
  // input value
  const [inputValue, setInputValue] = useState<string>(`${value}`);
  // show password text
  const [showPasswordText, setShowPasswordText] = useState<boolean>(false);
  const isError = useMemo(() => {
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

  const inputType: "text" | "number" | "password" = useMemo(() => {
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
  const handleTouched = () => {
    setIsTouched(true);
  };

  /**
   * 检查输入数字的值是否符合要求
   *
   * @param inputValue 输入框的值
   * @returns 是否符合要求
   */
  const checkNumberAfterChange = (inputValue: string) => {
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
  const handleInputNumberOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputNumberValue: string = e.target.value;
    // 当用户删除所有输入内容时，设置输入值为空字符串并返回
    if (inputNumberValue === "") {
      e.target.value = "";
      setInputValue("");
      onChange(e);
      return;
    }
    const inputValueNumber: number = +e.target.value;
    const checkResult = checkNumberAfterChange(inputNumberValue);

    if (checkResult) {
      // 防止首位是0，依然可以输入，比如 0123
      if (isZeroStart) {
        e.target.value = inputNumberValue.toString();
        setInputValue(inputNumberValue.toString());
      } else {
        e.target.value = inputValueNumber.toString();
        setInputValue(inputValueNumber.toString());
      }
      onChange(e);
    }
  };

  // 当type=text时，
  const handleInputTextOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputTextValue: string = e.target.value;
    setInputValue(inputTextValue);
    onChange(e);
  };
  // 在 onKeyDown 事件中阻止输入小数点
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // 在HTML中，当使用<input type="number">的时候，只有当输入的值是有效的数字时，才会触发 onChange 事件。
    // 在输入小数点（"."）时，因为小数点本身并不构成一个完整的有效数字，所以不会触发 onChange 事件。
    if (type === "number" && isInteger && e.key === ".") {
      e.preventDefault();
    }
  };
  const handleShowPasswordTextClick = () => {
    setShowPasswordText((v) => !v);
  };
  /* END: function*/

  return (
    <div className="VerifiedInput-container">
      <div className="VerifiedInput-content">
        {/* start icon start */}
        {startIcon && (
          <div className="VerifiedInput-icon-wrapper VerifiedInput-icon-wrapper--start">
            {cloneElement(startIcon, {
              className: clsx("VerifiedInput_icon", startIcon.props.className),
            })}
          </div>
        )}
        {/* start icon end */}
        <input
          {...prop}
          value={value}
          // 处理是输入普通文本还是数字
          onChange={
            type === "number"
              ? handleInputNumberOnChange
              : handleInputTextOnChange
          }
          onBlur={handleTouched}
          // scss更改input框的样式
          data-error={isError}
          className={clsx(
            !isShowArrow && "VerifiedInput_hiddenArrow",
            prop.className,
            "VerifiedInput_root",
            prop.disabled && "VerifiedInput_disabled",
            isError && errorInputClassName
          )}
          type={inputType}
          onKeyDown={handleKeyDown}
        />
        {isShowPassword && showPasswordText && (
          <AiOutlineEye
            className={"VerifiedInput_showPasswordEyes"}
            onClick={handleShowPasswordTextClick}
          />
        )}
        {isShowPassword && !showPasswordText && (
          <AiOutlineEyeInvisible
            className={"VerifiedInput_showPasswordEyes"}
            onClick={handleShowPasswordTextClick}
          />
        )}
        {/* 如果启用末尾图标，则显示*/}
        {endIcon && (
          <div className="VerifiedInput-icon-wrapper">
            {cloneElement(endIcon, {
              className: clsx("VerifiedInput_icon", endIcon.props.className),
            })}
          </div>
        )}

        <span>
          {isError && (
            <span
              className={clsx(
                "VerifiedInput_errorMessage",
                errorMessageClassName
              )}
            >
              {errorMessage}
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default VerifiedInput;
