<?php


/**
 * Get works in projects folder and parse them, generate html tiles for each
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
        
        $this->_tiles = $this->generateTiles();

    }

    /**
     * Generate the tiles with the prepared template in generateTiles() function
     *
     * @return Array
     */
    private function generateTiles()
    {
        $tiles = [];
        foreach ($this->_works as $i => $work) {
            $tiles[] = $this->tileTemplate($i);
       }

       return $tiles;
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
                $works[$i]['hasDir'] = true;
            }
            else {
                $meta = get_meta_tags($dir . $target);

                $works[$i]['title'] = $meta['projecttitle'];
                $works[$i]['path'] = $dir . $target;
                $works[$i]['thumbnail'] = $meta['thumbnail'];
                $works[$i]['thumbnailAlt'] = $meta['thumbnailalt'];
                $works[$i]['hasDir'] = false;
            }
            
        }

        return $works;
    }

    /**
     * Prepare a template for a tile and returned a formatted tile with the infos got from a properly
     * populated _work member of the class at index $currentWork
     *
     * @param Integer $currentWork
     * @return String
     */
    public function tileTemplate($currentWork)
    {

        $title = $this->_works[$currentWork]['title'];
        $figUrl = $this->_works[$currentWork]['thumbnail'];
        $figAlt = $this->_works[$currentWork]['thumbnailAlt'];

        ob_start(); 
        ?>

            <div class='<?= $this->_tilesClass;?>' data-work='<?= $currentWork; ?>'>
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