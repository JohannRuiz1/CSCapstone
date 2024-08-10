import {useEffect, useState} from 'react';
import confetti from "canvas-confetti";
import {Link, useNavigate} from 'react-router-dom';
import {loginPagePath} from "../utils.ts";

export default function SignUpConfirmationPage() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(30); // Initialize countdown to 30 seconds

    useEffect(() => {
        // Set up a timer that decreases the countdown every second
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        // When countdown reaches 0, navigate to the login page
        if (countdown === 0) {
            navigate('/login');
        }

        // Cleanup the interval on component unmount or countdown reaching 0
        return () => clearInterval(timer);
    }, [navigate, countdown]);

    useEffect(() => {
        const duration = 30 * 1000; // 10 seconds
        const end = Date.now() + duration;

        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
        const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();
        const tertiaryColor = getComputedStyle(document.documentElement).getPropertyValue('--tertiary-color').trim();

        let animationFrameId: number;

        const frame = () => {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: {x: 0},
                colors: [primaryColor, secondaryColor, tertiaryColor]
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: {x: 1},
                colors: [primaryColor, secondaryColor, tertiaryColor]
            });

            if (Date.now() < end) {
                animationFrameId = requestAnimationFrame(frame);
            }
        };

        frame();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className='signup-confirmation-page center-content'>
            <h1>Thank you for signing up with VT Research Connect!</h1>
            <img src="/site-images/logo.png"
                 alt="VT Research Connect Logo"
                 style={{width: '150px', margin: '0 auto', display: 'block'}}/>
            <h1>An email confirmation link has been sent to your email.</h1>
            <h1>You must confirm the link in your email before signing in.</h1>
            <h1>Please check your Junk or Spam folders if the email isn't in your Inbox!</h1>
            <h1>You will be redirected to the <Link to={loginPagePath} className="tertiary-button-other">Login
                Page</Link> in {countdown} seconds.</h1>
        </div>
    );
}