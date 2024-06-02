import CircularLoader from "./circular-loader";

export default function LoadingButton({
  children,
  onClick,
  type,
  isLoading,
  style,
}) {
  return (
    <button onClick={onClick} className={style} type={type}>
      {isLoading ? <CircularLoader /> : children}
    </button>
  );
}
