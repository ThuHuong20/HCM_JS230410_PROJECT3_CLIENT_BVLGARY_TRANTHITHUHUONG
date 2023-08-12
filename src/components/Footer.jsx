import React from "react";
export default function Footer() {
    return (
        <div className="footer">
            {/* Footer */}
            <footer className="text-center text-lg-start bg-light text-muted">
                {/* Section: Social media */}

                <section
                    className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
                    style={{
                        fontWeight: "bold",
                        backgroundColor: "rgb(236, 223, 219)",
                    }}
                >
                    {/* Left */}
                    <div className="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>
                    {/* Left */}
                    {/* Right */}
                    <div>
                        <a
                            href="https://www.facebook.com/Bulgari/"
                            className="me-4 text-reset"
                        >
                            <i className="fab fa-facebook-f" />
                        </a>
                        <a
                            href="https://www.youtube.com/Bulgari"
                            className="me-4 text-reset"
                        >
                            <i className="fa-brands fa-youtube"></i>
                        </a>
                        <a
                            href="https://www.instagram.com/bulgari/"
                            className="me-4 text-reset"
                        >
                            <i className="fab fa-instagram" />
                        </a>
                        <a
                            href="https://www.pinterest.com/bulgari/"
                            className="me-4 text-reset"
                        >
                            <i className="fa-brands fa-pinterest"></i>
                        </a>
                        <a href className="me-4 text-reset">
                            <i className="fab fa-linkedin" />
                        </a>
                    </div>
                    {/* Right */}
                </section>
                {/* Section: Social media */}
                {/* Section: Links  */}
                <section className>
                    <div className="container text-center text-md-start mt-5">
                        {/* Grid row */}
                        <div className="row mt-3">
                            {/* Grid column */}
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                {/* Content */}
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3" />
                                    CUSTOMER CARE
                                </h6>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Order information
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Book an appointment
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Returns & exchanges
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        FAQ
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Services
                                    </a>
                                </p>
                            </div>
                            {/* Grid column */}
                            {/* Grid column */}
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                {/* Links */}
                                <h6 className="text-uppercase fw-bold mb-4">
                                    ABOUT BVLGARI
                                </h6>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Corporate social
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        People and careers
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Brand protection
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Hotels & resorts
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        The maison
                                    </a>
                                </p>
                            </div>
                            {/* Grid column */}
                            {/* Grid column */}
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                {/* Links */}
                                <h6 className="text-uppercase fw-bold mb-4">
                                    PRIVACY CENTER
                                </h6>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Cookies Settings
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Cookie policy
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Privacy policy
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Candidate privacy
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Data Protection
                                    </a>
                                </p>
                            </div>
                            {/* Grid column */}
                            {/* Grid column */}
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                {/* Links */}
                                <h6 className="text-uppercase fw-bold mb-4">
                                    CONTACT US
                                </h6>
                                <p>
                                    <i className="fas fa-home me-3" /> New York,
                                    NY 10012
                                </p>
                                <p>
                                    <i className="fas fa-envelope me-3" />
                                    info@example.com
                                </p>
                                <p>
                                    <i className="fas fa-phone me-3" /> + 01 234
                                    567 88
                                </p>
                                <p>
                                    <i className="fas fa-print me-3" /> + 01 234
                                    567 89
                                </p>
                            </div>
                            {/* Grid column */}
                        </div>
                        {/* Grid row */}
                    </div>
                </section>
                {/* Section: Links  */}
                {/* Copyright */}
                <div
                    className="text-center p-4"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                >
                    BVLGARI® Official Website United States
                </div>
                {/* Copyright */}
            </footer>
            {/* Footer */}
        </div>
    );
}
