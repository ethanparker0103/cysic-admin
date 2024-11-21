
export const cosmosJoyRideSteps = [
    {
        target: '#cosmos-connect-button',
        content: 'Please Connect Your Keplr Wallet to Unlock your following journey in Cysic',
    },
    {
        target: '#faucet-trigger-button',
        content: 'Click Here to get your CYS Token',
    },
];


const  buttonBase = {
    color: '#fff',
    fontSize: 14,
}
const options = {
    arrowColor: '#fff',
    backgroundColor: '#fff',
    beaconSize: 18,
    overlayColor: 'rgba(0, 0, 0, 0.5)',
    primaryColor: '#000',
    spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
    textColor: '#000',
    width: 250,
    zIndex: 100,
    fontSize: 14,
}
export const joyRideStyleSheet = {
    options,
    tooltip: {
        backgroundColor: options.backgroundColor,
    },
    buttonSkip: {
        ...buttonBase
    },
    buttonClose: {
        ...buttonBase
    },
    buttonNext: {
        ...buttonBase
    },
    buttonBack:{
        ...buttonBase
    },
    tooltipContent: {
        padding: 0,
        fontSize: buttonBase.fontSize
    },
    tooltipFooter: {
        marginTop: 8,
      },
      floaterStyles: {
        arrow: {
          width: 16,
          height: 16
        },
        options: {
          zIndex: options.zIndex + 100,
        },
      },
};
