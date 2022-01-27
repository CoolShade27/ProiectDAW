import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

interface Iprops {
    inverted?: boolean,
    content: string
}

export const Loading: React.FC<Iprops> = (
    inverted,
    content
) => {
    return (
        <Dimmer active inverted={inverted}>
            <Loader
                content={content}
            />
        </Dimmer>
    );
};
