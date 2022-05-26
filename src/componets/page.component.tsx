import React, {FC, ReactElement, ReactNode} from 'react';

type PropsType = {
    children: ReactNode
}

const Page: FC<PropsType> = ({children}): ReactElement => {

    return (
        <div className="page">
            { children }
        </div>
    )

};


export default Page;