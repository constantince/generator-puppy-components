import React, { Fragment } from "react";

type props = {
    say: string
}

const SubComp: React.FC<props> = ({say}) => {
    return <Fragment>
        <h1>{say}</h1>
    </Fragment>
}

export default SubComp;