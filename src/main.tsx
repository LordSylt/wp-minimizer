//import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'
//import './index.css'
//import App from './App.tsx'
//
//createRoot(document.getElementById('root')!).render(
//  <StrictMode>
//    <App />
//  </StrictMode>,
//)
//import VerticalToggleButtons from "./OneHoteButtons";

( function ( wp, React ) {
    var el = React.createElement;
    var registerPlugin = wp.plugins.registerPlugin;
    var PluginSidebar = wp.editor.PluginSidebar;

    registerPlugin( 'my-plugin-sidebar', {
        render: function () {
            return el(
                PluginSidebar,
                {
                    name: 'my-plugin-sidebar',
                    icon: 'admin-post',
                    title: 'My plugin sidebar',
                },
				'Meta field',
            );
        },
    } );
} )( (window as any).wp, window.React );