export default function Pricing() {

    return (
        <div className="pricing w-full h-landing-box space-x-10 bg-menu-white">
                <div className="card bg-wisteria w-72 h-96">
                    <h1 className="text-4xl py-3">FREE</h1>
                    <h2 className="text-2xl">BASIC</h2>
                    <div className="internal_card text-lg">
                        <ul className="py-3">
                            <li>- Personal Use</li>
                            <li>- Limited Email Support</li>
                            <li>- 1GB Online Storage</li>
                        </ul>
                        <button className="pricing-button">SIGN UP</button>
                    </div>
                </div>

                <div className="card bg-wisteria w-80 h-100">
                    <h1 className="text-4xl py-3">79$/mo</h1>
                    <h2 className="text-2xl text-russian-violet">PREMIUM</h2>
                    <div className="internal_card text-lg">
                        <ul className="py-3">
                            <li>- Limited Team Support</li>
                            <li>- Limited Email Support</li>
                            <li>- 10GB Online Storage</li>
                        </ul>
                        <button className="pricing-button">SIGN UP</button>
                    </div>
                </div>

                <div className="card bg-wisteria w-72 h-96">
                    <h1 className="text-4xl py-3">499$/mo</h1>
                    <h2 className="text-2xl text-russian-violet">ENTERPRISE</h2>
                    <div className="internal_card text-lg">
                        <ul className="py-3">
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