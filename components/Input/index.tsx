import React from "react";

interface InputProps {
  className?: string;
  id: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  touched?: boolean;
  error?: string;
  hideLabel?: boolean;
  inputClass?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
import classes from "./styles.module.scss";
const Input: React.FC<InputProps> = (props) => {
  const [active, setActive] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  return (
    <div
      className={`${props.className || ""} ${classes.Input} ${
        hover && !active ? classes.hover : ""
      } ${active ? classes.active : ""} ${
        props.touched && Boolean(props.error) ? classes.error : ""
      }`}
    >
      <label
        className={`text-body2 leading-120 text-font-secondary mb-2 ${
          props.hideLabel ? "hidden" : ""
        }`}
        htmlFor={props.id}
      >
        {props.label}
      </label>
      <input
        onKeyDown={props.onKeyDown}
        placeholder={props.hideLabel ? props.label : ""}
        id={props.id}
        name={props.id}
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        onFocus={() => {
          setActive(true);
        }}
        onBlur={(e) => {
          setActive(false);
          if (props.onBlur) {
            props.onBlur(e);
          }
        }}
        onChange={props.onChange}
        value={props.value}
        className={`w-full rounded px-2 h-59 ${props.inputClass}`}
        type="text"
      />
      {props.touched && Boolean(props.error) && <small>{props.error}</small>}
    </div>
  );
};

export default Input;
