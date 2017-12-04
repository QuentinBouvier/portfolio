<?php


/**
 * Get works in projects folder and parse them, generate html tiles and previews for each
 * 
 * the folder is passed with constructor args
 * It must me sorted like this:
 *  $worksDir/
 *  ├── projectFolder1/
 *  |   └── preview.html
 *  |
 *  ├── someProject.html
 *  |
 *  ├── projectFolder2/
 *  |   └── preview.html
 *  |
 *  ├── projectFolder3/
 *  |   └── preview.html
 *  | 
 *  └── someProject2.html
 * 
 * Projects html and previews.html must have <meta> with name: 
 *      projecttitle,
 *      thumbnail (value: url to an image),
 *      thumbnailalt
 */
class worksHandler
{
    /**
     * Works info
     *
     * @var Array
     */
    private $_works;

    /**
     * HTML output of tiles
     *
     * @var String
     */
    private $_tiles;

    /**
     * CSS class of the tiles thumbnail
     *
     * @var Array
     */
    private $_thumbnailClass;

    /**
     * CSS class of the tiles caption
     *
     * @var Array
     */
    private $_captionClass;

    public function __construct(string $worksDir)
    {
        $this->_works = $this->folderToArray($worksDir);
        $this->_tilesClass = "flex-container flex-columns project-tile fourth-width";
        $this->_thumbnailClass = "project-thumbnail";
        $this->_captionClass = "project-caption";
    }


    /**
     * get folder content
     * Store infos for tiles from preview html files in folder
     * can match a project folder with a preview.html file into it
     * or a single html file in $dir folder
     *
     * @param String $dir
     * @return Array
     */
    private function folderToArray($dir)
    {
        $works = [];
        foreach (array_slice(scandir($dir),2) as $i => $target) {
            if (is_dir($dir . $target))
            {
                $meta = get_meta_tags($dir . $target . '/preview.html');
                
                $works[$i]['title'] = $meta['projecttitle'];
                $works[$i]['path'] = $dir . $target . '/';
                $works[$i]['thumbnail'] = $meta['thumbnail'];
                $works[$i]['thumbnailAlt'] = $meta['thumbnailalt'];
                $works[$i]['order'] = $meta['order'];
                $works[$i]['hasDir'] = true;
            }
            else {
                $meta = get_meta_tags($dir . $target);

                $works[$i]['title'] = $meta['projecttitle'];
                $works[$i]['path'] = $dir . $target;
                $works[$i]['thumbnail'] = $meta['thumbnail'];
                $works[$i]['thumbnailAlt'] = $meta['thumbnailalt'];
                $works[$i]['order'] = $meta['order'];
                $works[$i]['hasDir'] = false;
            }
            
        }

        return $works;
    }

    /**
     * Prepare a template for a tile and returned a formatted tile with the infos got from a properly
     * populated _work member of the class at $workIndex
     *
     * @param Integer $workIndex
     * @return String
     */
    private function generateTile($workIndex)
    {

        $title = $this->_works[$workIndex]['title'];
        $figUrl = $this->_works[$workIndex]['thumbnail'];
        $figAlt = $this->_works[$workIndex]['thumbnailAlt'];
        $order = $this->_works[$workIndex]['order'];

        ob_start(); 
        ?>

            <div class="<?= $this->_tilesClass;?>" data-work="<?= $workIndex; ?>" style="order: <?= $order; ?>">
                <div class=<?= "'$this->_thumbnailClass'"; ?>>
                    <img src="<?= $figUrl; ?>" alt="<?= $figAlt; ?>">
                </div>
                <span class=<?= "'$this->_captionClass'"; ?>>
                    <?= $title; ?>
                </span>             
            </div>

        <?php
        $tileHtml = ob_get_contents();
        ob_end_clean();

        return $tileHtml;
    }

    /** 
     * prepare a template for previews
     * @param Integer $workIndex
     * 
     * @return String
     */ 
    private function generatePreview($workIndex)
    {
        $previewHtml = "";
        $current = $this->_works[$workIndex];
        $order = $current['order'] + 5;

        $path = ($current['hasDir']) ? $current['path'] . 'preview.html' : $current['path'];

        ob_start();
        ?>
        <div class="flex-container flex-justify-center flex-items-center project-preview" data-work-preview="<?= $workIndex; ?>" style="order: <?= $order; ?>">
                <div class="project-preview-iframe">
                    <div class="closing-cross">✖</div>
                    <iframe src="<?= $path; ?>" frameborder="0"></iframe>
                </div>
            </div>
        <?php
        $previewHtml = ob_get_contents();
        ob_end_clean();

        return $previewHtml;
    }

    public function output()
    {
        $output = '';

        foreach($this->_works as $i => $value)
        {
            $output .= $this->generateTile($i);
            $output .= $this->generatePreview($i);
        }

        return $output;
    }

    /**
     * Get the value of _tiles
     * Used for final display
     * 
     * @return Array 
     */
    public function getTiles()
    {
        return $this->_tiles;
    }
}