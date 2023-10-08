
export default function Hamburger({ isOpen }) {
    return(
        <section>
            <div className="hamburger">
                <div className="burger burger1"></div>
                <div className="burger burger2"></div>
                <div className="burger burger3"></div>
            </div>

            <style jsx> {`
                .hamburger{
                    width:2rem;
                    height: 2rem;
                    display: flex;
                    justify-content: space-around;
                    flex-flow: column nowrap;
                    z-index: 10;
                }  
                
                .burger {
                    width: 2rem;
                    height: 0.25rem;
                    border-radius: 10px;
                    transform-origin: 1px;
                    background-color: black;
                }

                .burger1 {
                    transition: all 0.35s linear;
                    transform: ${ isOpen ? 'rotate(45deg)' : 'rotate(0)'}
                }
                .burger2 {
                    transition: all 0.4s linear;
                    transform: ${ isOpen ? 'translateX(100%)' : 'translateX(0%)'};
                    opacity: ${ isOpen ? 0 : 1};
                }
                .burger3 {
                    transition: all 0.3s linear;
                    transform: ${ isOpen ? 'rotate(-45deg)' : 'rotate(0)'}
                }
            `}
            </style>
        </section>
    )
}