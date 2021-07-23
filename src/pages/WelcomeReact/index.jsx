import logo from '../../logo.svg';
import './index.css';

function WelcomeReact() {
    return (
        <div className="WelcomeReact">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/components/WelcomeReact/index.jsx</code> and save to reload.
                </p>
                <a className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default WelcomeReact;