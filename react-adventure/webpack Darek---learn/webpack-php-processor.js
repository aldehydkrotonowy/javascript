function prefixImgWithTemplPath(content, path) {
    // NOTE: content is an buffer
    const phpTemplatePathInjector = '<?php echo get_template_directory_uri(); ?>';
    // console.log('Processing copy by transform: ', content.toString());

    return content.toString().replace(/\/img\//g, `${phpTemplatePathInjector}/img/`);
}

module.exports = prefixImgWithTemplPath;