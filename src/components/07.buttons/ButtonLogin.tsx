import { Button, ButtonProps } from "antd";
import "./styles.scss";

interface IButtonLogin extends ButtonProps {}

const ButtonLogin: React.FC<IButtonLogin> = (props: IButtonLogin) => {
  return (
    <Button type="primary" className="login-btn" block {...props} size="large">
      Sign in
    </Button>
  );
};

export default ButtonLogin;
