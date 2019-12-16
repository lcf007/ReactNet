import React, { Component } from 'react';
import { ButtonGroup } from 'reactstrap';

export class Counter extends Component {
    static displayName = Counter.name;
    constructor(props) {
        super(props);
        this.state = { currentTime: '', started: false };
        this.timerId = 0;
    }

    refresh = () => {
        fetch('api/SampleData/GetTime')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ currentTime: data });
            });
    }

    componentDidMount = () => {
    }

    stopTimer = () => {
        if (this.state.started) {
            clearInterval(this.timerId);
            this.setState({ started: !this.state.started });
            this.setState({ currentTime: '' });
        }
    }

    startTimer = () => {
        if (!this.state.started) {
            this.timerId = setInterval(() => this.refresh(), 1000);
            this.setState({started: !this.state.started});
        }
    }

    render() {
        return (
            <div>
                <h1>Counter</h1>

                <p>This is a simple example of a React component.</p>

                <p>Current time: <strong>{this.state.currentTime}</strong></p>

                <ButtonGroup>
                    <button className="btn btn-primary" onClick={this.startTimer}>Start Timer</button>
                    <button className="btn btn-primary" onClick={this.stopTimer}>Stop Timer</button>
                </ButtonGroup>
            </div>
        );
    }
}
