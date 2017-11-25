<?php

class worksHandler
{
    private $_works;
    private $_worksDir;
    private $_tileContDepth;
    private $_tiles;
    private $_tileArch;
    private $_thumbnailClass;
    private $_captionClass;
    
    /**
     *  tilesClass struct:
     *      lenght = $_tileContDepth
     *      [0] => flex-container flex-justify-center flex-wrap main-work
     *      [1] => flex-container flex-columns project-tile fourth-width
    */
    private $_tilesClass;    

    public function __construct(string $worksDir)
    {
        $this->_tileContDepth = 2;
        $this->_worksDir = $worksDir;
        $this->_works = $this->toArray($worksDir);
        $this->_tilesClass = [
            "flex-container flex-justify-center flex-wrap main-work", 
            "flex-container flex-columns project-tile fourth-width"
        ];
        $this->_thumbnailClass = "project-thumbnail";
        $this->_captionClass = "project-caption";
        
        $this->generateTiles();

    }

    private function generateTiles()
    {
        foreach ($this->_works as $i => $work) {
            $this->_tiles[] = $this->tileTemplate($i);
       }
    }

    private function toArray($dir)
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
                $works[$i]['thumbnail'] = $meta['thumbnail'];
                $works[$i]['thumbnailAlt'] = $meta['thumbnailalt'];
                $works[$i]['hasDir'] = false;
            }
            
        }

        return $works;
    }

    private function tileTemplate($currentWork)
    {

        $title = $this->_works[$currentWork]['title'];
        $figUrl = $this->_works[$currentWork]['thumbnail'];
        $figAlt = $this->_works[$currentWork]['thumbnailAlt'];

        ob_start(); ?>
            
                <?php
                    for ($i = 0; $i < $this->_tileContDepth; $i++)
                    {
                        echo "<div class='{$this->_tilesClass[$i]}'>\n";
                    }
                ?>
                <div class=<?= "'$this->_thumbnailClass'"; ?>>
                    <img src="<?= $figUrl; ?>" alt="<?= $figAlt; ?>">
                </div>
                <span class=<?= "'$this->_captionClass'"; ?>>
                    <?= $title; ?>
                </span>
                <?php
                    for ($i = 0; $i < $this->_tileContDepth; $i++)
                    {
                        echo "</div>\n";
                    }
                ?>                
            </div>
        <?php
        $tileHtml = ob_get_contents();
        ob_end_clean();

        return $tileHtml;
    }

    /**
     * Get the value of m_member
     * 
     * @return type 
     */
    public function getTiles()
    {
        return $this->_tiles;
    }
}