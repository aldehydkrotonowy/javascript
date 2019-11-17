<?php

$args = [
	'posts_per_page' => $section['posts_count'],
	'offset'         => 0,
	'order'          => $section['order_type'],
	'orderby'        => $section['order_by'],
	'post_type'      => 'post',
	'post_status'    => 'publish',
	'post__not_in'   => $section['exclude_posts'],
	'category'       => $section['posts_category'],
];

$posts = get_posts( $args );
$offers = [];

if ( $section['include_offers'] ) {

	$posts_count = count( $posts );

	$offers_count = floor( $posts_count / $section['offers_intensity'] );

	$offers_args = [
		'posts_per_page' => $offers_count + 4,
		'offset'         => 0,
		'post_type'      => 'offer',
		'post_status' => 'publish',
		'tax_query'      => [
			'taxonomy' => 'offer_categories',
			'field'    => 'term_id',
			'terms'    => $section['offer_types'],
		],
	];

	$offers = get_posts( $offers_args );

	foreach ( $offers as $key => $offer ) {
		$offer_from = get_field( 'available_from', $offer->ID );
		$offer_to = get_field( 'available_to', $offer->ID );
		if ( ! empty( $offer_from ) || ! empty( $offer_to ) ) {
			if ( $offer_from > time() || $offer_to < time() ) {
				unset( $offers[ $key ] );
			}
		}
	}
}

$display_count = count( $posts ) + count( $offers );
$display = [];
$offer_i = 0;

$i = 0;
foreach ( $posts as $post ) {
	array_push( $display, $post );
	$i++;
	if ( isset( $section['offers_intensity'] ) && $section['offers_intensity'] > 0 && ( $i % $section['offers_intensity'] ) === 0 ) {
		if ( isset( $offers[ $offer_i ] ) ) {
			array_push( $display, $offers[ $offer_i ] );
			$offer_i++;
		}
	}
}

echo '<h2>' . $section['box_title'] . '</h2>';

foreach ( $display as $post ) {
	$fields = get_fields( $post->ID );
	echo '(' . $post->post_type . ') ' . 'Title: ' . $post->post_title;
	if ( $fields['badge'] ) {
		if ( $fields['badge_use_cat'] ) {
			$term = wp_get_post_terms( $post->ID, 'offers_category' )[0];
			$term_fields = get_fields( $term->taxonomy . '_' . $term->term_id );
			if ( $term_fields['badge'] ) {
				echo '<span style="color: ' . $term_fields['badge_text_color'] . '; background-color: ' . $term_fields['badge_background'] . ';">' . $term_fields['badge_text'] . '</span>';
			}
		} else {
			echo '<span style="color: ' . $fields['badge_text_color'] . '; background-color: ' . $fields['badge_background'] . ';">' . $fields['badge_text'] . '</span>';
		}
	}

	if ( $fields['event_id'] && $fields['market_id'] ) {
		var_dump( TDS\get_event_selection($fields['event_id'], $fields['market_id'], $fields['selection_id']) );
	}
	echo '<br/>';
}
