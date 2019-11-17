<?php

//d( $section );

echo '<h2>Single big post</h2>';

switch ( $section['post_type'] ) {
	case 'latest':
		$args = [
			'category__in' => $section['post_category'],
			'orderby' => 'date',
			'order' => 'DESC',
			'posts_per_page' => 1,
			'offset' => 0,
		];

		$post = get_posts( $args )[0];
		break;
	case 'custom':
		$post = $section['exact_post'][0];
		break;
	case 'random':
		$args = [
			'category__in' => $section['post_category'],
			'orderby'   => 'rand',
			'posts_per_page' => 1,
			'offset' => 0,
		];
		$post = get_posts( $args )[0];
		break;
	default:
		break;
}

d($post);

/* get_permalink()
echo __( 'Continue reading...', 'wh-news' );
 */