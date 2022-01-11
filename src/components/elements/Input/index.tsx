import React, {
  InputHTMLAttributes,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { IconBaseProps } from "react-icons";

import { Container, Label } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
  label?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  label,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <>
      {!!label && <Label htmlFor={name}>{label}</Label>}

      <Container
        style={containerStyle}
        isFocused={isFocused}
        data-testid="input-container"
      >
        {Icon && <Icon size={20} />}
        <input
          id={name}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          {...rest}
        />
      </Container>
    </>
  );
};

export default Input;
