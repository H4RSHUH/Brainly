import type { ReactElement } from "react";

interface ButtonProps{
    variant: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement
    onClick?: ()=>void
    loading?: boolean
}
const variantClass={
    "primary" : "bg-purple-600 text-white",
    "secondary" : "bg-purple-200 text-purple-400"
}
const defaultStyle= "px-4 py-2 rounded-md font-light flex items-center cursor-pointer"
export function Button(props:ButtonProps){
    return <button onClick={props.onClick}
    onKeyDown={(e) => {
        if (e.key === "Enter") {
          props.onClick?.()
        }
      }}
    className={ variantClass[props.variant] + " " + defaultStyle + `${props.loading? " opacity-45": ""}`} disabled={props.loading}>
        <div className="pr-2">{props.startIcon}</div>
        {props.text}</button>
}