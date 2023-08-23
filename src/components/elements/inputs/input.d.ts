interface InputCustomProps {
  size?: string;
  value?: string | number | readonly string[] | undefined;
  placeholder?: string;
  className?: string;
  required?: boolean;
  pattern?: string;
  inputMode?:
    | "search"
    | "text"
    | "email"
    | "tel"
    | "url"
    | "none"
    | "numeric"
    | "decimal"
    | undefined;
  onChange?: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onReset?: (params?: string | number | undefined) => void;
}
