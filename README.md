# react-verified-input
🔠 A React component that provides validated input fields with customizable validation rules and error messages.
![npm](https://img.shields.io/npm/v/react-verified-input)
![license](https://img.shields.io/npm/l/react-verified-input)

`react-verified-input` is a specialized React input component designed to enhance user experience by providing input validation, customizable validation rules, and error messages. It supports text, number, and password input types, ensuring seamless integration into your React applications.

## Installation

```sh
npm install react-verified-input
```
or
```sh
yarn add react-verified-input
```

## Usage

### Step 1: Use the Component
Simply import and use the VerifiedInput component in your React application:
```jsx
import VerifiedInput from 'react-verified-input';

function App() {
    const [value, setValue] = useState('');
    return (
        <VerifiedInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            enableValidation={true}
            validationFunction={(v) => v.length > 0}
            errorMessage="Input is invalid!"
        />
    );
}
```
# Props of DebounceButton Component

The VerifiedInput component inherits all the properties of an input element, allowing for easy customization and styling. Additionally, it has specific props for validation:


| Prop                                         | Type                                         | Default      | Description                                                                                              |
|----------------------------------------------|----------------------------------------------|--------------|----------------------------------------------------------------------------------------------------------|
| `value`    <span style="color:red;">*</span> | `string \| number`                           | -            | The value of the input box.                                                                              |
| `onChange` <span style="color:red;">*</span> | `(e: ChangeEvent<HTMLInputElement>) => void` | -            | The callback function when the value of the input box changes.                                           |
| `type`     <span style="color:red;">*</span> | `'text' \| 'number' \| 'password'`           | -            | The type of the input box, either text, number, or password.                                             |
| `maxVal`                                     | `number`                                     | -            | The maximum value of the input box.                                                                      |
| `isMinValueEnabled`                          | `boolean`                                    | `false`      | Whether to enable the minimum value check.                                                               |
| `minVal`                                     | `number`                                     | `0`          | The minimum value of the input box.                                                                      |
| `isInteger`                                  | `boolean`                                    | `true`       | Whether the input must be an integer.                                                                    |
| `isShowArrow`                                | `boolean`                                    | `true`       | Whether to show the up and down arrows on the number input.                                              |
| `isZeroStart`                                | `boolean`                                    | `false`      | Whether it is allowed to input numbers starting with 0 (e.g., 001).                                      |
| `enableValidation`                           | `boolean`                                    | `false`      | Whether to enable input validity verification.                                                           |
| `validationFunction`                         | `(v: string) => boolean`                     | `() => true` | The function to verify the validity of the input. If not passed, the default is successful verification. |
| `buttonTouchedFlag`                          | `boolean`                                    | `false`      | Whether the parent component has clicked the submit button.                                              |
| `errorMessage`                               | `string`                                     | -            | The text of the error message.                                                                           |
| `errorMessageClassName`                      | `string`                                     | -            | The style class name of the error message.                                                               |
| `errorInputClassName`                        | `string`                                     | -            | The style class name of the error input box.                                                             |
| `isShowPassword`                             | `boolean`                                    | `false`      | In password mode, whether the password can be seen.                                                      |
| `endIcon`                                    | `JSX.Element`                                | -            | The icon displayed at the end of the input field.                                                        |

## Usage Example

You can use other input properties like id, className, and style for further customization:

```jsx
import VerifiedInput from 'react-verified-input';

function ExampleComponent() {
    const [value, setValue] = useState('');
    return (
        <VerifiedInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxVal={100}
            minVal={0}
            isMinValueEnabled={true}
            isInteger={true}
            isShowArrow={true}
            isZeroStart={false}
            type="password"
            isShowPassword={true}
            enableValidation={true}
            validationFunction={(v) => v.length > 0}
            buttonTouchedFlag={true}
            errorMessage="Invalid input!"
            errorMessageClassName="error-message"
            errorInputClassName="error-input"
            id="example"
            className="custom-class"
            style={{ backgroundColor: 'lightblue' }}
            endIcon={<SomeIcon />}
        />
    );
}
```
## About the Author

This component library is developed and maintained by [zqsun](https://github.com/zqsun0). If you encounter any issues or have suggestions, please feel free to open an issue on the [GitHub repository](https://github.com/zqsun0/react-verified-input).

