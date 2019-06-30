import React, {Component} from 'react';
import classNames from 'classnames';

export default class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {show: false};
    }

    showLoader = () => {
        this.setState ({
            show: true
        });
    }

    hideLoader = () => {
        this.setState({
            show: false
        });
    }

    render() {
        let {children} = this.props; 
        return (
            <div>
                <div className={classNames('loader-wrapper', {hide: !this.state.show})}>
                    <div className={classNames('loader', {hide: !this.state.show})}>

                    </div>
                </div>
                {React.cloneElement(React.Children.only(children), {
                        showLoader: this.showLoader,
                        hideLoader: this.hideLoader
                })}
            </div>
        );
    }
}