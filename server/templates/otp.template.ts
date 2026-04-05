export const otpTemplate = (otp: string) => {
    const digits = otp.split("")

    return `
        <!DOCTYPE html>
        <html lang="en">

            <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>ByteBurst – OTP Verification</title>
            <link
                href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Bebas+Neue&family=Rajdhani:wght@400;600;700&display=swap"
                rel="stylesheet" />
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    background-color: #0a0000;
                    font-family: 'Rajdhani', sans-serif;
                    color: #e8d5d5;
                    padding: 40px 20px;
                    -webkit-font-smoothing: antialiased;
                }

                .email-wrapper {
                    max-width: 600px;
                    margin: 0 auto;
                }

                /* ── TOP ACCENT BAR ── */
                .top-bar {
                    height: 4px;
                    background: linear-gradient(90deg, transparent, #8b0000, #ff1a1a, #8b0000, transparent);
                }

                /* ── HEADER ── */
                .header {
                    background: linear-gradient(160deg, #1a0000 0%, #0d0000 50%, #1f0505 100%);
                    border: 1px solid #3d0000;
                    border-top: none;
                    padding: 48px 40px 36px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }

                .header::before {
                    content: '';
                    position: absolute;
                    top: -60px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle, rgba(139, 0, 0, 0.25) 0%, transparent 70%);
                    pointer-events: none;
                }

                .header::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #8b0000 30%, #ff1a1a 50%, #8b0000 70%, transparent);
                }

                .logo-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 20px;
                }

                .logo-icon {
                    width: 44px;
                    height: 44px;
                    border: 2px solid #cc0000;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #2a0000, #1a0000);
                    box-shadow: 0 0 16px rgba(204, 0, 0, 0.4), inset 0 0 8px rgba(255, 26, 26, 0.1);
                    position: relative;
                }

                .logo-icon svg {
                    width: 24px;
                    height: 24px;
                }

                .logo-text {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 36px;
                    letter-spacing: 4px;
                    background: linear-gradient(180deg, #ff3333 0%, #cc0000 50%, #ff6666 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-shadow: none;
                    line-height: 1;
                }

                .tagline {
                    font-family: 'Share Tech Mono', monospace;
                    font-size: 11px;
                    letter-spacing: 6px;
                    color: #661111;
                    text-transform: uppercase;
                    margin-top: 6px;
                }

                /* ── BODY ── */
                .body {
                    background: #0d0000;
                    border: 1px solid #2a0000;
                    border-top: none;
                    padding: 44px 40px;
                }

                .greeting {
                    font-size: 14px;
                    color: #994444;
                    font-family: 'Share Tech Mono', monospace;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    margin-bottom: 16px;
                }

                .greeting span {
                    color: #ff4444;
                }

                .headline {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 30px;
                    letter-spacing: 3px;
                    color: #f5e0e0;
                    margin-bottom: 20px;
                    line-height: 1.15;
                }

                .headline em {
                    color: #ff2222;
                    font-style: normal;
                }

                .message {
                    font-size: 15px;
                    line-height: 1.8;
                    color: #b08080;
                    margin-bottom: 36px;
                }

                /* ── OTP BOX ── */
                .otp-section {
                    text-align: center;
                    margin: 40px 0;
                }

                .otp-label {
                    font-family: 'Share Tech Mono', monospace;
                    font-size: 11px;
                    letter-spacing: 5px;
                    color: #661111;
                    text-transform: uppercase;
                    margin-bottom: 18px;
                }

                .otp-container {
                    display: inline-block;
                    background: linear-gradient(135deg, #1a0000, #100000);
                    border: 1px solid #550000;
                    border-radius: 6px;
                    padding: 28px 48px;
                    position: relative;
                    box-shadow:
                        0 0 0 1px rgba(255, 0, 0, 0.08),
                        0 0 30px rgba(139, 0, 0, 0.3),
                        0 0 60px rgba(139, 0, 0, 0.1),
                        inset 0 1px 0 rgba(255, 60, 60, 0.15);
                }

                .otp-container::before,
                .otp-container::after {
                    content: '';
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    border-color: #cc0000;
                    border-style: solid;
                }

                .otp-container::before {
                    top: -1px;
                    left: -1px;
                    border-width: 2px 0 0 2px;
                    border-radius: 4px 0 0 0;
                }

                .otp-container::after {
                    bottom: -1px;
                    right: -1px;
                    border-width: 0 2px 2px 0;
                    border-radius: 0 0 4px 0;
                }

                .otp-code {
                    font-family: 'Share Tech Mono', monospace;
                    font-size: 52px;
                    letter-spacing: 14px;
                    color: #ff2222;
                    text-shadow:
                        0 0 10px rgba(255, 34, 34, 0.8),
                        0 0 30px rgba(255, 34, 34, 0.4),
                        0 0 60px rgba(255, 34, 34, 0.2);
                    padding-right: 0;
                    margin-right: -14px;
                    /* compensate last letter-spacing */
                }

                .otp-digits {
                    display: flex;
                    gap: 8px;
                    justify-content: center;
                }

                .digit {
                    width: 52px;
                    height: 64px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(139, 0, 0, 0.08);
                    border: 1px solid rgba(139, 0, 0, 0.3);
                    border-radius: 4px;
                    font-family: 'Share Tech Mono', monospace;
                    font-size: 32px;
                    color: #ff2222;
                    text-shadow: 0 0 12px rgba(255, 34, 34, 0.8);
                    letter-spacing: 0;
                }

                .otp-validity {
                    margin-top: 16px;
                    font-family: 'Share Tech Mono', monospace;
                    font-size: 11px;
                    letter-spacing: 2px;
                    color: #551111;
                }

                .otp-validity span {
                    color: #cc3333;
                }

                /* ── DIVIDER ── */
                .divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #2a0000 30%, #550000 50%, #2a0000 70%, transparent);
                    margin: 36px 0;
                }

                /* ── WARNING ── */
                .warning-box {
                    background: rgba(139, 0, 0, 0.07);
                    border-left: 3px solid #8b0000;
                    border-radius: 0 4px 4px 0;
                    padding: 16px 20px;
                    margin-bottom: 28px;
                }

                .warning-box p {
                    font-size: 13px;
                    color: #994444;
                    line-height: 1.6;
                }

                .warning-box strong {
                    color: #cc3333;
                    font-weight: 700;
                }

                /* ── CTA BUTTON ── */
                .cta-wrap {
                    text-align: center;
                    margin: 32px 0;
                }

                .cta-btn {
                    display: inline-block;
                    background: linear-gradient(135deg, #8b0000, #cc0000);
                    color: #fff;
                    text-decoration: none;
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 18px;
                    letter-spacing: 3px;
                    padding: 14px 44px;
                    border-radius: 4px;
                    border: 1px solid rgba(255, 80, 80, 0.3);
                    box-shadow: 0 0 20px rgba(139, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.4);
                    cursor: pointer;
                }

                /* ── STEPS ── */
                .steps {
                    margin: 32px 0;
                }

                .steps-title {
                    font-family: 'Share Tech Mono', monospace;
                    font-size: 11px;
                    letter-spacing: 4px;
                    color: #661111;
                    text-transform: uppercase;
                    margin-bottom: 18px;
                }

                .step {
                    display: flex;
                    align-items: flex-start;
                    gap: 16px;
                    margin-bottom: 14px;
                }

                .step-num {
                    width: 26px;
                    height: 26px;
                    min-width: 26px;
                    background: linear-gradient(135deg, #2a0000, #1a0000);
                    border: 1px solid #550000;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Share Tech Mono', monospace;
                    font-size: 11px;
                    color: #cc3333;
                    box-shadow: 0 0 8px rgba(139, 0, 0, 0.3);
                }

                .step-text {
                    font-size: 14px;
                    color: #996666;
                    line-height: 1.6;
                    padding-top: 3px;
                }

                /* ── FOOTER ── */
                .footer {
                    background: linear-gradient(180deg, #0a0000, #080000);
                    border: 1px solid #1a0000;
                    border-top: none;
                    padding: 32px 40px;
                    text-align: center;
                }

                .footer-logo {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 22px;
                    letter-spacing: 6px;
                    color: #440000;
                    margin-bottom: 12px;
                }

                .footer-links {
                    margin-bottom: 20px;
                }

                .footer-links a {
                    font-family: 'Share Tech Mono', monospace;
                    font-size: 11px;
                    color: #441111;
                    text-decoration: none;
                    letter-spacing: 2px;
                    margin: 0 12px;
                }

                .footer-links a:hover {
                    color: #882222;
                }

                .footer-copy {
                    font-size: 12px;
                    color: #331111;
                    line-height: 1.8;
                    font-family: 'Share Tech Mono', monospace;
                    letter-spacing: 1px;
                }

                .bottom-bar {
                    height: 3px;
                    background: linear-gradient(90deg, transparent, #2a0000, #550000, #2a0000, transparent);
                }

                /* scan-line texture */
                .scanlines {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: repeating-linear-gradient(0deg,
                            rgba(0, 0, 0, 0) 0px,
                            rgba(0, 0, 0, 0) 2px,
                            rgba(0, 0, 0, 0.03) 2px,
                            rgba(0, 0, 0, 0.03) 4px);
                    pointer-events: none;
                    z-index: 999;
                }
            </style>
        </head>

        <body>
            <div class="scanlines"></div>

            <div class="email-wrapper">
                <div class="top-bar"></div>

                <!-- HEADER -->
                <div class="header">
                    <div class="logo-badge">
                        <div class="logo-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 2L4.5 13H11L9 22L19.5 11H13L13 2Z" fill="#cc0000" stroke="#ff4444"
                                    stroke-width="0.5" />
                            </svg>
                        </div>
                        <div>
                            <div class="logo-text">ByteBurst</div>
                        </div>
                    </div>
                    <div class="tagline">&lt; TECH FEST 2025 &nbsp;·&nbsp; VERIFY &amp; ACCESS &gt;</div>
                </div>

                <!-- BODY -->
                <div class="body">
                    <div class="greeting">// Hello, <span>Participant</span></div>
                    <div class="headline">YOUR <em>VERIFICATION</em><br>CODE AWAITS</div>
                    <p class="message">
                        You requested access to the ByteBurst registration portal.
                        Use the one-time passcode below to verify your identity and
                        claim your spot at the biggest tech fest of the year.
                    </p>

                    <!-- OTP -->
                    <div class="otp-section">
                        <div class="otp-label">// ONE-TIME PASSCODE</div>
                        <div class="otp-container">
                            <div class="otp-digits">

                                ${digits
            .map((d) => `<div class="digit">${d}</div>`)
            .join("")
        }
                                <!-- <div class="digit">8</div>
                                <div class="digit">4</div>
                                <div class="digit">7</div>
                                <div class="digit">2</div>
                                <div class="digit">3</div>
                                <div class="digit">1</div> -->
                            </div>
                            <div class="otp-validity">Expires in <span>10:00 minutes</span></div>
                        </div>
                    </div>

                    <!-- CTA -->
                    <!-- <div class="cta-wrap">
                        <a href="#" class="cta-btn">VERIFY &amp; PROCEED</a>
                    </div> -->

                    <div class="divider"></div>

                    <!-- STEPS -->
                    <div class="steps">
                        <div class="steps-title">// HOW TO USE</div>
                        <div class="step">
                            <div class="step-num">01</div>
                            <div class="step-text">Copy the 6-digit OTP displayed above.</div>
                        </div>
                        <div class="step">
                            <div class="step-num">02</div>
                            <div class="step-text">Return to the ByteBurst registration page and enter the code.</div>
                        </div>
                        <div class="step">
                            <div class="step-num">03</div>
                            <div class="step-text">Hit <strong style="color:#cc3333">Verify</strong> — you're in. Welcome to the
                                burst.</div>
                        </div>
                    </div>

                    <div class="divider"></div>

                    <!-- WARNING -->
                    <div class="warning-box">
                        <p>
                            <strong>⚠ Security Notice:</strong> This OTP is valid for a single use and expires in
                            10 minutes. <strong>Never share this code</strong> with anyone — ByteBurst staff will
                            never ask for your OTP. If you did not request this, you can safely ignore this email.
                        </p>
                    </div>
                </div>

                <!-- FOOTER -->
                <div class="footer">
                    <div class="footer-logo">ByteBurst</div>
                    <div class="footer-links">
                        <a href="#">Website</a>
                        <a href="#">Schedule</a>
                        <a href="#">Support</a>
                        <a href="#">Unsubscribe</a>
                    </div>
                    <div class="footer-copy">
                        © 2025 ByteBurst Tech Fest. All rights reserved.<br>
                        This is an automated message — please do not reply directly.
                    </div>
                </div>
                <div class="bottom-bar"></div>
            </div>

        </body>

        </html>
    `
}