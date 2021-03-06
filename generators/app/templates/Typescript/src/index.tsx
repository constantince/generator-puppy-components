import React, { useState, Fragment } from 'react';
import pt from './styles.module.scss';
import { Button } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import selected from '/../src/assets/react.jpg';
import SubComp from './SubComp';

type props = {
  name: string;
};

const <%=Name%>: React.FC<props> = ({ name }) => {
  let [type, setType] = useState<number>(0);

  return (
    <Fragment>
      <div className={pt.container}>
        <img src={selected} />
        <Button
          size='large'
          onClick={() => {
            setType(++type);
          }}
        >
          <p className={pt.container}>
            {name} is {type}
          </p>
          
        </Button>
        <SubComp say="hello sub-components" />
      </div>
    </Fragment>
  );
};

export default <%=Name%>;
