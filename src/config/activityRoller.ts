export const activityRoller = [
    {
        content: 'Phase II is now live!',
        action: ()=>dispatchEvent(new CustomEvent('modal_phase_2_desc_visible', { detail: {visible: true} }))
    },
    {
        content: "Update your verifier program now if you haven't (Nov 22nd Version)",
        action: ()=>window.open('https://x.com/CysicCommunity/status/1861404452806369762', '_blank')
    },
    {
        content: 'Upgrade in Progress: verifiers may experience some issues. Please check back soon!',
    },
]