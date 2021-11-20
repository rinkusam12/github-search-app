import React from "react";
import classes from "./styles.module.scss";
interface InputProps {
  className?: string;
  id: string;
  label: string;
  value?: string;
  inputStyle?: React.CSSProperties;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  touched?: boolean;
  error?: string;
}

const TextArea: React.FC<InputProps> = (props) => {
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
        className={`text-body2 leading-120 text-font-secondary mb-2`}
        htmlFor={props.id}
      >
        {props.label}
      </label>
      <textarea
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
        style={props.inputStyle}
        onChange={props.onChange}
        value={props.value}
        className={`w-full rounded p-4 h-[143px] border-1 border-primary-input focus:border-primary-border active:border-primary-border`}
      />
       {props.touched && Boolean(props.error) && <small>{props.error}</small>}
    </div>
  );
};

export default TextArea;
