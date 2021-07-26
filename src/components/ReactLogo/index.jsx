import logo from '../../logo.svg';
import './index.css';

function ReactLogo() {
    return (
        <div className="ReactLogo">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
        </div>
    );
}

export default ReactLogo;