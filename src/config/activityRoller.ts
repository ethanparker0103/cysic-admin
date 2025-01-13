export const activityRoller = [
    {
        content: '🎉 Now Available on Android: Run as a Verifier Anytime, Anywhere.',
        action: ()=>dispatchEvent(new CustomEvent('modal_download_app_visible', { detail: {visible: true} }))
    },
    {
        content: 'Phase II is now live!',
        action: ()=>dispatchEvent(new CustomEvent('modal_phase_2_desc_visible', { detail: {visible: true} }))
    }
]