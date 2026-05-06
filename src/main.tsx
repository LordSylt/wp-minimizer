import VerticalToggleButtons from "./OneHotButtons";
import custom_sidebar_icon from "./assets/sidebar-icon.js";


const { registerPlugin } = wp.plugins;
const { PluginSidebar } = wp.editPost;

registerPlugin('my-plugin-sidebar', {
    render: () => (
        <PluginSidebar
            name="my-plugin-sidebar"
            icon={ < custom_sidebar_icon /> }
            title="WordPress Minimizer"
        >
            <div style={{paddingTop: "5%", paddingBottom: "5%", paddingLeft: "5%", paddingRight: "5%", fontSize: "1rem"}}>
                Choosing mode changes which blocks are shown in the block editor.</div>
            <VerticalToggleButtons preset={window.minimizer.preset as string} />
        </PluginSidebar>
    ),
});
