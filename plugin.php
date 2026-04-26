<?php
/**
 * Plugin Name:       X Plugin
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       x-plugin
 *
 * @package CreateBlock
 */



//PHP handles backend logic and wordpress hooks



function sidebar_plugin_register() {
    wp_register_script(
        'minimizer-sidebar',
        plugins_url( 'dist/assets/main.js', __FILE__ ),
        array( 'wp-plugins', 'wp-edit-post', 'react', 'wp-components' )
    );
}
add_action( 'init', 'sidebar_plugin_register' );

function sidebar_plugin_script_enqueue() {
    wp_enqueue_script( 'minimizer-sidebar' );
}
add_action( 'enqueue_block_editor_assets', 'sidebar_plugin_script_enqueue' );
