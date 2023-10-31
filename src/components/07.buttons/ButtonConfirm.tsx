import { Button, ButtonProps } from "antd";
import "./styles.scss";

interface IButtonLogin extends ButtonProps {}

const ButtonConfirm: React.FC<IButtonLogin> = (props: IButtonLogin) => {
  return (
    <Button type="primary" block {...props} size="large">
      Confirm
    </Button>
  );
};

export default ButtonConfirm;
