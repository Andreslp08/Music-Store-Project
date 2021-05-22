import React from 'react'
import './Home.css'

export class Home extends React.Component{

    render(){
        return(
            <section className=" min-h-screen">
               <this.Welcome/>
                </section>
            );
    }

    Welcome(){
        return (
            <div className="welcome-img flex flex-col justify-center items-center">
                <h2 className="text-center bg-background color-onbackground font-anton p-8 rounded-full lg:text-8xl text-7xl text-shadow-3"><i className="fas fa-music"></i> Music Store <i className="fas fa-music"></i></h2>
                <h3 className="m-5 text-white text-xl text-shadow-2">We have the best instruments with good prices!</h3>
            </div>
        )
    }
}

