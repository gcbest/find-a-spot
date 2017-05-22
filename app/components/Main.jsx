import React, {Component} from 'react';

const Main = (props) => {
    return (
        <div>
            <div className="row">
                <div className="column medium-6 large-4 small-centered">
                	Main Component
                    {props.children}
                </div>
            </div>
        </div>

    );
};

export default Main;