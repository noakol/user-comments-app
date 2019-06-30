import React, {Component} from 'react';

export default class SearchFilter extends Component {
    constructor(props) {
        super(props);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    componentDidMount() {
        const {value} = this.props;
        if (value) {
            this.searchInput.value = value;
        }
    }

    onSearchChange(e) {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            const {filterChange} = this.props;
            const {value} = this.searchInput;
            filterChange(value);
        }, 1000);
    }

    render() {
        return (
            <input
                className="ds-search"
                type="search"
                className="ds-search__input"
                ref={(input) => {
                    this.searchInput = input;
                }}
                onKeyUp={this.onSearchChange}
                placeholder="Search"
                autoComplete="false"
            />
        );
    }

}
