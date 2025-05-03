export const getWelcomeEmail = (name?: string) => {
    const user = name || 'There';

    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Welcome to TripWise</title>
                <style>
                    body {
                        font-family: Roboto, Arial, sans-serif;
                        line-height: 1.6;
                        background-color: #f9f9f9;
                        padding: 20px;
                        color: #282828
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 0 auto;
                        background: #ffffff;
                        padding: 15px 30px;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    }
                    .emoji {
                        font-size: 1.2em;
                    }
                    p {
                        font-size: 16px;
                        margin: 0;
                    }
                </style>
            </head>
            <body style="
                font-family: Roboto, Arial, sans-serif;
                line-height: 1.6;
                background-color: #f9f9f9;
                padding: 20px;
            ">
                <div class="email-container">
                    <h2>Hey ${user}! <span class="emoji">👋</span></h2>
                    <p>Welcome to the TripWise crew — you’re officially on the list! <span class="emoji">🎉</span></p>
                    <p>We’re building the easiest, chillest way to plan group trips without the group chaos.</p>
                    <br />
                    <p>You’ll be the first to know when we launch <span class="emoji">🚀</span> (plus, maybe a few surprises <span class="emoji">👀</span>).</p>
                    <br />
                    <p>Until then, start dreaming about your next adventure — we’ll handle the planning. <span class="emoji">😉</span></p>
                    <br />
                    <p>Talk soon,</p>
                    <p style=" color: #047857 "><strong>The TripWise Team <span class="emoji">🌎</span></strong></p>
                </div>
            </body>
        </html>
    `;
}
// You received this email because you joined the TripWise waitlist.