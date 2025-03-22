import { useRef, useState } from "react";

const useInput = (
  defaultValue: string,
  validationFn: (text: string) => boolean,
) => {
  const [value, setValue] = useState<string>(defaultValue);
  const [didEdit, setDidEdit] = useState<boolean>(false);
  const lastChange = useRef<ReturnType<typeof setTimeout> | null>(null);

  const valueIsValid = validationFn(value);

  function handleInputChange(value: string) {
    setValue(value);
    setDidEdit(false);

    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }

    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      setDidEdit(true);
    }, 500);
  }

  function handleInputBlur() {
    setDidEdit(true);
  }

  return {
    value,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid,
  };
};

export default useInput;
