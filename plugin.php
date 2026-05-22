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

//Debugging func
function logToConsole($message)
{
    echo "<script>console.log('" . json_encode($message) . "');</script>";
}

$presets = [
    "slim" => [
        "core/paragraph",
        "core/heading",
        "core/list",
        "core/table",
        "core/image",
        "core/file",
        "core/video",
        "core/accordion",
        "core/buttons",
        "core/site-logo",
    ],

    "medium" => [
        "core/paragraph",
        "core/heading",
        "core/list",
        "core/table",
        "core/image",
        "core/file",
        "core/video",
        "core/accordion",
        "core/buttons",
        "core/site-logo",
        "core/quote",
        "core/details",
        "core/math",
        "core/columns",
        "core/embed",
    ],

    "full" => true,
];

/**
 * Initializes necessary database columns on startup if needed
 * @return void
 */
function add_current_editor_state_field()
{
    global $wpdb;
    $row = $wpdb->get_results("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
								WHERE table_name = 'wp_users' AND column_name = 'editor_state'");
    if (empty($row)) {
        $wpdb->query(
            "ALTER TABLE wp_users ADD editor_state VARCHAR(20) NOT NULL DEFAULT 'slim'"
        );
    }
}

add_action("init", "add_current_editor_state_field");

function sidebar_plugin_register()
{
    wp_register_script(
        "minimizer-sidebar",
        plugins_url("build/index.js", __FILE__),
        ["wp-plugins", "wp-edit-post", "react", "wp-components"]
    );
}
add_action("init", "sidebar_plugin_register");

function sidebar_plugin_script_enqueue()
{
    global $wpdb, $presets;
    wp_enqueue_script("minimizer-sidebar");

    $user_id = get_current_user_id();
    $preset = $wpdb->get_results(
        "SELECT editor_state FROM wp_users WHERE ID = $user_id"
    );
    $preset = $preset[0]->editor_state;

    wp_localize_script("minimizer-sidebar", "minimizer", [
        "ajaxUrl" => admin_url("admin-ajax.php"),
        "nonce" => wp_create_nonce("wp_minimizer_nonce"),
        "presets" => $presets,
        "current_preset" => $preset,
    ]);
}
add_action("enqueue_block_editor_assets", "sidebar_plugin_script_enqueue");

/**
 * Adds an action hook to call from React, checks permissions then updates loaded preset
 */
add_action("wp_ajax_wp_minimizer_set_preset", function () {
    global $wpdb;
    check_ajax_referer("wp_minimizer_nonce", "nonce");
    if (!current_user_can("edit_posts")) {
        wp_send_json_error("Unauthorized", 403);
    }

    $user_id = get_current_user_id();
    $preset = sanitize_text_field($_POST["value"] ?? "");
    if (!$user_id || !in_array($preset, ["slim", "medium", "full"], true)) {
        wp_send_json_error("Invalid preset", 400);
    }

    $result = $wpdb->update(
        "wp_users",
        ["editor_state" => $preset],
        ["ID" => $user_id]
    );
    if (!$result) {
        wp_send_json_error("Database failure", 400);
    }
    wp_send_json_success();
});
