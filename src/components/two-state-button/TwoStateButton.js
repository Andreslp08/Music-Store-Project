import { React, Component, createRef } from 'react';
import { withRouter } from 'react-router';
import './TwoStateButton.css'

class TwoStateButton extends Component {


    constructor(props) {
        super(props);

        this.state = {
            currentText: "Button off",
            defaultText: "Button off",
            activeText: "Button on",
            active: false,
            showIcon: false
        }
        this.onclickHandler = this.onclickHandler.bind(this);
        this.buttonRef = createRef();

    }

     componentDidMount() {
        this.initialState();
    }

    render() {
        const { currentText, showIcon } = this.state;
        return (
            <button ref={this.buttonRef} className="twoStateButton variant-button rounded-full" onClick={this.onclickHandler}>{currentText}
                {showIcon ?
                    <i className={this.props.iconClass}></i> : null
                }
            </button>
        )
    }

    setActivated(tof) {
        if (tof) {
            this.setState({
                active: true,
                currentText: this.state.activeText
            })
            this.buttonRef.current.classList.add("active");
        } else {
            this.setState({
                active: false,
                currentText: this.state.defaultText
            })
            this.buttonRef.current.classList.remove("active");
        }
    }


    initialState() {
        const { showIcon, defaultText, activeText, active } = this.props;
        this.setState({
            showIcon: showIcon ? showIcon : false,
            defaultText: defaultText ? defaultText : "Desactivated",
            activeText: activeText ? activeText : "Activated",
            active: active ? active : false
        }, () => {
            this.setActivated(this.state.active || false)
        })

    }


    onclickHandler() {
        this.setState({
            active: !this.state.active,
            currentText: this.state.active ? this.state.activeText : this.state.defaultText
        }, () => {
            this.setActivated(this.state.active)
            try {
                this.props.onClick(this.state.active);
            }
            catch (error) { }
        })

    }
}





export default withRouter(TwoStateButton);