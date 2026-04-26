import VerticalToggleButtons from "./OneHotButtons";

const { registerPlugin } = wp.plugins;
const { PluginSidebar } = wp.editPost;

registerPlugin('my-plugin-sidebar', {
    render: () => (
        <PluginSidebar
            name="my-plugin-sidebar"
            icon="admin-post"
            title="My plugin sidebar"
        >
            <VerticalToggleButtons />
        </PluginSidebar>
    ),
});