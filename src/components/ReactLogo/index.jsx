import logo from '../../logo.svg';
import './index.css';

function ReactLogo(props) {
    return (
        <div className="ReactLogo">
            <header className="App-header">
                <img src={logo} className={`App-logo ${props.size}`} alt="logo" />
            </header>
        </div>
    );
}

export default ReactLogo;