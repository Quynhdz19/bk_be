import { Tabs, TabsProps } from "antd";
import "./index.scss";

interface ITridentityTab extends TabsProps {
  children?: React.ReactNode;
}

const TridentityTabs: React.FC<ITridentityTab> = (props: ITridentityTab) => {
  const { children } = props;
  return <Tabs {...props}>{children}</Tabs>;
};

export default TridentityTabs;
