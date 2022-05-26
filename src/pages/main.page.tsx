import React, {FC, ReactElement} from 'react';
import Page from "../componets/page.component";
import List from "../componets/list.component";

const MainPage: FC = (): ReactElement => {

    return (
        <Page>

            <main className="page__center page__main">
                <List/>
            </main>
        </Page>
    );

};


export default MainPage;