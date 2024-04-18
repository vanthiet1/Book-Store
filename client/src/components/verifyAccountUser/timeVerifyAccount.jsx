 const startResendTimer = (setTimeOtp, setResendEnabled) => {
    setResendEnabled(false);
    const intervalId = setInterval(() => {
        setTimeOtp((prevCountdown) => {
            if (prevCountdown === 0) {
                clearInterval(intervalId);
                setResendEnabled(true);
                return 100;
            }
            return prevCountdown - 1;
        });
    }, 1000);
    return intervalId;
};

 const ResendClick = (setTimeOtp, setResendEnabled) => {
     startResendTimer(setTimeOtp, setResendEnabled);
};

export{
    ResendClick
}
