import React from 'react';
import './Switch.css'

export class Swicth extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            activated:false
        }
        this.mainContainer = React.createRef();
        this.toogleComponent = React.createRef();
        this.component = this.mainContainer.current;
    }

    render(){
        return (
            <div className="switch bg-primary" ref={this.mainContainer} >
                <div className="switch-toogle bg-background" ref={this.toogleComponent}>
                </div>
            </div>
        );
    }


    componentDidMount(){
      this.eventManager();
    }


    eventManager(){
        this.switchActivatedEvent = new CustomEvent('switchClick', {
            detail:{
                activated:false

            }
        });

        this.component = this.mainContainer.current;
        this.component.addEventListener('click',()=>{
            if( this.state.activated == true ){
                this.changeState(false);
            }
            else{
                this.changeState(true);
            }
            this.component.dispatchEvent(this.switchActivatedEvent);
        });
    }



    isActivated(){
        if( this.state.activated == true){
            return true;
        }
        else{
            return false;
        }
    }

    changeState(tof){
        this.toogleComponent.current.classList.remove('switch-activated');
        this.toogleComponent.current.classList.remove('switch-desactivated');
        if( tof == true ){
            this.mainContainer.current.dataset.activated = "activated";
            this.toogleComponent.current.classList.add('switch-activated');
        }
        else{
            this.mainContainer.current.dataset.activated = "desactivated";
            this.toogleComponent.current.classList.add('switch-desactivated');
        }
        this.setState({activated:tof});
        this.switchActivatedEvent.detail.activated = this.state.activated;
    }

}