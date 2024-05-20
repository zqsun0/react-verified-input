import { ChangeEvent, InputHTMLAttributes } from "react";
import "./index.css";
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
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    maxVal?: number;
    isMinValueEnabled?: boolean;
    minVal?: number;
    isInteger?: boolean;
    isShowArrow?: boolean;
    isZeroStart?: boolean;
    type: "text" | "number" | "password";
    enableValidation?: boolean;
    validationFunction?: (v: string) => boolean;
    buttonTouchedFlag?: boolean;
    errorMessage?: string;
    errorMessageClassName?: string;
    errorInputClassName?: string;
    isShowPassword?: boolean;
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
 * @param endIcon 结束图标
 * @param prop
 * @returns 表单验证的输入组件
 */
declare const VerifiedInput: ({ value, onChange, maxVal, isMinValueEnabled, minVal, isInteger, isShowArrow, isZeroStart, type, enableValidation, validationFunction, buttonTouchedFlag, errorMessage, errorMessageClassName, errorInputClassName, isShowPassword, endIcon, ...prop }: VerifiedInputProp) => import("react/jsx-runtime").JSX.Element;
export default VerifiedInput;
