import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <div className="max-w-4xl mx-auto py-10">{props.children}</div>
  </div>
);

export default Layout;
