/*
 * Custom entry point for wordpress
*/
import * as React from 'react';
import VerticalToggleButtons from "./OneHotButtons";
import CustomSidebarIcon from "./assets/sidebar-icon.js";


const { registerPlugin } = wp.plugins;
const { PluginSidebar } = wp.editor;





// const [currentPreset, setCurrentPreset] = React.useState();
registerPlugin('wp-minimizer', {
    render: () => {
        const [currentPreset, setCurrentPreset] = React.useState(window.minimizer.current_preset as string);

        return(
        <PluginSidebar
            name="minimizer-sidebar"
            icon={ < CustomSidebarIcon /> }
            title="WordPress Minimizer"
        >
            <div style={{paddingTop: "5%", paddingBottom: "5%", paddingLeft: "5%", paddingRight: "5%", fontSize: "1rem"}}>
                Choosing mode changes which blocks are shown in the block editor.</div>
            <VerticalToggleButtons preset={currentPreset} setPreset={setCurrentPreset}/>
        </PluginSidebar>
    )},
});

wp.domReady(() => {
    const { subscribe, dispatch, select } = wp.data;

    const unsubscribe = subscribe(() => {
        const settings = select('core/editor').getEditorSettings();
        if (!settings || !Object.keys(settings).length) return;
        unsubscribe();

        dispatch('core/edit-post').setIsInserterOpened(true);
        dispatch('core/edit-post').openGeneralSidebar('wp-minimizer/minimizer-sidebar');
    });

    //Keeps patterns visible even if containing unlisted variables
    const currentPreset = window.minimizer.current_preset;
    const preset = window.minimizer.presets[currentPreset];

    const PresetIsFull = preset == true; 
    if (PresetIsFull) return;

    wp.blocks.getBlockTypes()
        .filter( block => ! preset.includes( block.name ))
        .forEach( block => {
            wp.blocks.unregisterBlockType( block.name )
            wp.blocks.registerBlockType( block.name, {
                ...block,
                supports: { ...block.supports, inserter: false }
            });
    });
});
