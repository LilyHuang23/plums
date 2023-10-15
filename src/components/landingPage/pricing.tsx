export default function Pricing() {

    return (
        <div className="pricing w-full h-landing-box space-x-10 bg-menu-white">

            <div className="card bg-tekhelet w-72 h-96">
                <h2 className="text-2xl text-white">BASIC</h2>
                <div className="internal_card text-lg">
                    <h1 className="text-2xl">FREE</h1>
                    <ul>
                        <li>- Personal Use</li>
                        <li>- Limited Email Support</li>
                        <li>- 1GB Online Storage</li>
                    </ul>
                    <button className="pricing-button">SIGN UP</button>
                </div>
            </div>

            <div className="card bg-wisteria w-80 h-100">
                <h2 className="text-2xl ">PREMIUM</h2>
                <div className="internal_card text-lg">
                    <h1 className="text-2xl">79$/mo</h1>
                    <ul>
                        <li>- Limited Team Support</li>
                        <li>- Limited Email Support</li>
                        <li>- 10GB Online Storage</li>
                    </ul>
                    <button className="pricing-button">SIGN UP</button>
                </div>
            </div>

            <div className="card bg-tekhelet w-72 h-96">
                <h2 className="text-2xl text-white">ENTERPRISE</h2>
                <div className="internal_card text-lg">
                    <h1 className="text-2xl">499$/mo</h1>
                    <ul>
                        <li>- Unlimited Team Support</li>
                        <li>- Unlimited Email Support</li>
                        <li>- 1TB Online Storage</li>
                    </ul>
                    <button className="pricing-button">SIGN UP</button>
                </div>
            </div>
        </div>
    )
}