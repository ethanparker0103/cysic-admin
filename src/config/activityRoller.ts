export const activityRoller = [
    {
        content: 'Phase 2 is now active!',
        action: ()=>dispatchEvent(new CustomEvent('modal_phase_2_desc_visible', { detail: {visible: true} }))
    },
    {
        content: 'Upgrade in Progress: verifiers may experience some issues. Please check back soon!',
    },
]