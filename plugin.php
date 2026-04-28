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

//variable for possible preset with no blocks
$zero = false;

$slim = array(
			'core/paragraph',
			'core/heading',
			'core/list',
			'core/table',
			'core/image',
			'core/file',
			'core/video',
			'core/accordion',
			'core/buttons',
            'core/site-logo',
		);

$medium = array(
			'core/paragraph',
			'core/heading',
			'core/list',
			'core/table',
			'core/image',
			'core/file',
			'core/video',
			'core/accordion',
			'core/buttons',
            'core/site-logo',
            'core/quote',
            'core/details',
            'core/math',
            'core/columns',
            'core/embed',
		);

$full = true;


function sidebar_plugin_register() {
    wp_register_script(
        'minimizer-sidebar',
        plugins_url( 'build/index.js', __FILE__ ),
        array( 'wp-plugins', 'wp-edit-post', 'react', 'wp-components' )
    );
}
add_action( 'init', 'sidebar_plugin_register' );

function sidebar_plugin_script_enqueue() {
    wp_enqueue_script( 'minimizer-sidebar' );

	wp_localize_script('minimizer-sidebar', 'myPluginData', [
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce'   => wp_create_nonce('wp_minimizer_nonce'),
    ]);
}
add_action( 'enqueue_block_editor_assets', 'sidebar_plugin_script_enqueue' );


#Adds an action hook to call from React, checks permissions then updates loaded preset
add_action('wp_ajax_wp_minimizer_set_preset', function() {
	check_ajax_referer('wp_minimizer_nonce', 'nonce');
	if (!current_user_can('edit_posts')) {
		wp_send_json_error('Unauthorized', 403);
	}

	$post_id = intval($_POST['post_id'] ?? 0);
	$preset = sanitize_text_field($_POST['value'] ?? '');
	if (!$post_id || !in_array($preset, ['slim', 'medium', 'full'], true)) {
		wp_send_json_error('Invalid preset', 400);
	}

	#TODO:Edit this later with database entry
	set_transient('wp_minimizer_preset_' . $post_id, $preset, HOUR_IN_SECONDS);
	wp_send_json_success();
});



/* Chooses which preset to use based of transient,  TODO: Change from transient to database entries */
function wpdocs_allowed_block_types($block_editor_context, $editor_context) {
	global $slim, $medium, $full;
	if (! empty($editor_context->post)) {
		#Fetches previously stored preset.
		$preset = get_transient('wp_minimizer_preset_' . $editor_context->post->ID);
		
		switch ($preset) {
			case 'slim':
				return $slim;
			case 'medium':
				return $medium;
			case 'full':
				return $block_editor_context;
			default:
				return $block_editor_context;
		}
	}
	return $block_editor_context;
}

add_filter( 'allowed_block_types_all', 'wpdocs_allowed_block_types', 10, 2 );




