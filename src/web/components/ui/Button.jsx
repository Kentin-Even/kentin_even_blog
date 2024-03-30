import clsx from "clsx"

const variants = {
  primary: "bg-blue-800 active:bg-blue-700 text-white rounded-full",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full",
  transparent: "",
}
const sizes = {
  inherit: "",
  md: "px-3 py-2 text-xl font-semibold",
  sm: "px-3 py-2 text-sm"
}
const Button = ({
  variant = "primary",
  size = "md",
  className,
  ...otherProps
}) => (
  <button
    className={clsx(
      " disabled:bg-slate-200 disabled:text-black",
      variants[variant],
      sizes[size],
      className,
    )}
    {...otherProps}
  />
)

export default Button
